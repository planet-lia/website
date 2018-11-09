import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Table from '../elems/Table';
import data from '../../assets/GamesData';

class GamesList extends Component {

  linkFormatter = (cell, row, rowIndex) => {
    return (<Link to={"/games/" + row.gameNum}>{row.date}</Link>);
  }

  playersFormatter = (cell, row, rowIndex) => {
    if(row.result===1){
      return (<span><strong>{row.player1}</strong>{" vs " + row.player2}</span>)
    } else if (row.result===2) {
      return (<span>{row.player1 + " vs "}<strong>{row.player2}</strong></span>)
    }
  }

  durationFormatter = (cell, row, rowIndex) => {
    return (Math.floor(row.duration/60) + ":" + row.duration%60);
  }

  render(){
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
        <Table data={data} columns={gamesColumns} keyField="date" />
      </div>
    )
  }

}

export default GamesList;
