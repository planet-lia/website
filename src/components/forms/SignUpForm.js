import React, {Component} from 'react';
import {Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

import api from '../../utils/api';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      repeat: "",
      country: "",
      skill: "",
      organization: "",

      error: null,
    }
  }

  formSubmit = async (event) => {
    event.preventDefault();

    const isValid = this.validateForm();

    if(isValid){
      let resp;
      try {
        resp = await api.user.register(
          this.state.username,
          this.state.email,
          this.state.firstName,
          this.state.lastName,
          this.state.password);
      }
      catch(err) {
        this.setState({error: "NetworkError"});
      }

      if(resp) {
        if(resp.success===true){
          this.props.closePopup();
        } else if(resp.success===false){
          this.setState({error: "No. server errors: " + resp.errors.length});
        } else {
          this.setState({error: "Error: " + resp.success});
        }
      }

    } else {
      this.setState({error: "FrontEnd Error: validation failed"});
    }
  }

  validateForm = () => {
    if( !this.validateLength(this.state.username, 32, 3) ) return false;
    if( !this.validateLength(this.state.email, 200) ) return false;
    if( !this.validateLength(this.state.firstName, 30) ) return false;
    if( !this.validateLength(this.state.lastName, 50) ) return false;
    if( !this.validateLength(this.state.password, 64, 6) ) return false;

    // check if username already in use
    let reEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/;
    if( !reEmail.test(String(this.state.email).toUpperCase()) ) return false;
    if( this.state.password !== this.state.repeat ) return false;

    return true;
  }

  validateLength = (string, maxLen, minLen=1) => {
    if(string.length < minLen || string.length > maxLen){
      return false;
    }
    return true;
  }

  render(){
    return (
      <form onSubmit={this.formSubmit} noValidate>
        <Row>
          <Col componentClass={FormGroup} md={6}>
            <ControlLabel>Name</ControlLabel>
            <FormControl
              type="text"
              placeholder="Name"
              value={this.state.firstName}
              onChange={ (event) => this.setState({firstName: event.target.value}) }
            />
          </Col>
          <Col componentClass={FormGroup} md={6}>
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              type="text"
              placeholder="Last name"
              value={this.state.lastName}
              onChange={ (event) => this.setState({lastName: event.target.value}) }
            />
          </Col>
        </Row>
        <Row>
          <Col componentClass={FormGroup} md={12}>
            <ControlLabel>Email</ControlLabel>
            <FormControl
            type="email"
            placeholder="you@example.com"
            value={this.state.email}
            onChange={ (event) => this.setState({email: event.target.value}) }
          />
          </Col>
        </Row>
        <Row>
          <Col componentClass={FormGroup} md={6}>
            <div className="form-group">
              <ControlLabel>Username</ControlLabel>
              <FormControl
                type="text"
                placeholder="Pick a username"
                value={this.state.username}
                onChange={ (event) => this.setState({username: event.target.value}) }
              />
            </div>
            <div className="form-group">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                placeholder="Create a password"
                value={this.state.password}
                onChange={ (event) => this.setState({password: event.target.value}) }
              />
            </div>
            <div className="form-group">
              <ControlLabel>Repeat Password</ControlLabel>
              <FormControl
                type="password"
                placeholder="Repeat password"
                value={this.state.repeat}
                onChange={ (event) => this.setState({repeat: event.target.value}) }
              />
            </div>
          </Col>
          <Col componentClass={FormGroup} md={6}>
            <div className="form-group">
              <ControlLabel>Country</ControlLabel>
              <FormControl
                type="text"
                placeholder="Your country"
                value={this.state.country}
                onChange={ (event) => this.setState({country: event.target.value}) }
              />
            </div>
            <div className="form-group">
              <ControlLabel>Organization</ControlLabel>
              <FormControl
                type="text"
                placeholder="Your organization"
                value={this.state.organization}
                onChange={ (event) => this.setState({organization: event.target.value}) }
              />
            </div>
          </Col>
        </Row>
        <Button id={this.props.submitButtonId} type="submit" bsClass="hidden"></Button>
        <span className="text-danger">{this.state.error}</span>
      </form>
    );
  }

}

export default SignUpForm;
