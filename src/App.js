import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Routes from './components/layout/Routes';
import Popup from './components/views/Popup';
import SignInForm from './components/forms/SignInForm';
import SignUpForm from './components/forms/SignUpForm';

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

  onSignIn = () => {
    this.setState({
      showSignInPopup: false,
      showSignUpPopup: false,
      isSignedIn: true
    });
  }

  onSignUp = () => {
    this.setState({
      showSignInPopup: false,
      showSignUpPopup: false
    });
  }

  render() {
    return (
      <div>
        <Header isSignedIn={this.state.isSignedIn} onNavSignClick={(signingMode) => this.onNavSignClick(signingMode)}/>

        <Route component={Routes}/>

        <Popup
          dialogClassName="sign-in"
          show={this.state.showSignInPopup}
          onHide={this.onSignPopupClose}
          onButtonClick={this.onSignIn}
          heading="Sign In"
          buttonText="Sign in"
        >
          <SignInForm />
        </Popup>
        <Popup
          dialogClassName="sign-up"
          show={this.state.showSignUpPopup}
          onHide={this.onSignPopupClose}
          onButtonClick={this.onSignUp}
          heading="Sign Up"
          buttonText="Sign up"
        >
          <SignUpForm />
        </Popup>
      </div>
    );
  }
}

export default App;
