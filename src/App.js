import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Routes from './components/layout/Routes';
import withTracker from './components/tracking/withTracker';
import PopupSubmit from './components/views/PopupSubmit';

import { connect } from 'react-redux';
import { popupsActions } from './utils/actions/popupsActions'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookSquare, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faTrophy, faDesktop, faPlay, faUser, faTv, faMedal, faRobot } from '@fortawesome/free-solid-svg-icons';
library.add(faFacebookSquare, faGithub, faYoutube, faEnvelope, faTrophy,
  faTv, faRobot, faMedal, faDesktop, faPlay, faUser);


class App extends Component {
  constructor(props){
		super(props);
    this.state = {
      showSignInPopup: false,
    };
  }
  onNavSignClick = (signingMode) => {
    if(signingMode===1){
      this.setState({showSignInPopup: true});
      this.hideSignUpPopup();
    } else {
      this.setState({showSignInPopup: false});
    }
  }

  closePopups = () => {
    this.setState({showSignInPopup: false});
    this.hideSignUpPopup();
  }

  hideSignUpPopup = async () => {
    await this.props.dispatch(popupsActions.hideRegistration())
  }

  render() {
    const isEditor = (window.location.pathname.split("/")[1]==="editor");
    return (
      <div id="main-container">
        <div id="top"></div>
        <Header onNavSignClick={(signingMode) => this.onNavSignClick(signingMode)}/>
        <div className={isEditor ? "main-content no-footer" : "main-content"}>
          <Route component={withTracker(Routes, { /* additional attributes */ })}/>
        </div>
        { !isEditor ? (<Footer />) : null}

        <PopupSubmit
          dialogClassName="custom-popup sign-in"
          show={this.state.showSignInPopup}
          onHide={this.closePopups}
          heading="Sign In"
          buttonText="Sign In"
          formType="sign-in"
        />
        <PopupSubmit
          dialogClassName="custom-popup sign-up"
          show={this.props.showRegPopup}
          onHide={this.closePopups}
          heading="Sign Up"
          buttonText="Sign Up"
          formType="sign-up"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
    const { showRegPopup } = state.popups;
    return {
        showRegPopup
    };
}

export default withRouter(connect(mapStateToProps)(App));
