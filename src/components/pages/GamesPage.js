import React, { Component } from 'react';

import Table from '../views/Table';

class GamesPage extends Component {

  render(){
    const gamesColumns = [{
      dataField: 'date',
			text: 'Date'
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
        <Table data={[]} columns={gamesColumns} keyField="date" />
      </div>
    )
  }

}

export default GamesPage;
