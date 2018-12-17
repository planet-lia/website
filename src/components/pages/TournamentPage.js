import React from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import Prize from '../elems/Prize';

import logoFri from '../../assets/logo_fri.png';
import logoGaraza from '../../assets/logo_garaza.png';

const TournamentPage = () => {
  return (
    <div>
      <div className="custom-section sec-short">
        <div className="container text-center">
          <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
            <div id="tour-lang">ENG | SLO</div>
            <h2 className="tour-title">Slovenian Lia Turnament 2019</h2>
            <p>
              Are you a university or high school student from Slovenia and know
              a little bit of programming?<br />
              Join Lia and battle for the coding glory!
            </p>
            <h3 className="tour-title tour-date">18 February - 15 March</h3>
            <Button bsClass="btn custom-btn custom-btn-xl center-block" disabled>Register Early</Button>
            <div id="tour-what">What is Lia?</div>
          </Col>
        </div>
      </div>

      <div className="custom-section sec-gray sec-short">
        <div className="container">
          <Row className="tour-row-padding">
            <Col md={4} mdOffset={2} sm={5} xs={10} xsOffset={1}>
              <h3 className="tour-title">Want to have fun and beat your friends
                at coding?</h3>
              <p>Pick your favourite language and use our prebuilt starting bots
                to get you going within minutes.</p>
            </Col>
            <Col md={4} mdOffset={0} sm={5} smOffset={0} xs={10} xsOffset={1}>
            </Col>
          </Row>
          <Row>
            <Col md={4} mdOffset={2} sm={5} xs={10} xsOffset={1}>
              <div className="tour-cont-link text-center">
                <div className="tour-cont-icon-lg">
                  <FontAwesomeIcon icon="trophy" />
                </div>
                <Link to="/leaderboard" className="btn custom-btn custom-btn-lg">Leaderboard</Link>
              </div>
              <div className="tour-cont-link text-center">
                <div className="tour-cont-icon-lg position-relative">
                  <FontAwesomeIcon icon="desktop" />
                  <FontAwesomeIcon id="tour-desktop-play" icon="play" />
                </div>
                <Link to="/games" className="btn custom-btn custom-btn-lg">Watch Games</Link>
              </div>
            </Col>
            <Col md={4} mdOffset={0} sm={5} smOffset={0} xs={10} xsOffset={1}>
              <h3 className="tour-title">Check current leaders.</h3>
              <p>Follow our public leaderboard and find out how your classmates
                are doing or watch games played by the best Lia players.</p>
            </Col>
          </Row>
        </div>
      </div>

      <div className="custom-section sec-short">
        <div className="container">
          <Row className="tour-row-padding">
            <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
              <h3 className="tour-title text-center">Agenda</h3>
              <Table bsClass="table tour-agenda">
                <tbody>
                  <tr>
                    <td>18.2. - 10.3.</td>
                    <td>
                      Register and compete on our online leaderboard against
                      other participants.<br />
                      Opened for all university and high school students from
                      Slovenia!
                    </td>
                  </tr>
                  <tr>
                    <td>11.3. - 14.3.</td>
                    <td>
                      Top 16 leaderboard players making final bot improvements
                      for the finals.
                    </td>
                  </tr>
                  <tr>
                    <td>15.3.</td>
                    <td>
                      The <strong>final tournament</strong> at University of
                      Ljubljana Faculty of Computer and Information Science.
                      Free food, drinks and loads of fun!
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col md={8} mdOffset={2}>
              <h3 className="tour-title text-center">Prizes</h3>
              <Row>
                <Col sm={6}>
                  <Prize
                    color="#c1af09"
                    mainText={[<span key="0">Final tournament 1</span>, <sup key="1">st</sup>, <span key="2"> place</span>]}
                    subText="Reward not yet decided"
                  />
                  <Prize
                    color="#9b9b92"
                    mainText={[<span key="0">Final tournament 2</span>, <sup key="1">nd</sup>, <span key="2"> place</span>]}
                    subText="Reward not yet decided"
                  />
                  <Prize
                    color="#9a3f1b"
                    mainText={[<span key="0">Final tournament 3</span>, <sup key="1">rd</sup>, <span key="2"> place</span>]}
                    subText="Reward not yet decided"
                  />
                </Col>
                <Col sm={6}>
                  <Prize
                    color="#018e6a"
                    mainText="Leaderboard winners week 1 to 3"
                    subText="Reward not yet decided"
                  />
                  <Prize
                    color="#018e6a"
                    mainText="Biggest clutch game comeback"
                    subText="Reward not yet decided"
                  />
                  <Prize
                    color="#018e6a"
                    mainText="Tournament best spectator award"
                    subText="Reward not yet decided"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>

      <div className="custom-section sec-gray sec-short">
        <div className="container text-center">
          <h3 className="tour-title">Sponsors & Partners</h3>
          <p>This tournament is only possible thanks to our great sponsors.</p>
          <Row>
            <Col md={2} mdOffset={1} sm={4} xs={6}>
              <div className="tour-company">Your logo here</div>
            </Col>
            <Col md={2} sm={4} xs={6}>
              <div className="tour-company">Your logo here</div>
            </Col>
            <Col md={2} sm={4} smOffset={0} xs={6} xsOffset={3}>
              <div className="tour-company">Your logo here</div>
            </Col>
            <Col md={2} mdOffset={0} sm={4} smOffset={2} xs={6}>
              <div className="tour-company">Your logo here</div>
            </Col>
            <Col md={2} sm={4} xs={6}>
              <div className="tour-company">Your logo here</div>
            </Col>
          </Row>
          <div>
            <img id="logo-fri" className="tour-logo" src={ logoFri } alt="FRI" />
            <img id="logo-garaza" className="tour-logo" src={ logoGaraza } alt="Garaža" />
          </div>
        </div>
      </div>

    </div>
  )
}

export default TournamentPage;
