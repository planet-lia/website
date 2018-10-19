import React, {Component} from 'react';
import {Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

class SignUpForm extends Component {

  formSubmit = (event) => {
    event.preventDefault();


    this.props.closePopup();
  }

  render(){
    return (
      <form onSubmit={this.formSubmit}>
        <Row>
          <Col componentClass={FormGroup} md={6}>
            <ControlLabel>Name</ControlLabel>
            <FormControl type="text" placeholder="Name" />
          </Col>
          <Col componentClass={FormGroup} md={6}>
            <ControlLabel>Last Name</ControlLabel>
            <FormControl type="text" placeholder="Last name" />
          </Col>
        </Row>
        <Row>
          <Col componentClass={FormGroup} md={12}>
            <ControlLabel>Email</ControlLabel>
            <FormControl type="email" placeholder="you@example.com" />
          </Col>
        </Row>
        <Row>
          <Col componentClass={FormGroup} md={6}>
            <div className="form-group">
              <ControlLabel>Username</ControlLabel>
              <FormControl type="text" placeholder="Pick a username" />
            </div>
            <div className="form-group">
              <ControlLabel>Password</ControlLabel>
              <FormControl type="password" placeholder="Create a password" />
            </div>
            <div className="form-group">
              <ControlLabel>Repeat Password</ControlLabel>
              <FormControl type="password" placeholder="Repeat password" />
            </div>
          </Col>
          <Col componentClass={FormGroup} md={6}>
            <div className="form-group">
              <ControlLabel>Country</ControlLabel>
              <FormControl type="text" placeholder="Your country" />
            </div>
            <div className="form-group">
              <ControlLabel>Organization</ControlLabel>
              <FormControl type="text" placeholder="Your organization" />
            </div>
          </Col>
        </Row>
        <Button id={this.props.submitButtonId} type="submit" bsClass="hidden"></Button>
      </form>
    );
  }

}

export default SignUpForm;
