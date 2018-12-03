import jwtDecode from 'jwt-decode'
import { actionTypesAuth } from '../constants/actionTypesAuth';
import api from '../api';
import setAuthHeader from '../helpers/setAuthHeader';

export const authActions = {
  login,
  logout,
  authenticate,
  confirmEmail
};

function login(username, password) {
  return async dispatch => {
    dispatch(request( username ));
    try {
      const respLogin = await api.user.login(username, password);
      const decoded = jwtDecode(respLogin.token);
      localStorage.setItem("token", respLogin.token);
      setAuthHeader(respLogin.token);
      dispatch(success( decoded.username ));
    } catch(err) {
      localStorage.removeItem("token");
      setAuthHeader();
      dispatch(failure(err));
    }
  }
  function request(username) { return {type: actionTypesAuth.LOGIN_REQUEST, username} }
  function success(username) { return {type: actionTypesAuth.LOGIN_SUCCESS, username} }
  function failure(error) { return {type: actionTypesAuth.LOGIN_FAILURE, error} }
}

function logout() {
  localStorage.removeItem("token");
  setAuthHeader();
  return { type: actionTypesAuth.LOGOUT };
}

function authenticate(token) {
  const decoded = jwtDecode(token);
  setAuthHeader(token);
  return { type: actionTypesAuth.SET_AUTH, username: decoded.username };
}

function confirmEmail(code) {
  return async dispatch => {
    dispatch(request());
    try {
      const respConfirm = await api.user.confirmEmail(code);
      const decoded = jwtDecode(respConfirm.token);
      localStorage.setItem("token", respConfirm.token);
      setAuthHeader(respConfirm.token);
      dispatch(success( decoded.username ));
    } catch(err) {
      localStorage.removeItem("user");
      setAuthHeader();
      dispatch(failure(err));
    }
  }
  function request() { return {type: actionTypesAuth.CONFIRM_EMAIL_REQUEST} }
  function success(username) { return {type: actionTypesAuth.CONFIRM_EMAIL_SUCCESS, username} }
  function failure(error) { return {type: actionTypesAuth.CONFIRM_EMAIL_FAILURE, error} }
}
