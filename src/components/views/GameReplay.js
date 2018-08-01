import React, { Component } from 'react';

import Replay from './Replay';

class GameReplay extends Component {
  render(){
    return (
      <div>
        <div className="cont-game-title">
          <div className="game-title">Creator1 vs Creator2</div>
          <div>vpsmfbvsmbčsl</div>
          <div>7.20.2018</div>
        </div>
        <Replay containerId="gameView" number={this.props.match.params.number}/>
      </div>
    )
  }
}

export default GameReplay;
