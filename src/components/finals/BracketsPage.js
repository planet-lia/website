import React, { Component } from 'react';

import Bracket from './Bracket'

import liaLogo from './logotip_border_white256.png';
import './styleBrackets.css'

class BracketsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div id="cont-brackets-page">
        <div className="cont-brackets">
          <div id="title">
            <img id="logo-lia" src={ liaLogo } alt="Lia" />
            <h3>Slovenian Lia Tournament 2019</h3>
            <h3>Finals</h3>
          </div>
          <Bracket battleId={1} player1="Player1" player2="Player2"/>
          <Bracket battleId={2} player1="Player1" player2="notPlayer1"/>
          <Bracket battleId={3} player1="Player1" player2="Player2"/>
          <Bracket battleId={4} player1="Player1" player2="Player2"/>
          <Bracket battleId={9} player1="Player1" player2="Player2"/>
          <Bracket battleId={10} player1="Player1" player2="Player2"/>
          <Bracket battleId={13} player1="Player1" player2="Player2"/>
          <Bracket battleId={16} player1="Player1" player2="Player2"/>
          <Bracket battleId={15} player1="Player1" player2="Player2"/>
          <Bracket battleId={14} player1="Player1" player2="Player2"/>
          <Bracket battleId={11} player1="Player1" player2="Player2"/>
          <Bracket battleId={12} player1="Player1" player2="Player2"/>
          <Bracket battleId={5} player1="Player1" player2="Player2"/>
          <Bracket battleId={6} player1="Player1" player2="Player2"/>
          <Bracket battleId={7} player1="Player1" player2="Player2"/>
          <Bracket battleId={8} player1="Player1" player2="Player2"/>
        </div>
      </div>
    )
  }
}

export default BracketsPage
