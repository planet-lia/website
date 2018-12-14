import React, { Component } from 'react';
import queryString from 'query-string';
import { Redirect } from "react-router-dom"

import { authActions } from '../../utils/actions/authActions'

import { connect } from 'react-redux';

class EmailVerificationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckingForCode: true,
      codeExists: false
    }
  }

  componentDidMount = () => {
    const parms = queryString.parse(this.props.location.search)
    if(parms.code){
      this.setState({
        codeExists: true,
        isCheckingForCode: false
      });
      this.confirmEmailFromCode(parms.code);
    } else {
      this.setState({
        codeExists: false,
        isCheckingForCode: false
      });
    }
  }

  confirmEmailFromCode = async (code) => {
    await this.props.dispatch(authActions.confirmEmail(code));
  }

  getMessage = () => {
    const { isCheckingForCode } = this.state;
    const { isVerifing, isAuthenticated, error } = this.props;
    let msg = "";

    if(isVerifing || isCheckingForCode){
      msg = "Verifing...";
    } else {
      if(error){
        msg = "Verification failed, with error: " + error;

      } else if(isAuthenticated){
        msg = "Your email was successfully verified!";
      } else {
        msg = "Something went wrong.";
      }
    }
    return msg;

  }

  render(){
    const { isCheckingForCode, codeExists } = this.state;
    return (
      <div className="container">
        {(codeExists || isCheckingForCode)
          ? (<div className="text-center">{this.getMessage()}</div>)
          : (<Redirect to="/" />)
        }
      </div>
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
