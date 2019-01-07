import React, { Component } from 'react';
import { Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { Switch, Route } from 'react-router-dom';

import TournamentMain from '../views/TournamentMain'
import TournamentRules from '../views/TournamentRules'

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
                    <p>{content.txtBanner}</p>
                    <h4 className="tour-title tour-date">{content.tourDate}</h4>
                    <Button
                      bsClass="btn custom-btn custom-btn-xl center-block"
                      onClick={() => this.props.dispatch(popupsActions.showRegistration())}
                    >
                      {content.btnRegisterEarly}
                    </Button>
                    <div id="tour-what"><a href="/#what-is-lia" target="_blank" rel="noopener noreferrer">{content.lnkWhat}</a></div>
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

export default connect()(TournamentPage);
