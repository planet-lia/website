import { actionTypesAuth } from '../constants/actionTypesAuth';

let user = localStorage.getItem("user");
const initialState = user ? { loggedIn: true, username: user.username } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
  case actionTypesAuth.LOGIN_REQUEST:
    return {
      isLoggingIn: true,
      username: action.username
    };
  case actionTypesAuth.LOGIN_SUCCESS:
    return {
      isAuthenticated: true,
      username: action.username,
      userId: action.userId
    };
  case actionTypesAuth.LOGIN_FAILURE:
    return {
      error: action.error
    };
  case actionTypesAuth.LOGOUT:
    return {};
  case actionTypesAuth.SET_AUTH:
    return {
      isAuthenticated: true,
      username: action.username,
      userId: action.userId
    };
  case actionTypesAuth.CONFIRM_EMAIL_REQUEST:
    return {
      isVerifing: true,
    };
  case actionTypesAuth.CONFIRM_EMAIL_SUCCESS:
    return {
      isAuthenticated: true,
      username: action.username,
      userId: action.userId
    };
  case actionTypesAuth.CONFIRM_EMAIL_FAILURE:
    return {
      error: action.error
    };
  default:
    return state;
  }
}
