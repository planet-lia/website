import React from 'react';
import { Link } from 'react-router-dom';

import Table from '../elems/Table';

const GamesTable = (props) => {
  const gamesColumns = [{
    dataField: 'no1',
    text: 'Date',
    formatter: linkFormatter
  }, {
    dataField: 'no2',
    text: 'Players',
    formatter: playersFormatter
  }, {
    dataField: 'no3',
    text: 'Duration',
    formatter: durationFormatter
  }, {
    dataField: 'unitsRemain',
    text: 'Remaining Units (max 16 - 16)'
  }];

  return (
    <div>
      <Table {...props} columns={gamesColumns} keyField="matchId"/>
    </div>
  )
}

export default GamesTable;

function linkFormatter(cell, row, rowIndex) {
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

function playersFormatter(cell, row, rowIndex) {
  if(row.result===1){
    return (<span><strong>{row.player1}</strong>{" vs " + row.player2}</span>)
  } else if (row.result===2) {
    return (<span>{row.player1 + " vs "}<strong>{row.player2}</strong></span>)
  }
}

function durationFormatter(cell, row, rowIndex) {
  let seconds = Math.round(row.duration%60);
  return (Math.floor(row.duration/60) + ":" + ((seconds < 10) ? "0" + seconds : seconds));
}
