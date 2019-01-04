import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

import { authActions } from '../../utils/actions/authActions'

import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: null,
      activeNav: 0,
    }
  }

  onNavbarToggle = () => {
    if(this.state.isExpanded===true){
      this.setState({ isExpanded: false });
    } else {
      this.setState({ isExpanded: true });
    }
  }

  onSelectNavItem = () => {
    this.setState({ isExpanded: false });
  }

  onSelectNavSignItem = (mode) => {
    this.props.onNavSignClick(mode);
    this.setState({ isExpanded: false });
  }

  logout = async () => {
    await this.props.dispatch(authActions.logout());
  }

  render(){
    return (
      <div id="main-header">
        <div className="container">
          <Navbar id="custom-navbar" fluid expanded={this.state.isExpanded} onToggle={this.onNavbarToggle}>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/"><img id="logo" src="/logo_close256.png" alt="logo"/></Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <ul className="nav navbar-nav">
                <li role="presentation" onClick={this.onSelectNavItem}>
                  <NavLink to="/tournament" exact activeClassName="nav-link-active">Tournament</NavLink>
                </li>
                <li role="presentation" onClick={this.onSelectNavItem}>
                  <NavLink to="/leaderboard" exact activeClassName="nav-link-active">Leaderboard</NavLink>
                </li>
                <li role="presentation" onClick={this.onSelectNavItem}>
                  <NavLink to="/games" exact activeClassName="nav-link-active">Games</NavLink>
                </li>
                <li role="presentation" onClick={this.onSelectNavItem}>
                  <NavLink to="/editor" exact activeClassName="nav-link-active">Online Editor</NavLink>
                </li>
                <li role="presentation" onClick={this.onSelectNavItem}>
                  <a href="https://docs.liagame.com/" target="_blank" rel="noopener noreferrer">Docs</a>
                </li>
              </ul>
              {this.props.isAuthenticated ? (
                <Nav pullRight>
                  <NavItem onClick={this.logout}>
                    Sign Out
                  </NavItem>
                </Nav>
              ) : (
                <Nav pullRight>
                  <NavItem onClick={() => this.onSelectNavSignItem(2)}>
                    Sign Up
                  </NavItem>
                  <NavItem onClick={() => this.onSelectNavSignItem(1)}>
                    Sign In
                  </NavItem>
                </Nav>
              )}
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  const { isAuthenticated, username } = state.authentication;
  return {
      isAuthenticated,
      username
  };
}

export default connect(mapStateToProps)(Header);
