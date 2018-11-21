import { actionTypesAuth } from '../constants/actionTypesAuth';
import api from '../api';
import setAuthHeader from '../helpers/setAuthHeader';
import jwt_decode from 'jwt-decode'

export const authActions = {
  login,
  logout
};

function login(username, password) {
  return async dispatch => {
    dispatch(request({ username }));
    try {
      const respLogin = await api.user.login(username, password);
      const decoded = jwt_decode(respLogin.token);
      localStorage.setItem("user", {username: decoded.username, token: respLogin.token});
      setAuthHeader(respLogin.token);
      dispatch(success(decoded.username));
    } catch(err) {
      dispatch(failure(err));
      logout();
    }
  }
  function request(user) { return {type: actionTypesAuth.LOGIN_REQUEST, user} }
  function success(user) { return {type: actionTypesAuth.LOGIN_SUCCESS, user} }
  function failure(error) { return {type: actionTypesAuth.LOGIN_FALIURE, error} }
}

function logout() {
  localStorage.removeItem("user");
  setAuthHeader();
  return { type: actionTypesAuth.LOGOUT }
}
