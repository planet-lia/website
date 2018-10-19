import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Routes from './components/layout/Routes';
import PopupSubmit from './components/views/PopupSubmit';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookSquare, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope  } from '@fortawesome/free-solid-svg-icons';
library.add(faFacebookSquare, faGithub, faYoutube, faEnvelope);

class App extends Component {
  constructor(props){
		super(props);
    this.state = {
      showSignInPopup: false,
      showSignUpPopup: false,
      isSignedIn: false,
    };
  }
  onNavSignClick = (signingMode) => {
    if(signingMode===1){
      this.setState({
        showSignInPopup: true,
        showSignUpPopup: false
      });
    } else if(signingMode===2){
      this.setState({
        showSignInPopup: false,
        showSignUpPopup: true
      });
    } else {
      this.setState({isSignedIn: false});
    }
  }

  onSignPopupClose = () => {
    this.setState({
      showSignInPopup: false,
      showSignUpPopup: false
    });
  }

  render() {
    return (
      <div id="main-container">
        <Header isSignedIn={this.state.isSignedIn} onNavSignClick={(signingMode) => this.onNavSignClick(signingMode)}/>
        <div id="main-content">
          <Route component={Routes}/>
        </div>
        <Footer />

        <PopupSubmit
          dialogClassName="custom-popup sign-in"
          show={this.state.showSignInPopup}
          onHide={this.onSignPopupClose}
          heading="Sign In"
          buttonText="Sign In"
          formType="sign-in"
        />
        <PopupSubmit
          dialogClassName="custom-popup sign-up"
          show={this.state.showSignUpPopup}
          onHide={this.onSignPopupClose}
          heading="Sign Up"
          buttonText="Sign Up"
          formType="sign-up"
        />
      </div>
    );
  }
}

export default App;
