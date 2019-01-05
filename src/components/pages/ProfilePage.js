import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import GamesTable from '../elems/GamesTable';
import Moment from 'react-moment';

import api from '../../utils/api';
import {connect} from "react-redux";
import isEmpty from "lodash/isEmpty";

class ProfilePage extends Component {
  constructor(props){
		super(props);
    this.state = {
      userId: "",
      username: "",
      isPrivate: false,
      rank: 0,
      rating: 0,
      mu: 0,
      sigma: 0,
      wins: 0,
      losses: 0,
      total: 0,
      playing: 0,
      activeBotWins: 0,
      activeBotLosses: 0,
      activeBotTotal: 0,
      activeBotPlaying: 0,
      gamesData: [],
      pageCount: 0,
      nGamesPerPage: 0,
      version: "",
      language: "",
      uploadTime: "",
      latestBotId: "",
      newBotStatus: "",
      newBotUploadTime: "",
      newBotProcessingLogs: "",
      newBotTestMatchLogs: "",
      newBotTestMatchGameEngineLog: "",
      loadingData: false,
      error: null
    }
  }

  componentDidMount = () => {
    this.loadData(this.props.match.params.username);
  }

  loadData = async (username) => {
    const isPrivate = username === this.props.username;
    this.setState({loadingData: true, username: username, isPrivate: isPrivate});

    try {
      const respUserId = await api.user.getUsernameToUserId(username);
      const userId = respUserId.userId;

      const respUser = await api.game.getUserPublic(userId);
      this.setUserData(respUser.user);

      if (isPrivate) {
        const respBotActive = await api.game.getActiveBot();
        if(!isEmpty(respBotActive.bot)){
          const respBot = await api.game.getBot(respBotActive.bot.botId);
          const respBotLatest = await api.game.getLatestBot();

          this.setBotData(respBot.bot, respBotActive.bot, respBotLatest.bot);
        } else {
          this.setState({ loadingData: false });
        }
      }

      this.loadGames(userId, 0);

    } catch(err) {
      this.setState({
        loadingData: false,
        error: "Network Error"
      });
      console.log(err.message);
    }
  }

  setBotData = (respBotFull, respBotActive, respBotLatest) => {
    this.setState({
      activeBotId: respBotActive.botId,
      version: respBotActive.version,
      language: respBotFull.language,
      uploadTime: respBotActive.uploaded,
      latestBotId: respBotLatest.botId,
      newBotUploadTime: respBotLatest.uploaded,
      newBotStatus: respBotLatest.status,
      newBotProcessingLogs: respBotLatest.logs.processingLog,
      newBotTestMatchLogs: respBotLatest.logs.testMatchLog,
      newBotTestMatchGameEngineLog: respBotLatest.logs.testMatchGameEngineLog,
    });
  }

  loadGames = async (userId, offset) => {
    this.setState({loadingData: true});
    try {
      const respGames = await api.game.getUserGames(userId, offset);
      this.setGamesData(respGames)
    } catch(err) {
      this.setState({
        loadingData: false,
        error: "Network Error"
      });
      console.log(err.message);
    }
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.nGamesPerPage);

