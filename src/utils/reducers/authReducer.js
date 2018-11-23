import { actionTypesAuth } from '../constants/actionTypesAuth';

let user = localStorage.getItem("user");
const initialState = user ? { loggedIn: true, username: user.username } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
    case actionTypesAuth.LOGIN_REQUEST:
        return {
          loggingIn: true,
          username: action.username
        };
    case actionTypesAuth.LOGIN_SUCCESS:
        return {
          success: true,
          username: action.username
        };
    case actionTypesAuth.LOGIN_FAILURE:
        return {
          success: false,
          error: action.error
        };
    case actionTypesAuth.LOGOUT:
        return {};
    default:
        return state
    }
}
