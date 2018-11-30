import React, { Component } from 'react';
import queryString from 'query-string';
import { Redirect } from "react-router-dom"

import { authActions } from '../../utils/actions/authActions'

import { connect } from 'react-redux';

class EmailVerificationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeExists: false,
      isAlreadyAuth: false
    }
  }

  componentDidMount = () => {
    const parms = queryString.parse(this.props.location.search)
    if(this.isAuthenticated){
      this.setState({isAlreadyAuth: true});
    } else {
      if(parms.code){
        this.setState({codeExists: true});
        this.confirmEmailFromCode(parms.code);
      }
    }
  }

  confirmEmailFromCode = async (code) => {
    await this.props.dispatch(authActions.confirmEmail(code));
  }

  getMessage = () => {
    const { isAlreadyAuth } = this.state;
    const { isVerifing, isAuthenticated, error } = this.props;

    if(isAlreadyAuth){
      return "Your email was already verified. You are logged in.";
    }
    if(isVerifing){
      return "Verifing...";
    } else {
      if(isAuthenticated){
        return "Your email was successfully verified!";
      } else {
        return ("Verification failed, with error: " + error);
      }
    }

  }

  render(){
    return (
      this.state.codeExists
        ? (
          <div className="container">
            <div className="text-center">{this.getMessage}</div>
          </div>
        )
        : (<Redirect to="/" />)
    );
  }
}

function mapStateToProps(state) {
  const { isVerifing, isAuthenticated, error } = state.authentication;
  return {
      isVerifing,
      isAuthenticated,
      error
  };
}

export default connect(mapStateToProps)(EmailVerificationPage);
