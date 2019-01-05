import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import isEmpty from 'lodash/isEmpty';

import GamesTable from '../elems/GamesTable';

import api from '../../utils/api';

import { connect } from 'react-redux';

class PrivateProfilePage extends Component {
  constructor(props){
		super(props);
    this.state = {
      userId: "",
      username: "",
      rank: 0,
      rating: 0,
      mu: 0,
      sigma: 0,
      version: 0,
      language: "",
      gamesPlayed: 0,
      uploadTime: "",
      newVersion: 0,
      newBotStatus: "",
      gamesData: [],
      loadingData: false,
      error: null
    }
  }

  componentDidMount = () => {
    this.loadData();
  }

  loadData = async () => {
    this.setState({loadingData: true});
    try {
      const respUser = await api.game.getUserPublic(this.props.userId);
      const respGames = await api.game.getUserGames(this.props.userId);
      const respBotActive = await api.game.getActiveBot();
      if(!isEmpty(respBotActive.bot)){
        const respBot = await api.game.getBot(respBotActive.bot.botId);
        const respBotLatest = await api.game.getLatestBot();
        this.setData(respUser.user, respGames.matches, respBot.bot, respBotActive.bot, respBotLatest.bot);
      } else {
        this.setState({ loadingData: false });
      }
    } catch(err) {
      this.setState({
        loadingData: false,
        error: "Network Error"
      });
      console.log(err.message);
    }
  }

  setData = (respUser, respGames, respBot, respBotActive, respBotLatest) => {
    const gamesList = respGames.map(
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

    const date = (
      Number(respBotActive.uploaded.substring(8,10)) + "-" +
      Number(respBotActive.uploaded.substring(5,7)) + "-" +
      Number(respBotActive.uploaded.substring(0,4))
    )

    this.setState({
      userId: respUser.userId,
      username: respUser.username,
      rank: respUser.stats.leaderboard.rank,
      rating: respUser.stats.leaderboard.rating,
      mu: respUser.stats.leaderboard.mu,
      sigma: respUser.stats.leaderboard.sigma,
      activeBotId: respBotActive.botId,
      version: respBotActive.version,
      language: respBot.language,
      gamesPlayed: respUser.stats.match.activeBot.total,
      uploadTime: date,
      latestBotId: respBotLatest.botId,
      newVersion: respBotLatest.version,
      newBotStatus: respBotLatest.status,
      gamesData: gamesList,
      loadingData: false
    });
  }

  render(){
    const {
      username,
      rank,
      rating,
      mu,
      sigma,
      version,
      language,
      gamesPlayed,
      uploadTime,
      newVersion,
      newBotStatus,
      gamesData,
      loadingData,
      activeBotId,
      latestBotId
    } = this.state;

    return (
      <div className="container">
        <div id="prof-cont-data">
          <Row>
            <Col sm={4}>
              <h2>{username}</h2>
            </Col>
            <Col sm={4}>
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
            <Col sm={4}>
              <div>
                <h4>Current bot</h4>
              </div>
              <div>
                {"Version: " + version}
              </div>
              <div>
                {"Language: " + language}
              </div>
              <div>
                {"Games played: " + gamesPlayed}
              </div>
              <div>
                {"Upload time: " + uploadTime}
              </div>
              {(activeBotId===latestBotId)
                ? null
                : (
                  <div>
                    {"New bot version: " + newVersion + " " + newBotStatus}
                  </div>
                )
              }
            </Col>
          </Row>
        </div>
        <h3>Your Games</h3>
        <GamesTable data={gamesData} loading={loadingData}/>
      </div>
    );
  }

}

function mapStateToProps(state) {
  const { isAuthenticated, username, userId } = state.authentication;
  return {
      isAuthenticated,
      username,
      userId
  };
}

export default connect(mapStateToProps)(PrivateProfilePage);
