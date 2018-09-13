import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

import Replay from './Replay';
import data from '../../assets/GamesData';

class GameReplay extends Component {
  render(){
    const gameNum = Number(this.props.match.params.number);
    var gameProps = data.find(function (obj) { return obj.gameNum === gameNum; });
    return (
      <div>
        <div className="cont-game-title">
          <div className="game-title">{gameProps.player1 + " vs " + gameProps.player2}</div>
          <Col md={2} mdOffset={4}>{Math.floor(gameProps.duration/60) + ":" + gameProps.duration%60}</Col>
          <Col md={2}>{gameProps.date}</Col>
        </div>
        <Replay containerId="gameView" number={gameNum}/>
      </div>
    )
  }
}

export default GameReplay;
