import React, { Component } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { languageConst } from '../../utils/constants/languageConst'

import Prize from '../elems/Prize';

import textEng from '../../assets/texts/tournamentPageEng'
import textSlo from '../../assets/texts/tournamentPageSlo'
import logoFri from '../../assets/logo_fri.png';
import logoGaraza from '../../assets/logo_garaza.png';

class TournamentPage extends Component {
  constructor(props){
		super(props);
    this.state = {
      content: textEng
    };
  }

  onLanguageChange = (language) => {
    if(language===languageConst.ENGLISH){
      this.setState({content: textEng})
    } else if(language===languageConst.SLOVENIAN){
      this.setState({content: textSlo})
    }

  }

  render() {
    const { content } = this.state;
    return (
      <div>
        <div className="custom-section sec-short">
          <div className="container text-center">
            <Col>
              <div id="tour-lang">
                <a onClick={() => this.onLanguageChange(languageConst.ENGLISH)}>ENG</a>
                <span> | </span>
                <a onClick={() => this.onLanguageChange(languageConst.SLOVENIAN)}>SLO</a>
              </div>
              <h2 className="tour-title">{content.titleTour}</h2>
              <p>{content.txtBanner}</p>
              <h3 className="tour-title tour-date">{content.tourDate}</h3>
              <Button bsClass="btn custom-btn custom-btn-xl center-block" disabled>{content.btnRegisterEarly}</Button>
              <div id="tour-what"><Link to="/">{content.lnkWhat}</Link></div>
            </Col>
          </div>
        </div>

        <div className="custom-section sec-gray sec-short">
          <div className="container">
            <Row className="tour-row-padding">
              <Col sm={6}>
                <h3 className="tour-title">{content.titleWant}</h3>
                <p>{content.txtWant}</p>
              </Col>
              <Col sm={6}>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <div className="tour-cont-link text-center">
                  <div className="tour-cont-icon-lg">
                    <FontAwesomeIcon icon="trophy" />
                  </div>
                  <Link to="/leaderboard" className="btn custom-btn custom-btn-lg">{content.btnLeaderboard}</Link>
                </div>
                <div className="tour-cont-link text-center">
                  <div className="tour-cont-icon-lg position-relative">
                    <FontAwesomeIcon icon="desktop" />
                    <FontAwesomeIcon id="tour-desktop-play" icon="play" />
                  </div>
                  <Link to="/games" className="btn custom-btn custom-btn-lg">{content.btnWatch}</Link>
                </div>
              </Col>
              <Col sm={6}>
                <h3 className="tour-title">{content.titleCheck}</h3>
                <p>{content.txtCheck}</p>
              </Col>
            </Row>
          </div>
        </div>

        <div className="custom-section sec-short">
          <div className="container">
            <Row className="tour-row-padding">
              <Col lg={10} lgOffset={1} md={12}>
                <h3 className="tour-title text-center">{content.titleAgenda}</h3>
                <Table bsClass="table tour-agenda">
                  <tbody>
                    <tr>
                      <td>18.2. - 10.3.</td>
                      <td>
                        {content.txtAgenda1}
                      </td>
                    </tr>
                    <tr>
                      <td>11.3. - 14.3.</td>
                      <td>
                        {content.txtAgenda2}
                      </td>
                    </tr>
                    <tr>
                      <td>15.3.</td>
                      <td>
                        {content.txtAgenda3}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col lg={10} lgOffset={1} md={12}>
                <h3 className="tour-title text-center">{content.titlePrizes}</h3>
                <Row>
                  <Col sm={6}>
                    <Prize
                      color="#c1af09"
                      mainText={content.txtPrize1}
                      subText={content.txtSubPrize1}
                    />
                    <Prize
                      color="#9b9b92"
                      mainText={content.txtPrize2}
                      subText={content.txtSubPrize2}
                    />
                    <Prize
                      color="#9a3f1b"
                      mainText={content.txtPrize3}
                      subText={content.txtSubPrize3}
                    />
                  </Col>
                  <Col sm={6}>
                    <Prize
                      color="#018e6a"
                      mainText={content.txtPrize4}
                      subText={content.txtSubPrize4}
                    />
                    <Prize
                      color="#018e6a"
                      mainText={content.txtPrize5}
                      subText={content.txtSubPrize5}
                    />
                    <Prize
                      color="#018e6a"
                      mainText={content.txtPrize6}
                      subText={content.txtSubPrize6}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>

        <div className="custom-section sec-gray sec-short">
          <div className="container text-center">
            <h3 className="tour-title">{content.titleSponsors}</h3>
            <p>{content.txtSponsors}</p>
            <Row>
              <Col md={2} mdOffset={1} sm={4} xs={6}>
                <div className="tour-company">{content.txtLogoHere}</div>
              </Col>
              <Col md={2} sm={4} xs={6}>
                <div className="tour-company">{content.txtLogoHere}</div>
              </Col>
              <Col md={2} sm={4} smOffset={0} xs={6} xsOffset={3}>
                <div className="tour-company">{content.txtLogoHere}</div>
              </Col>
              <Col md={2} mdOffset={0} sm={4} smOffset={2} xs={6}>
                <div className="tour-company">{content.txtLogoHere}</div>
              </Col>
              <Col md={2} sm={4} xs={6}>
                <div className="tour-company">{content.txtLogoHere}</div>
              </Col>
            </Row>
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

      </div>
    )
  }
}

export default TournamentPage;