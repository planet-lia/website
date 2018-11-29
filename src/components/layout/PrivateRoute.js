import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    this.props.authenticated
      ? <Component {...props} />
      : <Redirect to="/" />
  )} />
)

function mapStateToProps(state) {
    const { authenticated } = state.authentication;
    return { authenticated };
}

export default connect(mapStateToProps)(PrivateRoute);
