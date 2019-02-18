import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Routes from './components/layout/Routes';
import withTracker from './components/tracking/withTracker';
import GlobalPopups from './components/layout/GlobalPopups'

import {connect} from "react-redux";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookSquare, faGithub, faYoutube, faReddit } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faTrophy, faDesktop, faPlay, faUser, faTv, faMedal, faRobot, faChessRook, faBullhorn  } from '@fortawesome/free-solid-svg-icons';
library.add(faFacebookSquare, faGithub, faYoutube, faEnvelope, faTrophy,
  faTv, faRobot, faMedal, faDesktop, faPlay, faUser, faChessRook, faReddit, faChessRook, faBullhorn);


class App extends Component {
  constructor(props){
		super(props);
    this.state = {};
  }

  render() {
    const isEditor = (window.location.pathname.split("/")[1]==="editor");
    return (
      <div id="main-container">
        <div id="top"></div>
        <Header foo={() => false}/>
        <div className={isEditor ? "main-content no-footer" : "main-content"}>
          <Route component={withTracker(Routes, { /* additional attributes */ })}/>
        </div>
        <GlobalPopups />
        { !isEditor ? (<Footer />) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isAuthenticated } = state.authentication;
  return {
    isAuthenticated
  };
}

export default withRouter(connect(mapStateToProps)(App));
