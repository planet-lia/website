import React, {Component} from 'react';
import {FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
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
    }
  }

  formSubmit = (event) => {
    event.preventDefault();


    this.props.closePopup();
    this.setState({
      username: "",
      usernameError: null,
      password: "",
      passwordError: null,
    })
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render(){
    return (
      <form onSubmit={this.formSubmit} noValidate>
        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            name="username"
            placeholder="you@example.com"
            value={this.state.username}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            name="password"
            placeholder="Enter your password"
            value={this.state.password}
            onChange={this.onChange}
          />
        </FormGroup>
        <Button id={this.props.submitButtonId} type="submit" bsClass="hidden"></Button>
      </form>
    );
  }

}

export default connect(null, { authActions })(SignInForm);
