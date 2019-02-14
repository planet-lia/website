import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { seconds2time } from '../../utils/helpers/time';
import Table from '../elems/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GamesTable = (props) => {
  const gamesColumns = [  {
    dataField: 'no1',
    text: 'Game',
    formatter: watchNowFormatter
  },{
    dataField: 'no2',
    text: 'Player [rank]',
    formatter: player1Formatter
  },{
    dataField: 'no7',
    text: 'Player [rank]',
    formatter: player2Formatter
  }, {
    dataField: 'no4',
    text: 'Remaining Units',
    formatter: unitsRemainFormatter
  }, {
    dataField: 'no5',
    text: 'Duration',
    formatter: durationFormatter
  }, {
    dataField: 'no6',
    text: 'Date',
    formatter: dateFormatter
  }];

  return (
    <div>
      <Table {...props} columns={gamesColumns} keyField="matchId"/>
    </div>
  )
}

export default GamesTable;

function watchNowFormatter(cell, row, rowIndex) {
  if(row.isCompleted){
    return (
      <span>
        <Link
          to={{
            pathname: "/games/" + row.matchId,
            state: row
          }}
          className="btn-watch"
        >
          <span className="icon"><FontAwesomeIcon icon="tv" color={"#9A3F1B"}/></span>
          <span>Watch</span>
        </Link>
      </span>
    );
  } else {
    return <span className="status-pend">In Progress</span>
  }

}

function dateFormatter(cell, row, rowIndex) {
  if(row.isCompleted){
    const d = new Date(row.date);
    const date = d.toLocaleString();
    return (
      <Moment format="DD/MM/YYYY HH:mm">{date}</Moment>
    );
  } else {
    return "-";
  }
}

/*
function playersFormatter(cell, row, rowIndex) {

  const player1 = usernameToProfileLink(row.player1);
  const player2 = usernameToProfileLink(row.player2);

  const trophyIcon = <FontAwesomeIcon icon="trophy" color={"#CCCCCC"}/>;

  if(row.result===1){
    return (<span><strong>{player1}</strong>&nbsp;{trophyIcon} - {player2}</span>)
  } else if (row.result===2) {
    return (<span>{player1} - <strong>
      {player2}</strong>&nbsp;{trophyIcon}</span>)
  }
}
*/

function player1Formatter(cell, row, rowIndex) {
  return playerFormatter(cell, row, rowIndex, 1)
}

function player2Formatter(cell, row, rowIndex) {
  return playerFormatter(cell, row, rowIndex, 2)
}

function playerFormatter(cell, row, rowIndex, playerIndex) {
  let player = usernameToProfileLink(row.player1);
  let rank = row.player1Rank;
  let isWinner = row.result === 1;
  if (playerIndex === 2) {
    player = usernameToProfileLink(row.player2);
    rank = row.player2Rank;
    isWinner = row.result === 2;
  }

  const trophyIcon = <FontAwesomeIcon icon="trophy" color={"#CCCCCC"}/>;
  const rankField = <span style={{color: "#CCCCCC"}}><small> [{rank}] </small></span>;
  if(isWinner){
    return (<span><strong>{player}</strong>{rankField}&nbsp;{trophyIcon}</span>)
  } else {
    return (<span>{player}{rankField}</span>)
  }
}

function usernameToProfileLink(username) {
  return (<Link to={"/user/" + username} style={{ textDecoration: 'none' }}>{username}</Link>);
}

function durationFormatter(cell, row, rowIndex) {
  if(row.isCompleted){
    return seconds2time(row.duration);
  } else {
    return "-";
  }
}

/*
function playerRanksFormatter(cell, row, rowIndex) {
  return (<span> {row.player1Rank} - {row.player2Rank}</span>);
}
*/

function unitsRemainFormatter(cell, row, rowIndex) {
  if(row.isCompleted){
    return (row.unitsRemain1 + " - " + row.unitsRemain2);
  } else {
    return "-";
  }
}
