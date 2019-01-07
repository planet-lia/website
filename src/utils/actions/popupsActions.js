import { actionTypesPopups } from '../constants/actionTypesPopups';

export const popupsActions = {
  showRegistration,
  showEarlyRegistration,
  hideRegistration
};

function showRegistration() {
  return { type: actionTypesPopups.REGISTRATION_SHOW};
}
function showEarlyRegistration() {
  return { type: actionTypesPopups.REGISTRATION_EARLY_SHOW};
}

function hideRegistration() {
  return { type: actionTypesPopups.REGISTRATION_HIDE};
}
