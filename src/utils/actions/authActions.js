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
      return dispatch(success( decoded.data.username, decoded.data.userId ));
    } catch(err) {
      localStorage.removeItem("token");
      setAuthHeader();
      return dispatch(failure(err.toString()));
    }
  }
  function request(username) { return {type: actionTypesAuth.LOGIN_REQUEST, username} }
  function success(username, userId) { return {type: actionTypesAuth.LOGIN_SUCCESS, username, userId} }
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
  return { type: actionTypesAuth.SET_AUTH, username: decoded.data.username, userId: decoded.data.userId };
}

function confirmEmail(code) {
  return async dispatch => {
    dispatch(request());
    try {
      const respConfirm = await api.user.confirmEmail(code);
      const decoded = jwtDecode(respConfirm.token);
      localStorage.setItem("token", respConfirm.token);
      setAuthHeader(respConfirm.token);
      return dispatch(success( decoded.data.username, decoded.data.userId ));
    } catch(err) {
      localStorage.removeItem("user");
      setAuthHeader();
      return dispatch(failure(err.toString()));
    }
  }
  function request() { return {type: actionTypesAuth.CONFIRM_EMAIL_REQUEST} }
  function success(username, userId) { return {type: actionTypesAuth.CONFIRM_EMAIL_SUCCESS, username, userId} }
  function failure(error) { return {type: actionTypesAuth.CONFIRM_EMAIL_FAILURE, error} }
}
