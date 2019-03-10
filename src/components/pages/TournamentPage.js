import React, { Component } from 'react';
import { Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { Switch, Route, withRouter } from 'react-router-dom';
import Countdown from 'react-countdown-now';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TournamentMain from '../views/TournamentMain';
import TournamentRules from '../views/TournamentRules';

import { connect } from 'react-redux';
import { popupsActions } from '../../utils/actions/popupsActions';

import { languageConst } from '../../utils/constants/languageConst';
import textEng from '../../assets/texts/tournamentPageEng';
import textSlo from '../../assets/texts/tournamentPageSlo';

import liaLogo from '../../assets/logotip_border512.png';
import finalsBracket from '../../assets/bracket.png';

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


  /*countdownRenderer = ({ days, hours, minutes, seconds }) => {
    const { content } = this.state;
    return (
        <div className="countdown text-center">
            <div>
                <div className="cd-num">{days}</div>
                <div className="cd-title">{content.cdDays}</div>
            </div>
            <div>
                <div className="cd-num">{hours}</div>
                <div className="cd-title">{content.cdHours}</div>
            </div>
            <div>
                <div className="cd-num">{minutes}</div>
                <div className="cd-title">{content.cdMinutes}</div>
            </div>
            <div>
                <div className="cd-num">{seconds}</div>
                <div className="cd-title">{content.cdSeconds}</div>
            </div>
        </div>
    );
  }*/


  render() {
    const { content } = this.state;
    const currentPath= this.props.location.pathname;
    return (
      <div>
        <div className="custom-section sec-short">
          <div className="container text-center">
            <Col>
              <div>
                <img id="logo-lia" className="tour-lia-logo" src={ liaLogo } alt="Lia" />
              </div>
              <div id="tour-lang">
                <Link to={currentPath + "?lang=" + languageConst.ENGLISH}>ENG</Link>
                <span> | </span>
                <Link to={currentPath + "?lang=" + languageConst.SLOVENIAN}>SLO</Link>
              </div>
              <h2 className="tour-title">{content.titleTour}</h2>
              {currentPath==="/tournament"
                ? (
                  <div id="tour-cont-addition">
                    <h4 className="tour-date">{content.tourDate}</h4>
                    <p>{content.txtBanner}</p>
                    {/*
                    <h3 id="live-now" className="tour-title">{content.txtLive}</h3>
                    <div className="cont-countdown">
                      <Countdown date={"2019-03-09T20:00:00"} renderer={this.countdownRenderer}/>
                    </div>
                    */}
                    <div id="tour-what"><a href="/#what-is-lia" target="_blank" rel="noopener noreferrer">{content.lnkWhat}</a></div>


                    <div className="lead-sec-prize text-center">
                      <div className="lead-cont-prize">
                          <Col md={5}>
                            <a href="/events/slt2019" target="_blank" rel="noopener noreferrer">
                              <img id="img-bracket" src={ finalsBracket } alt="Finals Bracket" />
                            </a>
                          </Col>
                          <Col md={7}>
                            <div className="margin-top20">
                              <h3 className="tour-title">{content.bnrFinalsTitle}</h3>
                              <p>{content.bnrFinalsTxt}</p>
                            </div>

                            <div id="banner-finals-cont-links">

                              <div>
                                <a href="/events/slt2019" target="_blank" rel="noopener noreferrer" className="btn custom-btn custom-btn-lg">
                                  {content.bnrFinalsBtn}
                                </a>
                              </div>

                              <div>
                                <div className="tour-cont-prize">
                                  <div className="tour-cont-icon-sm tour-prize-icon cont-icon-tickets">
                                    <FontAwesomeIcon icon="ticket-alt" className="icon-ticket2"/>
                                    <div className="icon-ticket1-bg">&nbsp;</div>
                                    <FontAwesomeIcon icon="ticket-alt" className="icon-ticket1"/>
                                  </div>
                                  <div>
                                    <div className="tour-prize-text">
                                      <a href="https://goo.gl/forms/xF1q9cTzFgerncvo2" target="_blank" rel="noopener noreferrer">
                                        {content.bnrFinalsTicket1}
                                      </a>
                                    </div>
                                    <div className="tour-prize-subtext">
                                      <div>{content.bnrFinalsTitle}</div>
                                      <div>
                                        <a href="https://www.facebook.com/events/2543198445721481/" target="_blank" rel="noopener noreferrer">
                                          {content.bnrFinalsTicket2}
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </Col>
                      </div>
                    </div>

                  </div>
                )
                : null
              }
            </Col>
          </div>
        </div>

        <Switch>
          <Route exact path='/tournament' render={() => <TournamentMain content={content} />} />
          <Route path='/tournament/rules' render={() => <TournamentRules content={content} />} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect()(TournamentPage));
