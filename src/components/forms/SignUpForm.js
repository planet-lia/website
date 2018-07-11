import React, {Component} from 'react';
import {Row, Col, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

class SignUpForm extends Component {

  render(){
    return (
      <form>
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
            <ControlLabel>Username</ControlLabel>
            <FormControl type="text" placeholder="Pick a username" />
          </Col>
          <Col componentClass={FormGroup} md={6}>
            <ControlLabel>Country</ControlLabel>
            <FormControl type="text" placeholder="Your country" />
          </Col>
        </Row>
        <Row>
          <Col componentClass={FormGroup} md={6}>
            <ControlLabel>Password</ControlLabel>
            <FormControl type="password" placeholder="Create a password" />
          </Col>
          <Col componentClass={FormGroup} md={6}>
            <ControlLabel>Organization</ControlLabel>
            <FormControl type="text" placeholder="Your organization" />
          </Col>
        </Row>
        <Row>
          <Col componentClass={FormGroup} md={6}>
            <ControlLabel>Repeat Password</ControlLabel>
            <FormControl type="password" placeholder="Repeat password" />
          </Col>
        </Row>
      </form>
    );
  }

}

export default SignUpForm;
