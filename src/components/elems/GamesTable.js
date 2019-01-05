import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { seconds2time } from '../../utils/helpers/time';
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
    dataField: 'no4',
    text: 'Remaining Units (max 16 - 16)',
    formatter: unitsRemainFormatter
  }];

  return (
    <div>
      <Table {...props} columns={gamesColumns} keyField="matchId"/>
    </div>
  )
}

export default GamesTable;

function linkFormatter(cell, row, rowIndex) {
  const d = new Date(row.date);
  const date = d.toLocaleString();
  return (
    <Link to={{
      pathname: "/games/" + row.matchId,
      state: row
    }} style={{ textDecoration: 'none' }}>
      <Moment format="DD/MM/YYYY HH:mm">{date}</Moment>
    </Link>
  );
}

function playersFormatter(cell, row, rowIndex) {

  const player1 = usernameToProfileLink(row.player1);
  const player2 = usernameToProfileLink(row.player2);

  if(row.result===1){
    return (<span><strong>{player1}</strong> vs {player2}</span>)
  } else if (row.result===2) {
    return (<span>{player1} vs <strong>{player2}</strong></span>)
  }
}

function usernameToProfileLink(username) {
  return (<Link to={"/user/" + username} style={{ textDecoration: 'none' }}>{username}</Link>);
}

function durationFormatter(cell, row, rowIndex) {
  return seconds2time(row.duration);
}

function unitsRemainFormatter(cell, row, rowIndex) {
  return (row.unitsRemain1 + " - " + row.unitsRemain2);
}
