import React, { Component } from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';

import Replay from '../views/Replay';
import ReplayThumb from '../views/ReplayThumb';

import thumb1 from '../../assets/thumb1.jpg';
import thumb2 from '../../assets/thumb2.jpg';
import thumb3 from '../../assets/thumb3.jpg';

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
          <div id="land-cont-title">
            <div className="land-slogan">Competitive AI</div>
            <div className="land-slogan">Programming Game</div>
            <div id="land-desc">League for artificial intelligence</div>
            <div id="land-btn-try">
              <a href="https://docs.liagame.com/" target="_blank" rel="noopener noreferrer"><div>Try Now</div></a>
            </div>
          </div>
        </div>
        <div className="land-section sec-gray">
          <div className="container">
            <Row>
              <Col md={8}>
                <div className="cont-video">
                  <iframe width="560" height="349" title="Teaser Video" src="https://www.youtube.com/embed/gavqPRhhEg0?rel=0&showinfo=0&fs=0" frameBorder="0"/>
                </div>
              </Col>
              <Col md={4}>
                  <h2 className="land-what-title">What is Lia?</h2>
                  <p className="land-what-text">
                    Lia is a competitive AI programming game where your goal is
                    to lead your units to victory by using your awesome
                    programming skills. Create your AI bot and put it to the
                    test. Our aim is to create an environment where you can
                    compete with your friends and programmers from all around
                    the world.
                  </p>
              </Col>
            </Row>
          </div>
        </div>
        <div className="land-section">
          <div className="land-cont-title">
            <h2 className="land-title">WATCH GAMES</h2>
            <div className="land-subtext">Grab popcorn and watch AIs fight each other.</div>
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
                <ReplayThumb imageSrc={thumb1} onThumbClick={ () => this.setState({ gameId: 1 }) } replayTitle="GreatArmy vs Strongman7" />
              </Col>
              <Col md={4}>
                <ReplayThumb imageSrc={thumb2} onThumbClick={ () => this.setState({ gameId: 2 }) } replayTitle="Sparta300 vs LazyBattalion" />
              </Col>
              <Col md={4}>
                <ReplayThumb imageSrc={thumb3} onThumbClick={ () => this.setState({ gameId: 3 }) } replayTitle="PlayHard vs Spiral44" />
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
                Use Java, Python or Kotlin alongside your favourite IDE to create unbeatable bots that can fight on their own.
              </div>
            </Col>
            <Col className="land-funs" md={4}>
              <div className="land-cont-glyph">
                <Glyphicon className="land-glyph" glyph="road" />
              </div>
              <div className="land-subtitle center-text">Join the leaderboard</div>
              <div className="center-text">
                Join the global leaderboard and compete for fame and glory.
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
