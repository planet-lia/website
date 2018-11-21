import React, {Component} from 'react';
import {Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

import Select from '../elems/Select';
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

      countriesList: [],

      error: null,
      errorUn: null
    }
  }

  componentDidMount = () => {
    this.loadCodes();
  }

  loadCodes = async () => {
    try {
      const respCountries = await api.codes.getCountries();
      this.setCountriesList(respCountries.countries)
    } catch(err) {
      this.setState({error: "Network Error"});
      console.log(err.message);
    }
  }

  setCountriesList = (respCountries) => {
    const countries = respCountries.map(
      (country) => (
        {value: country.alpha2Code, label: country.name}
      )
    );
    this.setState({countriesList: countries});
  }

  formSubmit = async (event) => {
    event.preventDefault();

    const isValid = this.validateForm();

    if(isValid) {
      try {
        await api.user.register(
            this.state.username,
            this.state.email,
            this.state.firstName,
            this.state.lastName,
            this.state.password,
            this.state.country
          );
          this.props.closePopup();
          this.setState({
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            repeat: "",
            country: "",
            error: null,
            errorUn: null
          })
      } catch(err) {
        if(err.response){
          this.setState({error: "Cannot register; server (REG) error"});
          //set up errors for each field
        } else {
          this.setState({error: "Network Error"});
        }
      }

    } else {
      this.setState({error: "FrontEnd Error: validation failed"});
    }
  }

  validateForm = () => {
    let regUsername = /^[a-zA-Z0-9_-]+$/;
    let regEmail = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

    if( !this.validateLength(this.state.username, 32, 3) ) return false;
    if( !this.validateLength(this.state.email, 200) ) return false;
    if( !this.validateLength(this.state.firstName, 30) ) return false;
    if( !this.validateLength(this.state.lastName, 50) ) return false;
    if( !this.validateLength(this.state.password, 64, 6) ) return false;

    if( !regUsername.test(String(this.state.username)) ) return false;
    if( !regEmail.test(String(this.state.email).toUpperCase()) ) return false;
    if( this.state.password !== this.state.repeat ) return false;

    if( !this.usernameAvalible ) return false;

    return true;
  }

  validateLength = (string, maxLen, minLen=1) => {
    if(string.length < minLen || string.length > maxLen){
      return false;
    }
    return true;
  }

  usernameAvalible = async () => {
    try {
      const resp = await api.user.usernameAvalible(this.state.username);
      if(resp.available===true){
        this.setState({errorUn: null});
        return true;
      } else if(resp.available===false){
        this.setState({errorUn: "Username already in use"});
        return false;
      }
    } catch(err) {
      this.setState({error: "Network Error"});
      console.log(err.message);
    }
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render(){
    return (
      <form onSubmit={this.formSubmit} noValidate>
        <Row>
          <Col componentClass={FormGroup} md={6}>
            <ControlLabel>Name</ControlLabel>
            <FormControl
              type="text"
              name="firstName"
              placeholder="Name"
              value={this.state.firstName}
              onChange={this.onChange}
            />
          </Col>
          <Col componentClass={FormGroup} md={6}>
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              type="text"
              name="lastName"
              placeholder="Last name"
              value={this.state.lastName}
              onChange={this.onChange}
            />
          </Col>
        </Row>
        <Row>
          <Col componentClass={FormGroup} md={12}>
            <ControlLabel>Email</ControlLabel>
            <FormControl
            type="email"
            name="email"
            placeholder="you@example.com"
            value={this.state.email}
            onChange={this.onChange}
          />
          </Col>
        </Row>
        <Row>
          <Col componentClass={FormGroup} md={6}>
            <div className="form-group">
              <ControlLabel>Username</ControlLabel>
              <FormControl
                type="text"
                name="username"
                placeholder="Pick a username"
                value={this.state.username}
                onChange={this.onChange}
                onBlur={this.usernameAvalible}
              />
            </div>
            <div className="form-group">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                name="password"
                placeholder="Create a password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <ControlLabel>Repeat Password</ControlLabel>
              <FormControl
                type="password"
                name="repeat"
                placeholder="Repeat password"
                value={this.state.repeat}
                onChange={this.onChange}
              />
            </div>
          </Col>
          <Col componentClass={FormGroup} md={6}>
            <div className="form-group">
              <ControlLabel>Country</ControlLabel>
              <Select
                options={this.state.countriesList}
                placeholder="Your country"
                name="country"
                value={this.state.country}
                onChange={this.onChange}
              />
            </div>
          </Col>
        </Row>
        <Button id={this.props.submitButtonId} type="submit" bsClass="hidden"></Button>
        <span className="text-danger">{this.state.error}</span>
        <span className="text-danger">{this.state.errorUn}</span>
      </form>
    );
  }

}

export default SignUpForm;
