import React, { Component } from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';

import Replay from '../views/Replay';

import thumb1 from '../../assets/thumb1.jpg'
import thumb2 from '../../assets/thumb2.jpg'
import thumb3 from '../../assets/thumb3.jpg'

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: null,
    }
  }

  render() {
    return (
      <div>
        <div id="land-pic">
          <div id="land-cont-try">
            <div id="land-btn-try">Try Out</div>
          </div>
        </div>
        <div className="land-section">
          <div className="land-cont-title">
            <h2 className="land-title">WATCH GAMES</h2>
            <div className="land-subtext">Grab your popcorn and watch AIs fight each other.</div>
          </div>
          <div className="container" id="land-cont-watch">
            <Row>
              <Col id="land-cont-player">
                { this.state.gameId===1 ? <Replay containerId="player1" number={ this.state.gameId } /> : null }
                { this.state.gameId===2 ? <Replay containerId="player1" number={ this.state.gameId } /> : null }
                { this.state.gameId===3 ? <Replay containerId="player1" number={ this.state.gameId } /> : null }
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <img className="land-thumbnail" src={thumb1} onClick={ () => this.setState({ gameId: 1 }) }/>
                <div className="land-thumb-title" onClick={ () => this.setState({ gameId: 1 }) }>GreatArmy vs Strongman7</div>
              </Col>
              <Col md={4}>
                <img className="land-thumbnail" src={thumb2} onClick={ () => this.setState({ gameId: 2 }) } />
                <div className="land-thumb-title" onClick={ () => this.setState({ gameId: 2 }) }>Sparta300 vs LazyBattalion</div>
              </Col>
              <Col md={4}>
                <img className="land-thumbnail" src={thumb3} onClick={ () => this.setState({ gameId: 3 }) } />
                <div className="land-thumb-title" onClick={ () => this.setState({ gameId: 3 }) }>PlayHard vs Spiral44</div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="land-section sec-gray">
          <div className="land-cont-title">
            <h2 className="land-title">COMPETE</h2>
            <div className="land-subtext">Build, test, battle. Create the ultimate bot.</div>
          </div>
          <div className="container">
            <Col className="land-funs" md={4}>
              <div className="land-cont-glyph">
                <Glyphicon className="land-glyph" glyph="wrench" />
              </div>
              <div className="land-subtitle center-text">Develop bots</div>
              <div className="center-text">
                Use your favourite programming language and IDE to create unbeatable bots that can fight on their own.
              </div>
            </Col>
            <Col className="land-funs" md={4}>
              <div className="land-cont-glyph">
                <Glyphicon className="land-glyph" glyph="road" />
              </div>
              <div className="land-subtitle center-text">Join the ladder</div>
              <div className="center-text">
                Join the global ladder and compete for fame and glory.
              </div>
            </Col>
            <Col className="land-funs" md={4}>
              <div className="land-cont-glyph">
                <Glyphicon className="land-glyph" glyph="screenshot" />
              </div>
              <div className="land-subtitle center-text">Battle others</div>
              <div className="center-text">
                Battle your bots against the ones created by your friends or developers from all around the world.
              </div>
            </Col>
          </div>
        </div>
      </div>

    );
  }

}

export default LandingPage;
