import { actionTypesPopups } from '../constants/actionTypesPopups';

const initialState = { showRegPopup: false };

export function popups(state = initialState, action) {
  switch (action.type) {
  case actionTypesPopups.REGISTRATION_SHOW:
    return {
      showRegPopup: true
    };
  case actionTypesPopups.REGISTRATION_HIDE:
    return {
      showRegPopup: false
    };
  default:
    return state;
  }
}
