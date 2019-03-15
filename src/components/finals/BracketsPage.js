import React, { Component } from 'react';

import Bracket from './Bracket';

import api from '../../utils/api';

import liaLogo from './logotip_border_white256.png';
import './styleBrackets.css'

const NUM_BATTLES = 16;

class BracketsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      battles: [],
      error: null
    }
  }

  componentDidMount = () => {
    this.getBattles();
  }

  getBattles = async () => {
    try {
      const respBattles = await api.game.getBattles();
      this.setState({battles: respBattles.battles});
    } catch(err) {
      this.setState({error: "Network Error"});
      console.log(err.message);
    }
  }

  getBracket = () => {
    const { battles } = this.state;
    let res = [];

    if(battles && battles.length===NUM_BATTLES){

      for(let i=0; i<NUM_BATTLES; i++){
        res.push(
          <Bracket
            key={i+1}
            battleId={battles[i].battleId}
            player1={battles[i].player1}
            player2={battles[i].player2}
            matches={battles[i].matches}
          />
        );
      }
    } else {
      for(let i = 1; i<17; i++){
        res.push(
          <Bracket
            key={i}
            battleId={i}
            player1={null}
            player2={null}
            matches={null}
          />
        );
      }
    }
    return res;
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
            {this.getBracket()}
          </div>
        </div>
      </div>
    )
  }
}

export default BracketsPage
