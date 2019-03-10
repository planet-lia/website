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
            <Bracket
              battleId={1}
              player1="grekiki1234"
              org1="University of Ljubljana - FMF"
              player2="aleksgorica"
              org2="Gymnasium Nova Gorica"
            />
            <Bracket
              battleId={2}
              player1="neverlucky"
              org1="University of Ljubljana - FMF"
              player2="3Head"
              org2="Gymnasium Vegova"
            />
            <Bracket
              battleId={3}
              player1="ailia"
              org1="University of Ljubljana - FRI"
              player2="Cmaster"
              org2="University of Maribor - FERI"
            />
            <Bracket
              battleId={4}
              player1="Bubberducky"
              org1="University of Ljubljana - FRI"
              player2="Gnorts"
              org2="University of Ljubljana - FRI"
            />
            <Bracket
              battleId={9}
              player1=""
              player2=""
            />
            <Bracket
              battleId={10}
              player1=""
              player2=""
            />
            <Bracket
              battleId={13}
              player1=""
              player2=""
            />
            <Bracket
              battleId={16}
              player1=""
              player2=""
            />
            <Bracket
              battleId={15}
              player1=""
              player2=""
            />
            <Bracket
              battleId={14}
              player1=""
              player2=""
            />
            <Bracket
              battleId={11}
              player1=""
              player2=""
            />
            <Bracket
              battleId={12}
              player1=""
              player2=""
            />
            <Bracket
              battleId={5}
              player1="root"
              org1="University of Ljubljana - FRI"
              player2="HocemPS4"
              org2="University of Ljubljana - FU"
            />
            <Bracket
              battleId={6}
              player1="HugeSmile"
              org1="University of Ljubljana - FRI"
              player2="Shaggy"
              org2="University of Ljubljana - FRI"
            />
            <Bracket
              battleId={7}
              player1="Sever"
              org1="University of Ljubljana - FRI"
              player2="mmartinnee"
              org2="University of Ljubljana - FRI"
            />
            <Bracket
              battleId={8}
              player1="PrekaljeniLisjak"
              org1="University of Ljubljana - FRI"
              player2="TheKing"
              org2="Gymnasium Vegova"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default BracketsPage
