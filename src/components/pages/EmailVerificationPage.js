import React, { Component } from 'react';
import queryString from 'query-string';
import { Redirect } from "react-router-dom"
import { Button } from 'react-bootstrap';

import { authActions } from '../../utils/actions/authActions'

import { connect } from 'react-redux';

class EmailVerificationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckingForCode: true,
      codeExists: false,
      buttonPressed: false,
      finished: false,
    }
  }

  runConfirmation = () => {
    this.setState({buttonPressed: true});

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
        isCheckingForCode: false,
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
      msg = "Verifying...";
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
    const { isCheckingForCode, codeExists, buttonPressed, finished } = this.state;

    return (
      <div className="container">
          <div>
            {(!buttonPressed)
              ? <div className="text-center"><br/><h4>Confirm your email</h4>
                <Button onClick={this.runConfirmation}
                        className="btn custom-btn custom-btn-lg">Confirm</Button>
                </div>
              :  (<div className="custom-message text-center"><p>{this.getMessage()}</p></div>)
            }
          </div>
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