    this.loadGames(this.state.userId, offset);
  };

  setGamesData = (respGames) => {
    const gamesList = respGames.matches.map(
      (gamesList) => ({
        matchId: gamesList.matchId,
        replayUrl: gamesList.replayUrl,
        date: gamesList.completed,
        player1: gamesList.bots[0].user.username,
        player2: gamesList.bots[1].user.username,
        result: (gamesList.bots[0].isWinner ? 1 : 2),
        duration: gamesList.duration,
        unitsRemain1: Math.max(gamesList.bots[0].unitsLeft, 0),
        unitsRemain2: Math.max(gamesList.bots[1].unitsLeft, 0)
      })
    );
    let pageCount = this.state.pageCount;
    if (pageCount === 0) {
      pageCount = Math.ceil(respGames.pagination.total / respGames.pagination.count)
    }

    this.setState({
      gamesData: gamesList,
      nGamesPerPage: respGames.pagination.count,
      pageCount: pageCount,
      loadingData: false
    });
  }

  setUserData = (respUser) => {
    this.setState({
      userId: respUser.userId,
      username: respUser.username,
      rank: respUser.stats.leaderboard.rank,
      rating: respUser.stats.leaderboard.rating,
      mu: respUser.stats.leaderboard.mu,
      sigma: respUser.stats.leaderboard.sigma,
      wins: respUser.stats.match.allTime.wins,
      losses: respUser.stats.match.allTime.losses,
      total: respUser.stats.match.allTime.total,
      playing: respUser.stats.match.allTime.playing,
      activeBotWins: respUser.stats.match.activeBot.wins,
      activeBotLosses: respUser.stats.match.activeBot.losses,
      activeBotTotal: respUser.stats.match.activeBot.total,
      activeBotPlaying: respUser.stats.match.activeBot.playing,
    });
  }

  logToDownloadLink = (logLink) => {
    if (logLink === "") return "";
    return (<a href={logLink} target="_blank">download</a>);
  }

  render(){
    const { gamesData, loadingData, username, rank, rating, mu, sigma,
      wins, losses, total, playing, pageCount, version, language,
      uploadTime, activeBotId, latestBotId, activeBotWins, activeBotLosses,
      activeBotPlaying, activeBotTotal, newBotUploadTime, newBotStatus,
      newBotProcessingLogs, newBotTestMatchLogs, newBotTestMatchGameEngineLog} = this.state;

    return (
      <div className="container">
        <div id="prof-cont-data">
          <Row>
            <Col sm={3}>
              <h2>{username}</h2>
              {(this.state.isPrivate) ? "Your profile" : null}
            </Col>
            <Col sm={3}>
              <h4>Rank details</h4>
              <div>
                {"Rank: " + rank}
              </div>
              <div>
                {"Rating: " + rating}
              </div>
              <div>
                {"Mu: " + mu}
              </div>
              <div>
                {"Sigma: " + sigma}
              </div>
            </Col>
            <Col sm={3}>
              <h4>Current bot</h4>
              {(this.state.isPrivate)
                ? (
                  <span>
                    <div>
                      {"Version: " + version}
                    </div>
                    <div>
                      {"Language: " + language}
                    </div>
                    <div>
                      {"Upload time: "}
                      {(uploadTime === "") ? "" : <Moment format="DD/MM/YYYY HH:mm">{uploadTime}</Moment>}
                    </div>
                  </span>
                )
                : null
              }
              {(this.state.isPrivate)
                ? (
                  <span>
                    <div>&nbsp;&nbsp;</div>
                    <div>&nbsp;&nbsp;</div>
                    <h4>New bot</h4>
                    {(activeBotId !== latestBotId)
                      ? (
                        <span>
                          <div>
                            {"Upload time: "}
                                  {(newBotUploadTime === "") ? "" : <Moment format="DD/MM/YYYY HH:mm">{newBotUploadTime}</Moment>}
                          </div>
                          <div>
                            {"Status: " + newBotStatus}
                          </div>
                           <div>
                            {"Processing logs: "} {this.logToDownloadLink(newBotProcessingLogs)}
                          </div>
                          <div>
                            {"Test match logs: "} {this.logToDownloadLink(newBotTestMatchLogs)}
                          </div>
                          <div>
                            {"Test match engine logs: "} {this.logToDownloadLink(newBotTestMatchGameEngineLog)}
                          </div>
                        </span>
                      ) : "New bot is now current."
                    }
                  </span>
                )
                : null
              }
            </Col>
            <Col sm={3}>
              <h4>Current bot results</h4>
              <div>
                {"Wins: " + activeBotWins}
              </div>
              <div>
                {"Losses: " + activeBotLosses}
              </div>
              <div>
                {"Total: " + activeBotTotal}
              </div>
              <div>
                {"Playing: " + activeBotPlaying}
              </div>
              <div>&nbsp;&nbsp;</div>
              <div>
                <h4>All time results</h4>
              </div>
              <div>
                {"Wins: " + wins}
              </div>
              <div>
                {"Losses: " + losses}
              </div>
              <div>
                {"Total: " + total}
              </div>
              <div>
                {"Playing: " + playing}
              </div>
            </Col>
          </Row>
        </div>
        {(this.state.isPrivate)
          ? <h3>Your Games</h3>
          : (
            <div>
              <h3>{username + "'s Games"}</h3>
            </div>
          )
        }
        <GamesTable data={gamesData} loading={loadingData}/>
        <ReactPaginate previousLabel={"<"}
                       nextLabel={">"}
                       breakLabel={"..."}
                       breakClassName={"break-me"}
                       pageCount={pageCount}
                       marginPagesDisplayed={1}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { username } = state.authentication;
  return {
    username
  };
}

export default connect(mapStateToProps)(ProfilePage);

