import { actionTypesAuth } from '../constants/actionTypesAuth';
import api from '../api';
import setAuthHeader from '../helpers/setAuthHeader';
import jwtDecode from 'jwt-decode'

export const authActions = {
  login,
  logout
};

function login(username, password) {
  return async dispatch => {
    dispatch(request( username ));
    try {
      const respLogin = await api.user.login(username, password);
      const decoded = jwtDecode(respLogin.token);
      localStorage.setItem("user", {username: decoded.username, token: respLogin.token});
      setAuthHeader(respLogin.token);
      dispatch(success( decoded.username ));
    } catch(err) {
      localStorage.removeItem("user");
      setAuthHeader();
      dispatch(failure(err));
    }
  }
  function request(username) { return {type: actionTypesAuth.LOGIN_REQUEST, username} }
  function success(username) { return {type: actionTypesAuth.LOGIN_SUCCESS, username} }
  function failure(error) { return {type: actionTypesAuth.LOGIN_FAILURE, error} }
}

function logout() {
  localStorage.removeItem("user");
  setAuthHeader();
  return { type: actionTypesAuth.LOGOUT }
}
