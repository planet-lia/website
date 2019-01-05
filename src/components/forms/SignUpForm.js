import React, {Component} from 'react';
import {Row, Col, FormGroup, FormControl, ControlLabel, Button, Checkbox} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import Select from '../elems/Select';
import { validators } from '../../utils/helpers/validators';
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
      level: "",
      organization: "",
      country: "",
      allowGlobal: false,
      allowTournament: false,
      allowMarketing: false,

      countriesList: [],
      levelsList: [],

      error: null,
      errorUn: null,

      isLoading: false,
      isSuccess: false
    }
  }

  componentDidMount = () => {
    this.loadCodes();
  }

  loadCodes = async () => {
    try {
      const respCountries = await api.codes.getCountries();
      this.setCountriesList(respCountries.countries);
      const respLevels = await api.codes.getLevels();
      this.setLevelsList(respLevels.levels);
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

  setLevelsList = (respLevels) => {
    const levels = respLevels.map(
      (level) => (
        {value: level[0], label: level[1]}
      )
    );
    this.setState({levelsList: levels});
  }

  formSubmit = async (event) => {
    event.preventDefault();
    this.setState({isLoading: true, error: null});

    if(this.validateForm()) {
      try {
        await api.user.register(
            this.state.username,
            this.state.email,
            this.state.firstName,
            this.state.lastName,
            this.state.password,
            this.state.level,
            this.state.organization,
            this.state.allowGlobal,
            this.state.allowMarketing,
            this.state.allowTournament,
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
            level: "",
            organization: "",
            country: "",
            allowGlobal: false,
            allowTournament: false,
            allowMarketing: false,
            error: null,
            errorUn: null,
            isSuccess: true,
            isLoading: false
          })
      } catch(err) {
        if(err.response){
          const field = err.response.data.errors[0].field;
          const msg = err.response.data.errors[0].msg;
          this.setState({
            error: field + ": " + msg,
            isLoading: false
          });
          //set up errors for each field
        } else {
          this.setState({
            error: "Network Error: ",
            isLoading: false
        });
        }
      }
    }
    this.setState({isLoading: false});
  }

  validateForm = () => {
    const {firstName, lastName, username, email, password, repeat, level} = this.state;

    if( !(firstName && validators.length(firstName, 30)) ) {this.setState({error: "Invalid Name length"}); return false;}
    if( !(lastName && validators.length(lastName, 50)) ) {this.setState({error: "Invalid Last Name length"}); return false;}
    if( !(validators.usernameLength(username)) ) {this.setState({error: "Invalid username length"}); return false;}
    if( !(email && validators.emailLength(email)) ) {this.setState({error: "Invalid email length"}); return false;}
    if( !validators.passwordLength(password) ) {this.setState({error: "Invalid password length"}); return false;}
    if( !validators.usernameRegex(username) ) {this.setState({error: "Invalid username format"}); return false;}
    if( !validators.emailRegex(email) ) {this.setState({error: "Invalid email format"}); return false;}
    if( !validators.passwordWithRepeat(password, repeat) ){this.setState({error: "Passwords don't match"}); return false;}
    if( !(level) ) {this.setState({error: "Level not set"}); return false;}

    if( !this.isUsernameAvalible() ) {this.setState({error: "Username is not available"}); return false;}

    return true;
  }

  isUsernameAvalible = async () => {
    if( !validators.username(this.state.username) ) return false;

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
      return false;
    }
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onCheckboxChange = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  }

  render(){
    if (this.state.isSuccess === true) {
      return <Redirect to="/registration" />
    }

    return (
      <form onSubmit={this.formSubmit} noValidate>
        <Row>
          <Col componentClass={FormGroup} md={6}>
            <ControlLabel>Name</ControlLabel>*
            <FormControl
              type="text"
              name="firstName"
              placeholder="Name"
              value={this.state.firstName}
              onChange={this.onChange}
            />
          </Col>
          <Col componentClass={FormGroup} md={6}>
            <ControlLabel>Last Name</ControlLabel>*
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
            <ControlLabel>Email</ControlLabel>*
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
              <ControlLabel>Username</ControlLabel>*
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
              <ControlLabel>Password</ControlLabel>*
              <FormControl
                type="password"
                name="password"
                placeholder="Create a password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <ControlLabel>Repeat Password</ControlLabel>*
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
              <ControlLabel>Level</ControlLabel>*
              <Select
                options={this.state.levelsList}
                placeholder="Your level"
                name="level"
                value={this.state.level}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <ControlLabel>Organization</ControlLabel>
              <FormControl
                type="text"
                name="organization"
                placeholder="Organization"
                value={this.state.organization}
                onChange={this.onChange}
              />
            </div>
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
        <Row>
          <Col componentClass={FormGroup} md={12}>
            <Checkbox
              name="allowGlobal"
              checked={this.state.allowGlobal}
              onChange={this.onCheckboxChange}
            >
              I want you to add my account to the global leaderboard after the tournament
            </Checkbox>
            <Checkbox
              name="allowTournament"
              checked={this.state.allowTournament}
              onChange={this.onCheckboxChange}
            >
              I want to receive emails about Lia Tournament 2019
            </Checkbox>
            <Checkbox
              name="allowMarketing"
              checked={this.state.allowMarketing}
              onChange={this.onCheckboxChange}
            >
              I want to receive general Lia emails (Newsletter, etc.)
            </Checkbox>
          </Col>
        </Row>
        <Button id={this.props.submitButtonId} type="submit" bsClass="hidden" disabled={this.state.isLoading}></Button>
        <span className="text-danger">{this.state.error}</span>
        <span className="text-danger">{this.state.errorUn}</span>
      </form>
    );
  }

}

export default SignUpForm;
