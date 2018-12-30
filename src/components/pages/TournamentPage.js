import React, { Component } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import queryString from 'query-string';

import Prize from '../elems/Prize';

import { languageConst } from '../../utils/constants/languageConst';
import textEng from '../../assets/texts/tournamentPageEng';
import textSlo from '../../assets/texts/tournamentPageSlo';
import logoPython from '../../assets/logo1.png';
import logoJava from '../../assets/logo2.png';
import logoKotlin from '../../assets/logo3.png';
import logoFri from '../../assets/logo_fri.png';
import logoGaraza from '../../assets/logo_garaza.png';

class TournamentPage extends Component {
  constructor(props){
		super(props);
    this.state = {
      content: textEng
    };
  }

  componentDidMount = () => {
    const parms = queryString.parse(this.props.location.search)
    if(parms.lang){
      this.onLanguageChange(parms.lang);
    } else {
      const lang = localStorage.getItem("tourLang");
      if(lang){
        this.onLanguageChange(lang);
      }
    }
  }

  onLanguageChange = (language) => {
    if(language===languageConst.SLOVENIAN){
      localStorage.setItem("tourLang", languageConst.SLOVENIAN);
      this.setState({content: textSlo})
    } else {
      localStorage.setItem("tourLang", languageConst.ENGLISH);
      this.setState({content: textEng})
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
                <Link to={"/tournament?lang=" + languageConst.ENGLISH}>ENG</Link>
                <span> | </span>
                <Link to={"/tournament?lang=" + languageConst.SLOVENIAN}>SLO</Link>
              </div>
              <h2 className="tour-title">{content.titleTour}</h2>
              <p>{content.txtBanner}</p>
              <h3 className="tour-title tour-date">{content.tourDate}</h3>
              <Button bsClass="btn custom-btn custom-btn-xl center-block" disabled>{content.btnRegisterEarly}</Button>
              <div id="tour-what"><HashLink to="/#what-is-lia">{content.lnkWhat}</HashLink></div>
            </Col>
          </div>
        </div>

        <div className="custom-section sec-gray sec-short">
          <div className="container">
            <Row className="tour-row-padding tour-row-xs-padding">
              <Col sm={6}>
                <h3 className="tour-title">{content.titleWant}</h3>
                <p>{content.txtWant}</p>
              </Col>
              <Col sm={6}>
                <div id="tour-cont-plang">
                  <div>
                    <img id="logo-python" className="tour-plang-logo" src={ logoPython } alt="Python" />
                  </div>
                  <div>
                    <img id="logo-java" className="tour-plang-logo" src={ logoJava } alt="Java" />
                  </div>
                  <div>
                    <img id="logo-kotlin" className="tour-plang-logo" src={ logoKotlin } alt="Kotlin" />
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="tour-row-padding">
              <Col sm={6} smPush={6}>
                <h3 className="tour-title">{content.titleCheck}</h3>
                <p>{content.txtCheck}</p>
              </Col>
              <Col sm={6} smPull={6}>
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
            </Row>
            <Row>
              <Col sm={6}>
                <h3 className="tour-title">{content.titleGetStarted}</h3>
                <p>{content.txtGetStarted}</p>
              </Col>
              <Col sm={6}>
                <div className="tour-cont-link text-center">
                  <div className="tour-cont-unit">
                    <img id="yellow-unit" src="/assets/unit1.png" alt="yellow unit"/>
                  </div>
                  <Link to="/editor" className="btn custom-btn custom-btn-lg">{content.btnEditor}</Link>
                </div>
                <div className="tour-cont-link text-center">
                <div className="tour-cont-unit">
                  <img id="green-unit" src="/assets/unit2.png" alt="green unit"/>
                </div>
                  <Button bsClass="btn custom-btn custom-btn-lg" href="https://docs.liagame.com/getting-started/" target="_blank" rel="noopener noreferrer">{content.btnGetStarted}</Button>
                </div>
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
            <Row className="tour-row-padding">
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
            <Row>
              <Col>
                <h3 className="tour-title text-center">{content.titleAgenda}</h3>
                <p className="text-center">{content.txtRules + content.linkRules + "."}</p>
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
