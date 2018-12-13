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

        <div className="cont-game-title text-center">
          <div className="game-title">
            {gameProps.player1 + " vs " + gameProps.player2}
          </div>
          <div className="game-stats">{gameProps.date}</div>
          <div className="game-stats">
            {"Duration: " + Math.floor(gameProps.duration/60) + ":" + gameProps.duration%60}
          </div>
        </div>
        <Replay containerId="gameView" replayFileBase64="" number={gameNum}/>
      </div>
    )
  }
}

export default GameReplay;
