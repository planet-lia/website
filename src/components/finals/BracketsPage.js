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
      <div>
        <div className="container">
          <div id="bracket-title">
            <img id="logo-lia" src={ liaLogo } alt="Lia" />
            <h2>Slovenian Lia Tournament 2019</h2>
            <h2>Finals</h2>
          </div>
        </div>
        <div id="cont-brackets-page">
          <div className="cont-brackets">
            <Bracket battleId={1} player1="grekiki1234" player2="Pick 1"/>
            <Bracket battleId={2} player1="neverlucky" player2="Pick 2"/>
            <Bracket battleId={3} player1="ailia" player2="Pick 3"/>
            <Bracket battleId={4} player1="Bubberducky" player2="Pick 4"/>
            <Bracket battleId={9} player1="- - -" player2="- - -"/>
            <Bracket battleId={10} player1="- - -" player2="- - -"/>
            <Bracket battleId={13} player1="- - -" player2="- - -"/>
            <Bracket battleId={16} player1="- - -" player2="- - -"/>
            <Bracket battleId={15} player1="- - -" player2="- - -"/>
            <Bracket battleId={14} player1="- - -" player2="- - -"/>
            <Bracket battleId={11} player1="- - -" player2="- - -"/>
            <Bracket battleId={12} player1="- - -" player2="- - -"/>
            <Bracket battleId={5} player1="root" player2="Pick 5"/>
            <Bracket battleId={6} player1="HugeSmile" player2="Pick 6"/>
            <Bracket battleId={7} player1="Sever" player2="Pick 7"/>
            <Bracket battleId={8} player1="PrekaljeniLisjak" player2="Pick 8"/>
          </div>
        </div>
      </div>
    )
  }
}

export default BracketsPage
