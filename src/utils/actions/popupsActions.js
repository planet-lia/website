import { actionTypesPopups } from '../constants/actionTypesPopups';

export const popupsActions = {
  showRegistration,
  hideRegistration
};

function showRegistration() {
  return { type: actionTypesPopups.REGISTRATION_SHOW};
}

function hideRegistration() {
  return { type: actionTypesPopups.REGISTRATION_HIDE};
}
