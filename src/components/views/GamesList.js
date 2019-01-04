import React, { Component } from 'react';

import GamesTable from '../elems/GamesTable';

import api from '../../utils/api';

class GamesList extends Component {
  constructor(props){
		super(props);
    this.state = {
      gamesData: [],
      loadingData: false,
      error: null
    };
  }

  componentDidMount = () => {
    this.loadGames();
  }

  loadGames = async () => {
    this.setState({loadingData: true});
    try {
      const respGames = await api.game.getGamesList();
      this.setGamesData(respGames.matches)
    } catch(err) {
      this.setState({
        loadingData: false,
        error: "Network Error"
      });
      console.log(err.message);
    }
  }

  setGamesData = (respGames) => {
    const gamesList = respGames.map(
      (gamesList) => ({
        matchId: gamesList.matchId,
        replayUrl: gamesList.replayUrl,
        date: gamesList.completed,
        player1: gamesList.bots[0].user.username,
        player2: gamesList.bots[1].user.username,
        result: (gamesList.bots[0].isWinner ? 1 : 2),
        duration: gamesList.duration,
        unitsRemain: Math.max(gamesList.bots[0].unitsLeft, 0) + " - " + Math.max(gamesList.bots[1].unitsLeft, 0)
      })
    );
    this.setState({
      gamesData: gamesList,
      loadingData: false
    });
  }

  render(){
    const { gamesData, loadingData } = this.state;

    return (
      <div>
        <h2>Games</h2>
        <GamesTable data={gamesData} loading={loadingData}/>
      </div>
    )
  }

}

export default GamesList;
