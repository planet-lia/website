import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Table from '../elems/Table';

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
        unitsRemain: Math.floor( (gamesList.bots[0].unitsLeft + gamesList.bots[1].unitsLeft) / 32 * 100 ) + "%"
      })
    );
    this.setState({
      gamesData: gamesList,
      loadingData: false
    });
  }

  linkFormatter = (cell, row, rowIndex) => {
    const date = (
      Number(row.date.substring(8,10)) + "-" +
      Number(row.date.substring(5,7)) + "-" +
      Number(row.date.substring(0,4))
    )
    return (
      <Link to={{
        pathname: "/games/" + row.matchId,
        state: row
      }}>
        {date}
      </Link>
    );
  }

  playersFormatter = (cell, row, rowIndex) => {
    if(row.result===1){
      return (<span><strong>{row.player1}</strong>{" vs " + row.player2}</span>)
    } else if (row.result===2) {
      return (<span>{row.player1 + " vs "}<strong>{row.player2}</strong></span>)
    }
  }

  durationFormatter = (cell, row, rowIndex) => {
    return (Math.floor(row.duration/60) + ":" + Math.round(row.duration%60));
  }

  render(){
    const { gamesData, loadingData } = this.state;
    const gamesColumns = [{
      dataField: 'no1',
			text: 'Date',
      formatter: this.linkFormatter
    }, {
      dataField: 'no2',
			text: 'Players',
      formatter: this.playersFormatter
    }, {
      dataField: 'no3',
			text: 'Duration',
      formatter: this.durationFormatter
    }, {
      dataField: 'unitsRemain',
			text: 'Remaining Units'
    }];

    return (
      <div>
        <h2>Games</h2>
        <Table data={gamesData} columns={gamesColumns} keyField="matchId" loading={loadingData}/>
      </div>
    )
  }

}

export default GamesList;
