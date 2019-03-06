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

import liaLogo from '../../assets/logotip_border1024.png';

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


  countdownRenderer = ({ days, hours, minutes, seconds }) => {
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
  }


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
                  <div>
                    <h4 className="tour-date">{content.tourDate}</h4>
                    <p>{content.txtBanner}</p>
                    <h3 id="live-now" className="tour-title">{content.txtLive}</h3>
                    <Countdown date={"2019-03-09T20:00:00"} renderer={this.countdownRenderer}/>

                    <Button
                      bsClass="btn custom-btn custom-btn-xl center-block"
                      onClick={() => this.props.dispatch(popupsActions.showEarlyRegistration())}
                    >
                      {content.btnRegisterEarly}
                    </Button>
                    <div id="tour-what"><a href="/#what-is-lia" target="_blank" rel="noopener noreferrer">{content.lnkWhat}</a></div>

                    <div id="cont-banner-fb">
                      <a href="https://www.facebook.com/events/2543198445721481/" target="_blank" rel="noopener noreferrer">
                        <div id="banner-fb">
                          <div id="icon-fb" className="clr-fb">
                            <FontAwesomeIcon icon={["fab", "facebook-square"]} />
                          </div>
                          <div className="text-left">
                            <div>
                              {content.bnrFBTxt1}
                            </div>
                            <div>
                              {content.bnrFBTxt2}
                            </div>
                          </div>
                        </div>
                      </a>
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
