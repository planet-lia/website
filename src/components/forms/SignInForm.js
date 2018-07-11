import React, {Component} from 'react';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

class SignInForm extends Component {

  render(){
    return (
      <form>
        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <FormControl type="email" placeholder="you@example.com" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl type="password" placeholder="Enter your password" />
        </FormGroup>
      </form>
    );
  }

}

export default SignInForm;
