import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { seconds2time } from '../../utils/helpers/time';
import Table from '../elems/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GamesTable = (props) => {
  const gamesColumns = [{
    dataField: 'no1',
    text: 'Opponents',
    formatter: playersFormatter
  }, {
    dataField: 'no3',
    text: 'Remaining Units',
    formatter: unitsRemainFormatter
  }, {
    dataField: 'no4',
    text: 'Duration',
    formatter: durationFormatter
  }, {
    dataField: 'no5',
    text: 'Date',
    formatter: dateFormatter
  },{
    dataField: 'no6',
    text: 'Game',
    formatter: linkFormatter
  }];

  return (
    <div>
      <Table {...props} columns={gamesColumns} keyField="matchId"/>
    </div>
  )
}

export default GamesTable;

function linkFormatter(cell, row, rowIndex) {
  const textStyle = {color: "#9A3F1B"};
  return (
    <span>
      <Link to={{
        pathname: "/games/" + row.matchId,
        state: row
      }} style={{ textDecoration: 'none' }}>
        &nbsp;&nbsp;
        <FontAwesomeIcon icon="tv" color={"#9A3F1B"}/>
        <span style={textStyle}>&nbsp; Watch now</span>
      </Link>
    </span>
  );
}

function dateFormatter(cell, row, rowIndex) {
  const d = new Date(row.date);
  const date = d.toLocaleString();
  return (
    <Moment format="DD/MM/YYYY HH:mm">{date}</Moment>
  );
}


function playersFormatter(cell, row, rowIndex) {

  const player1 = usernameToProfileLink(row.player1);
  const player2 = usernameToProfileLink(row.player2);

  const player1Rank = row.player1Rank;
  const player2Rank = row.player2Rank;

  const trophyIcon = <FontAwesomeIcon icon="trophy" color={"#CCCCCC"}/>;

  if(row.result===1){
    return (<span><strong>{player1}</strong><small>&nbsp;({player1Rank})&nbsp;{trophyIcon}</small> - {player2}
    <small>&nbsp;({player2Rank})</small></span>)
  } else if (row.result===2) {
    return (<span>{player1}<small>&nbsp;({player1Rank})</small> - <strong>
      {player2}</strong><small>&nbsp;({player2Rank})</small>&nbsp;{trophyIcon}</span>)
  }
}

function usernameToProfileLink(username) {
  return (<Link to={"/user/" + username} style={{ textDecoration: 'none' }}>{username}</Link>);
}

function durationFormatter(cell, row, rowIndex) {
  return seconds2time(row.duration);
}

function playerRanksFormatter(cell, row, rowIndex) {
  return (row.player1Rank + " - " + row.player2Rank);
}


function unitsRemainFormatter(cell, row, rowIndex) {
  return (row.unitsRemain1 + " - " + row.unitsRemain2);
}
