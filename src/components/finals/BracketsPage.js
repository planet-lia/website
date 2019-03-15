import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  getWinners = () => {
    let winners = {
      first: "",
      second: "",
      third: "",
      isWinners: true
    };

    const { battles } = this.state;
    const battleFinal = battles.filter((battle) => { return battle.battleId === 16; }).pop();
    const battleForThird = battles.filter((battle) => { return battle.battleId === 15; }).pop();

    let matchesFinal = [];
    let matchesForThird = [];

    if(battleFinal && battleForThird && Array.isArray(battleFinal.matches) && Array.isArray(battleForThird.matches)){
      matchesFinal = battleFinal.matches.filter(
        (match) => { return (match.status === "completed" && match.isPublic) }
      );
      matchesForThird = battleForThird.matches.filter(
        (match) => { return (match.status === "completed" && match.isPublic) }
      );

      let player1WinFinal = 0;
      let player2WinFinal = 0;
      for(let i=0; i<matchesFinal.length; i++){
        if(matchesFinal[i].winnerUserId===battleFinal.player1.userId){
          player1WinFinal++;
        } else if(matchesFinal[i].winnerUserId===battleFinal.player2.userId) {
          player2WinFinal++;
        } else {
          winners.isWinners = false;
          //console.log("Wrong userId. F");  //DEBUG
        }
      }

      if(player1WinFinal > player2WinFinal) {
        winners.first = battleFinal.player1.username;
        winners.second = battleFinal.player2.username;
      } else if(player1WinFinal < player2WinFinal){
        winners.first = battleFinal.player2.username;
        winners.second = battleFinal.player1.username;
      } else {
        winners.isWinners = false;
      }

      let player1WinForThird = 0;
      let player2WinForThird = 0;
      for(let i=0; i<matchesForThird.length; i++){
        if(matchesForThird[i].winnerUserId===battleForThird.player1.userId){
          player1WinForThird++;
        } else if(matchesForThird[i].winnerUserId===battleForThird.player2.userId) {
          player2WinForThird++;
        } else {
          winners.isWinners = false;
          //console.log("Wrong userId. 3"); //DEBUG
        }
      }

      if(player1WinForThird > player2WinForThird) {
        winners.third = battleForThird.player1.username;
      } else if(player1WinForThird < player2WinForThird){
        winners.third = battleForThird.player2.username;
      } else {
        winners.isWinners = false;
      }

    } else {
      winners.isWinners = false;
      //console.log("Wrong battleId"); //DEBUG
    }

    if(winners.isWinners) {
      return winners;
    } else {
      return {
        first: "- - -",
        second: "- - -",
        third: "- - -",
        isWinners: true
      }
    }


  }

  render() {
    const winners = this.getWinners();

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
            <div id="brackets-winners">
              <div>
                <div className="cont-win-icon"><FontAwesomeIcon icon="trophy" color="#d9c72e"/></div>
                <div className="cont-win-name">{winners.first}</div>
                <div className="cont-win-icon"><FontAwesomeIcon icon="trophy" color="#d9c72e"/></div>
              </div>
              <div>
                <div className="cont-win-icon"><FontAwesomeIcon icon="trophy" color="#9b9b92"/></div>
                <div className="cont-win-name">{winners.second}</div>
                <div className="cont-win-icon"><FontAwesomeIcon icon="trophy" color="#9b9b92"/></div>
              </div>
              <div>
                <div className="cont-win-icon"><FontAwesomeIcon icon="trophy" color="#9a3f1b"/></div>
                <div className="cont-win-name">{winners.third}</div>
                <div className="cont-win-icon"><FontAwesomeIcon icon="trophy" color="#9a3f1b"/></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BracketsPage
