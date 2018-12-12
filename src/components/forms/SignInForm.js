import React, {Component} from 'react';
import {FormGroup, FormControl, ControlLabel, Button, HelpBlock} from 'react-bootstrap';
import isEmpty from 'lodash/isEmpty';

import { validators } from '../../utils/helpers/validators';

import { connect } from 'react-redux';
import { authActions } from '../../utils/actions/authActions'

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      usernameError: null,
      password: "",
      passwordError: null
    }
  }

  formSubmit = async (event) => {
    event.preventDefault();

    const {username, password} = this.state;
    const {dispatch} = this.props;

    this.setState({
      usernameError: null,
      passwordError: null
    });

    if(this.validateForm()){
      await dispatch(authActions.login(username, password)).then(() => console.log("dispatch"));
    }
  }

  validateForm = () => {
    const { username, password } = this.state;
    let errors = {};

    if(username){
      if( !validators.username(username) ){
        errors.usernameError = "Invalid username"
      }
    } else {
      errors.usernameError = "Username required"
    }

    if(password){
      if(!validators.passwordLength(password)){
        errors.passwordError = "Invalid password"
      }
    } else {
      errors.passwordError = "Password required"
    }

    this.setState(errors);
    return isEmpty(errors);
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render(){
    const {username, usernameError, password, passwordError, showLogingInerror} = this.state;
    const {isLoggingIn, isAuthenticated, error, closePopup} = this.props;

    if(isAuthenticated){
      closePopup();
    }

    return (
      <form onSubmit={this.formSubmit} noValidate>
        <FormGroup validationState={usernameError ? "error" : null}>
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={this.onChange}
          />
          {usernameError && <HelpBlock>{usernameError}</HelpBlock> }
        </FormGroup>
        <FormGroup validationState={passwordError ? "error" : null}>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={this.onChange}
          />
          {passwordError && <HelpBlock>{passwordError}</HelpBlock>}
        </FormGroup>
        <Button id={this.props.submitButtonId} type="submit" bsClass="hidden"></Button>
        {(isLoggingIn!==true && usernameError===null && passwordError===null && error)
          ? (<FormGroup validationState="error">
              <HelpBlock>{error.toString()}</HelpBlock>
            </FormGroup>)
          : null
        }
      </form>
    );
  }

}

function mapStateToProps(state) {
    const { isLoggingIn, isAuthenticated, error } = state.authentication;
    return {
        isLoggingIn,
        isAuthenticated,
        error
    };
}

export default connect(mapStateToProps)(SignInForm);
