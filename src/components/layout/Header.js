import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends Component {
    render(){
      return (
        <div id="main-header">
          <div className="container">
            <Navbar fluid id="custom-navbar">
              <Navbar.Header>
                <Navbar.Brand>
                  LIA
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <ul className="nav navbar-nav">
                  <li role="presentation">
                    <Link to="/">LeaderBoard</Link>
                  </li>
                  <li role="presentation">
                    <Link to="/games">Games</Link>
                  </li>
                  <li role="presentation">
                    <Link to="/how-to">How To</Link>
                  </li>
                </ul>
                {this.props.isSignedIn ? (
                  <Nav pullRight>
                    <NavItem onClick={() => this.props.onNavSignClick(0)}>
                      Sign Out
                    </NavItem>
                  </Nav>
                ) : (
                  <Nav pullRight>
                    <NavItem onClick={() => this.props.onNavSignClick(2)}>
                      Sign Up
                    </NavItem>
                    <NavItem onClick={() => this.props.onNavSignClick(1)}>
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

export default Header;
