import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import GamesTable from '../elems/GamesTable';

import api from '../../utils/api';

class ProfilePage extends Component {
  constructor(props){
		super(props);
    this.state = {
      userId: "",
      username: "",
      rank: 0,
      rating: 0,
      mu: 0,
      sigma: 0,
      wins: 0,
      losses: 0,
      total: 0,
      playing: 0,
      gamesData: [],
      loadingData: false,
      error: null
    }
  }

  componentDidMount = () => {
    this.loadData(this.props.match.params.username);
  }

  loadData = async (username) => {
    this.setState({loadingData: true});
    try {
      const respUser = await api.game.getUserPublic(username);
      const respGames = await api.game.getUserGames(username);
      this.setData(respUser.user, respGames.matches)
    } catch(err) {
      this.setState({
        loadingData: false,
        error: "Network Error"
      });
      console.log(err.message);
    }
  }

  setData = (respUser, respGames) => {
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
    this.setState({
      userId: respUser.userId,
      username: respUser.username,
      rank: respUser.stats.leaderboard.rank,
      rating: respUser.stats.leaderboard.rating,
      mu: respUser.stats.leaderboard.mu,
      sigma: respUser.stats.leaderboard.sigma,
      wins: respUser.stats.match.wins,
      losses: respUser.stats.match.losses,
      total: respUser.stats.match.total,
      playing: respUser.stats.match.playing,
      gamesData: gamesList,
      loadingData: false
    });
  }

  render(){
    const { gamesData, loadingData, username, rank, rating, mu, sigma, wins, losses, total, playing } = this.state;

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
        <h3>{username + "'s Games"}</h3>
        <GamesTable data={gamesData} loading={loadingData}/>
      </div>
    )
  }

}

export default ProfilePage;
