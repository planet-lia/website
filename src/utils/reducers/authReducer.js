import { actionTypesAuth } from '../constants/actionTypesAuth';

let user = localStorage.getItem("user");
const initialState = user ? { loggedIn: true, user } : {};

export function authReducer(state = initialState, action) {
    switch (action.type) {
    case actionTypesAuth.LOGIN_REQUEST:
        return {
        loggingIn: true,
        user: action.user
        };
    case actionTypesAuth.LOGIN_SUCCESS:
        return {
        loggedIn: true,
        user: action.user
        };
    case actionTypesAuth.LOGIN_FAILURE:
        return {};
    case actionTypesAuth.LOGOUT:
        return {};
    default:
        return state
    }
}
