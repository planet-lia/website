import React, { Component } from 'react';
import { Row, Col, Glyphicon, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Scrollchor from 'react-scrollchor';
import { Link } from 'react-router-dom';

import Replay from '../elems/Replay';
import ReplayThumb from '../elems/ReplayThumb';
import Popup from '../views/Popup';
import TryOut from '../forms/TryOut';
import SubscriptionPopup from '../views/SubscriptionPopup';

import thumb1 from '../../assets/thumb1.jpg';
import thumb2 from '../../assets/thumb2.jpg';
import thumb3 from '../../assets/thumb3.jpg';
import logoFri from '../../assets/logo_fri.png';
import logoGaraza from '../../assets/logo_garaza.png';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: null,
      showTryNowPopup: false,
      showSubscribePopup: false
    }
  }

  onTryNow = () => {
    window.open("/editor", "_self");
  }

  onPopupClose = () => {
    this.setState({
      showTryNowPopup: false,
      showSubscribePopup: false
    });
  }

  render() {
    return (
      <div>
        <div id="land-pic">
          <div id="land-cont-title">
            <div className="land-slogan">Competitive</div>
            <div className="land-slogan">Coding Game</div>
            <div id="land-desc">Bring your code to life</div>
            <Button bsClass="btn land-btn btn-try" onClick={() => this.setState({showTryNowPopup: true})}>Live Demo<div className="btn-subtext">Without registration</div></Button>
            <Button bsClass="btn land-btn btn-sub" onClick={() => this.setState({showSubscribePopup: true})}>Subscribe</Button>
          </div>
        </div>
        <div className="custom-section sec-short">
          <div className="container text-center">
            <h2 className="tour-title">Slovenian Lia Tournament 2019</h2>
            <p>
              Are you a university or high school student from Slovenia and know
              a little bit of programming?<br />
              Join Lia and battle for the coding glory!
            </p>
            <h3 className="tour-title tour-date">18 Feb - 14 Mar</h3>
            <Link to="/tournament" className="btn custom-btn custom-btn-xl">Tournament Page</Link>
            <div>
              <a href="https://garaza.io/" target="_blank" rel="noopener noreferrer">
                <img id="logo-garaza" className="tour-logo" src={ logoGaraza } alt="Garaža" />
              </a>
              <a href="https://fri.uni-lj.si/" target="_blank" rel="noopener noreferrer">
                <img id="logo-fri" className="tour-logo" src={ logoFri } alt="FRI" />
              </a>
            </div>
          </div>
        </div>
        <div id="what-is-lia" className="custom-section sec-gray">
          <div className="container">
            <Row>
              <Col md={7}>
                <div className="cont-video">
                  <iframe width="560" height="349" title="Teaser Video" src="https://www.youtube.com/embed/aB4XEbj-R9Y?rel=0&showinfo=0" frameBorder="0" allowFullScreen />
                </div>
              </Col>
              <Col md={5}>
                  <h2 className="land-what-title">What is Lia?</h2>
                  <p className="land-what-text">
                    Lia is a competitive coding game where your goal is
                    to lead your units to victory by using your awesome
                    coding skills. Create your bot and put it to the
                    test. Our aim is to create an environment where you can
                    compete with your friends and programmers from all around
                    the world.
                  </p>
                  <div id="land-cont-contact">
                    <a className="land-contact-logo clr-fb" href="https://www.facebook.com/liagame/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={["fab", "facebook-square"]} /></a>
                    <a className="land-contact-logo clr-gh" href="https://github.com/liagame/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={["fab", "github"]} /></a>
                    <a className="land-contact-logo clr-yt" href="https://www.youtube.com/channel/UC4BFxoC4iBr3m5LQVBxBDzA" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={["fab", "youtube"]} /></a>
                    <a className="land-contact-logo clr-em" href="mailto:info@liagame.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon="envelope" /></a>
                  </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="custom-section">
          <div className="land-cont-title">
            <h2 className="land-title">WATCH GAMES</h2>
            <div className="land-subtext">Watch programmers battle each other.</div>
          </div>
          <div className="container" id="land-cont-watch">
            { this.state.gameId
              ? (<Row>
                  <Col id="land-cont-player">
                    { this.state.gameId===1 ? <Replay containerId="player1" replayFileBase64="" number={ this.state.gameId } /> : null }
                    { this.state.gameId===2 ? <Replay containerId="player1" replayFileBase64="" number={ this.state.gameId } /> : null }
                    { this.state.gameId===3 ? <Replay containerId="player1" replayFileBase64="" number={ this.state.gameId } /> : null }
                  </Col>
                </Row>)
              : null
            }
            <Row>
              <Col md={4}>
                <Scrollchor to="#land-cont-watch"><ReplayThumb imageSrc={thumb1} onThumbClick={ () => this.setState({ gameId: 1 }) } replayTitle="Ninja7 vs SuperGit" /></Scrollchor>
              </Col>
              <Col md={4}>
                <Scrollchor to="#land-cont-watch"><ReplayThumb imageSrc={thumb2} onThumbClick={ () => this.setState({ gameId: 2 }) } replayTitle="recursive vs TheStudent" /></Scrollchor>
              </Col>
              <Col md={4}>
                <Scrollchor to="#land-cont-watch"><ReplayThumb imageSrc={thumb3} onThumbClick={ () => this.setState({ gameId: 3 }) } replayTitle="recursive vs TheStudent" /></Scrollchor>
              </Col>
            </Row>
          </div>
        </div>
        <div className="custom-section sec-gray">
          <div className="land-cont-title">
            <h2 className="land-title">COMPETE</h2>
            <div className="land-subtext">Code, fight, win. And have fun!</div>
          </div>
          <div className="container">
            <Col className="land-funs" md={4}>
              <div className="land-cont-glyph">
                <Glyphicon className="land-glyph" glyph="wrench" />
              </div>
              <div className="land-subtitle center-text">Develop bots</div>
              <div className="center-text">
                Use Java, Python3 or Kotlin to create your very own bot.
              </div>
            </Col>
            <Col className="land-funs" md={4}>
              <div className="land-cont-glyph">
                <Glyphicon className="land-glyph" glyph="road" />
              </div>
              <div className="land-subtitle center-text">Join the leaderboard</div>
              <div className="center-text">
                Join the global leaderboard and compete for coding fame and glory.
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
        <Popup
          dialogClassName="custom-popup pop-text"
          show={this.state.showTryNowPopup}
          onHide={this.onPopupClose}
          onButtonClick={this.onTryNow}
          heading="Live Demo"
          buttonText="Online Editor"
          center={true}
        >
          <TryOut />
        </Popup>
        <SubscriptionPopup
          dialogClassName="custom-popup pop-sub pop-text"
          show={this.state.showSubscribePopup}
          onHide={this.onPopupClose}
          onButtonClick={this.onPopupClose}
          heading="Subscribe"
          buttonText="Subscribe"
        />
      </div>

    );
  }

}

export default LandingPage;
