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
          <div className="game-stats text-center">{gameProps.date}</div>
          <div className="game-title">
            <div className="text-right">
              {gameProps.player1}
            </div>
            <div>
              vs
            </div>
            <div className="text-left">
              {gameProps.player2}
            </div>
          </div>
          <div className="game-stats text-center">
            {"Duration: " + Math.floor(gameProps.duration/60) + ":" + gameProps.duration%60}
          </div>
        </div>
        <Replay containerId="gameView" replayFileBase64="" number={gameNum}/>
      </div>
    )
  }
}

export default GameReplay;
