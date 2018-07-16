import React, { Component } from 'react';

import Replay from './Replay';

class GameReplay extends Component {
  render(){
    return (
      <Replay number={this.props.match.params.number}/>
    )
  }
}

export default GameReplay;
