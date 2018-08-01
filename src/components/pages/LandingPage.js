import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';

const LandngPage = () => {
  return (
    <div>
      <div id="land-pic">
        <div id="land-btn-try">Try Out</div>
      </div>
      <div className="land-section">
        <div className="land-cont-title">
          <h2 className="land-title">WATCH GAMES</h2>
          <div className="land-subtext">Grab your popcorn and watch AIs fight each other.</div>
        </div>
        <div className="container" id="land-cont-thumbs">
          <Row>

          </Row>
          <Row>
            <Col md={4}>
              <div className="land-thumbnail"></div>
              <div className="land-subtitle">GreatArmy vs Strongman7</div>
            </Col>
            <Col md={4}>
              <div className="land-thumbnail"></div>
              <div className="land-subtitle">Sparta300 vs LazyBattalion</div>
            </Col>
            <Col md={4}>
              <div className="land-thumbnail"></div>
              <div className="land-subtitle">PlayHard vs Spiral44</div>
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
        <Col md={4}>
          <div className="land-cont-glyph">
            <Glyphicon className="land-glyph" glyph="wrench" />
          </div>
          <div className="land-subtitle center-text">Develop bots</div>
          <div className="center-text">
            Use your favourite programming language and IDE to create unbeatable bots that can fight on their own.
          </div>
        </Col>
        <Col md={4}>
          <div className="land-cont-glyph">
            <Glyphicon className="land-glyph" glyph="road" />
          </div>
          <div className="land-subtitle center-text">Join the ladder</div>
          <div className="center-text">
            Join the global ladder and compete for fame and glory.
          </div>
        </Col>
        <Col md={4}>
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

export default LandngPage;
