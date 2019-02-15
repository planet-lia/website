import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import GamesTable from '../elems/GamesTable';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ChallengeButton from '../elems/ChallengeButton';

import api from '../../utils/api';

import {connect} from "react-redux";

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
      activeBotId: "",
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
      cLeftToday: 0,
      cTotal: 0,
      hasActiveBot: true,
      isChallenges: false,
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
      this.setState({userId: userId});
      const respUser = await api.game.getUserPublic(userId);

      let hasActiveBot = respUser.user.activeBot !== null;
      this.setState({hasActiveBot: hasActiveBot});
      this.setUserData(respUser.user);
      if (hasActiveBot) {
        const activeBotStats = respUser.user.stats.match.activeBot;
        this.setActiveBotData(respUser.user.activeBot, activeBotStats);
      }

      if (isPrivate) {
        try{
          const respBotLatest = await api.game.getLatestBot();
          this.setLatestBotData(respBotLatest.bot);
        }
        catch(err) {
          // Do nothing, if 404 latest bot does not exist
        }
        const respChallengeStats = await api.game.getChallengesStats();
        this.setState({
          cLeftToday: respChallengeStats.challenges.today,
          cTotal: respChallengeStats.challenges.total
        })
      }

      this.loadGames(userId, 0);
    }
    catch(err) {
      this.setState({
        loadingData: false,
        error: "Network Error"
      });
      console.log(err.message);
    }
  }

  setLatestBotData = (respBotLatest) => {
    this.setState({
      latestBotId: respBotLatest.botId,
      newBotUploadTime: respBotLatest.uploaded,
      newBotStatus: respBotLatest.status,
      newBotProcessingLogs: respBotLatest.logs.processingLog,
      newBotTestMatchLogs: respBotLatest.logs.testMatchLog,
      newBotTestMatchGameEngineLog: respBotLatest.logs.testMatchGameEngineLog,
    });
  }

  loadGames = async (userId, offset, isChallenges = false) => {
    this.setState({
      loadingData: true,
      gamesData: [],
      isChallenges: isChallenges
    });
    let respGames;
    try {
      if(isChallenges){
        respGames = await api.game.getUserChallenges(userId, offset);
      } else {
        respGames = await api.game.getUserGames(userId, offset);
      }
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
    this.loadGames(this.state.userId, offset, this.state.isChallenges);
  };

  setGamesData = (respGames) => {
    const gamesList = respGames.matches.map(
      (gamesList) => ({
        matchId: gamesList.matchId,
        replayUrl: gamesList.replayUrl,
        date: gamesList.completed,
        player1: gamesList.bots[0].user.username,
        player2: gamesList.bots[1].user.username,
        player1Rank: gamesList.bots[0].user.rank,
        player2Rank: gamesList.bots[1].user.rank,
        result: gamesList.status==="completed" ? (gamesList.bots[0].isWinner ? 1 : 2) : 0,
        duration: gamesList.duration,
        unitsRemain1: Math.max(gamesList.bots[0].unitsLeft, 0),
        unitsRemain2: Math.max(gamesList.bots[1].unitsLeft, 0),
        isCompleted: gamesList.status==="completed"
      })
    );

    const pageCount = Math.ceil(respGames.pagination.total / respGames.pagination.count)

    this.setState({
      gamesData: gamesList,
      nGamesPerPage: respGames.pagination.count,
      pageCount: pageCount,
      loadingData: false
    });
  }

  setUserData = (respUser) => {
    this.setState({
      rank: respUser.stats.leaderboard.rank,
      rating: respUser.stats.leaderboard.rating,
      mu: respUser.stats.leaderboard.mu,
      sigma: respUser.stats.leaderboard.sigma,
      wins: respUser.stats.match.allTime.wins,
      losses: respUser.stats.match.allTime.losses,
      total: respUser.stats.match.allTime.total,
      playing: respUser.stats.match.allTime.playing
    });
  }

  setActiveBotData = (activeBot, activeBotStats) => {
    this.setState({
      activeBotId: activeBot.botId,
      version: activeBot.version,
      language: activeBot.language,
      uploadTime: activeBot.uploaded,
      activeBotWins: activeBotStats.wins,
      activeBotLosses: activeBotStats.losses,
      activeBotTotal: activeBotStats.total,
      activeBotPlaying: activeBotStats.playing,
    });
  }

  logToDownloadLink = (logLink) => {
    if (logLink === "") return "";
    return (<a href={logLink} target="_blank">download</a>);
  }

  render(){
    const { gamesData, loadingData, userId, username, rank, rating, mu, sigma,
      wins, losses, playing, pageCount, version, language,
      uploadTime, activeBotId, latestBotId, activeBotWins, activeBotLosses,
      activeBotPlaying, newBotUploadTime, newBotStatus,
      newBotProcessingLogs, newBotTestMatchLogs, newBotTestMatchGameEngineLog,
      cLeftToday, cTotal } = this.state;

    return (
      <div className="container">
        <div id="prof-cont-data">
          <Row>
            <Col sm={3}>
              <h2>{username}</h2>
              {(this.state.isPrivate) ? "Your profile" : null}
              <div className="tour-cont-icon-lg">
                <FontAwesomeIcon icon="robot" color={"#019170"}/>
              </div>
              {(this.state.isPrivate) ? ("Challenges left: " + cLeftToday + "/" + cTotal) : <ChallengeButton opponent={username} opponentId={userId}/>}
            </Col>
            <Col sm={3}>
              <h4>Rank details</h4>
              <div>
                {"Rank: "} <strong>{rank}</strong>
              </div>
              <div>
                {"Rating: "} <strong>{rating}</strong>
              </div>
              <div>
                {"Mu: "} <strong>{mu}</strong>
              </div>
              <div>
                {"Sigma: "} <strong>{sigma}</strong>
              </div>
            </Col>
            <Col sm={3}>
              <h4>Current bot</h4>
              {(this.state.hasActiveBot)
                ? (
                  <span>
                    <div>
                      {"Version: "} <strong>{version}</strong>
                    </div>
                    <div>
                      {"Language: "}  <strong>{language}</strong>
                    </div>
                    <div>
                      {"Upload time: "}
                      {(uploadTime === "") ? "" : <strong><Moment format="DD/MM/YYYY HH:mm">{uploadTime}</Moment></strong>}
                    </div>
                  </span>
                )
                : <div>You don't have any bots.</div>
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
                                  {(newBotUploadTime === "") ? ""
                                    : <strong><Moment format="DD/MM/YYYY HH:mm">{newBotUploadTime}</Moment></strong>}
                          </div>
                          <div>
                            {"Status: "} <span style={{color: "#FF0000"}}><strong>{newBotStatus}</strong></span>
                          </div>
                          {(newBotProcessingLogs !== "")
                            ? <div>{"Processing logs: "} <strong>{this.logToDownloadLink(newBotProcessingLogs)}</strong></div>
                            : null
                          }
                          {(newBotTestMatchLogs !== "")
                            ? <div>{"Test match logs: "} <strong>{this.logToDownloadLink(newBotTestMatchLogs)}</strong></div>
                            : null
                          }
                          {(newBotTestMatchGameEngineLog !== "")
                            ? <div>{"Test match engine logs: "}<strong>{this.logToDownloadLink(newBotTestMatchGameEngineLog)}</strong></div>
                            : null
                          }
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
                {"Wins: "} <strong>{activeBotWins}</strong>
              </div>
              <div>
                {"Losses: "} <strong>{activeBotLosses}</strong>
              </div>
              <div>
                {"Win %: "} <strong>{winPercentage(activeBotWins, activeBotLosses)}</strong>
              </div>
              <div>
                {"Playing: "} <strong>{activeBotPlaying}</strong>
              </div>
              <div>&nbsp;&nbsp;</div>
              <div>
                <h4>All time results</h4>
              </div>
              <div>
                {"Wins: "} <strong>{wins}</strong>
              </div>
              <div>
                {"Losses: "} <strong>{losses}</strong>
              </div>
              <div>
                {"Win %: "} <strong>{winPercentage(wins, losses)}</strong>
              </div>
              <div>
                {"Playing: "} <strong>{playing}</strong>
              </div>
            </Col>
          </Row>
        </div>
        {(this.state.isPrivate)
          ? <h3>Games</h3>
          : (
            <div>
              <h3>Games</h3>
            </div>
          )
        }
        <Button onClick={() => this.loadGames(this.state.userId, 0, false)}>Ranked</Button>
        <Button onClick={() => this.loadGames(this.state.userId, 0, true)}>Challenges</Button>
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

function winPercentage(wins, losses) {
  const p = wins / (wins + losses);
  if (isNaN(p)) return 0;
  return Math.round(p * 1000) / 1000

}

function mapStateToProps(state) {
  const { username } = state.authentication;
  return {
    username
  };
}

export default connect(mapStateToProps)(ProfilePage);
