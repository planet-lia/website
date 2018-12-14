import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    this.props.isAuthenticated
      ? <Component {...props} />
      : <Redirect to="/" />
  )} />
)

function mapStateToProps(state) {
    const { isAuthenticated } = state.authentication;
    return { isAuthenticated };
}

export default connect(mapStateToProps)(PrivateRoute);
