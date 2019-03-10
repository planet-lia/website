import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

import Bracket from './Bracket'

import liaLogo from '../../assets/logotip_border1024.png';
import './styleBrackets.css'

class BracketsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <div className="custom-section sec-short">
          <div className="container text-center">
            <Col>
              <div>
                <img id="logo-lia" className="tour-lia-logo" src={ liaLogo } alt="Lia" />
              </div>
              <h2 className="tour-title">Slovenian Lia Tournament 2019</h2>
            </Col>
          </div>
        </div>
        <div id="cont-brackets-page">
          <div className="cont-brackets">
            <div id="title">
              <h1>Finals</h1>
            </div>
            <Bracket battleId={1} player1="1st_Ranked" player2="1st_Pick"/>
            <Bracket battleId={2} player1="8th_Ranked" player2="2nd_Pick"/>
            <Bracket battleId={3} player1="5th_Ranked" player2="3rd_Pick"/>
            <Bracket battleId={4} player1="4th_Ranked" player2="4th_Pick"/>
            <Bracket battleId={9} player1="- - -" player2="- - -"/>
            <Bracket battleId={10} player1="- - -" player2="- - -"/>
            <Bracket battleId={13} player1="- - -" player2="- - -"/>
            <Bracket battleId={16} player1="- - -" player2="- - -"/>
            <Bracket battleId={15} player1="- - -" player2="- - -"/>
            <Bracket battleId={14} player1="- - -" player2="- - -"/>
            <Bracket battleId={11} player1="- - -" player2="- - -"/>
            <Bracket battleId={12} player1="- - -" player2="- - -"/>
            <Bracket battleId={5} player1="2nd_Ranked" player2="5th_Pick"/>
            <Bracket battleId={6} player1="7th_Ranked" player2="6th_Pick"/>
            <Bracket battleId={7} player1="6th_Ranked" player2="7th_Pick"/>
            <Bracket battleId={8} player1="3rd_Ranked" player2="8th_Pick"/>
          </div>
        </div>
      </div>
    )
  }
}

export default BracketsPage
