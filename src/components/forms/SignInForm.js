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
      passwordError: null,
      error: null
    }
  }

  formSubmit = async (event) => {
    event.preventDefault();

    const {username, password} = this.state;
    const {closePopup, dispatch, loggedIn} = this.props;

    this.setState({
      usernameError: null,
      passwordError: null,
      error: null
    });

    if(this.validateForm()){
      await dispatch(authActions.login(username, password));
      if(this.props.success){
        closePopup();

        this.setState({
          username: "",
          usernameError: null,
          password: "",
          passwordError: null,
          error: null
        });
      } else {
        this.setState({error: "Error"});
        console.log(this.props.error);
      }
    }
  }

  validateForm = () => {
    const { username, password } = this.state;
    let errors = {};

    if(username){
      if(!validators.username(username)){
        errors.usernameError = "Invalid username"
      }
    } else {
      errors.usernameError = "Username required"
    }

    if(password){
      if(!validators.password(password)){
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
    const {username, usernameError, password, passwordError, error} = this.state;
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
        {error && (
          <FormGroup validationState="error">
            <HelpBlock>{error}</HelpBlock>
          </FormGroup>
        )}
      </form>
    );
  }

}

function mapStateToProps(state) {
    const { loggingIn, success, error } = state.authentication;
    return {
        loggingIn,
        success,
        error
    };
}

export default connect(mapStateToProps)(SignInForm);
