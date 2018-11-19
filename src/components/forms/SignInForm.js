import React, {Component} from 'react';
import {FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

class SignInForm extends Component {

  formSubmit = (event) => {
    event.preventDefault();


    this.props.closePopup();
  }

  render(){
    return (
      <form onSubmit={this.formSubmit}>
        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <FormControl type="email" name="username" placeholder="you@example.com" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl type="password" name="password" placeholder="Enter your password" />
        </FormGroup>
        <Button id={this.props.submitButtonId} type="submit" bsClass="hidden"></Button>
      </form>
    );
  }

}

export default SignInForm;
