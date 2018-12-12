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
      responseError: null
    }
  }

  formSubmit = async (event) => {
    event.preventDefault();

    const {username, password} = this.state;
    const {dispatch, closePopup} = this.props;

    this.setState({
      usernameError: null,
      passwordError: null,
      responseError: null
    });

    if(this.validateForm()){
      const respLogin = await dispatch(authActions.login(username, password));
      if(respLogin.username){
        closePopup();
        this.setState({
          username: "",
          usernameError: null,
          password: "",
          passwordError: null,
          responseError: null
        });

      } else if(respLogin.error){
        this.setState({responseError: respLogin.error});
        console.log(respLogin.error);
      } else {
        this.setState({responseError: "Error"});
      }

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
    const {username, usernameError, password, passwordError, responseError} = this.state;

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
        {responseError
          ? (<FormGroup validationState="error">
              <HelpBlock>{responseError}</HelpBlock>
            </FormGroup>)
          : null
        }
      </form>
    );
  }

}

function mapStateToProps(state) {
    const { isLoggingIn } = state.authentication;
    return {
        isLoggingIn
    };
}

export default connect(mapStateToProps)(SignInForm);
