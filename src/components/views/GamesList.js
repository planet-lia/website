import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Table from './Table';
import data from '../../assets/GamesData';

class GamesList extends Component {

  linkFormatter = (cell, row, rowIndex) => {
    return (<Link to={"/games/" + row.gameNum}>{row.date}</Link>);
  }

  render(){
    const gamesColumns = [{
      dataField: 'no1',
			text: 'Date',
      formatter: this.linkFormatter
    }, {
      dataField: 'result',
			text: 'Result'
    }, {
      dataField: 'stat1',
			text: 'Stat'
    }, {
      dataField: 'stat2',
			text: 'Stat'
    }, {
      dataField: 'stat3',
      text: 'Stat'
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
