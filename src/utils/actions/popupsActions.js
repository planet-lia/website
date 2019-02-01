import { actionTypesPopups } from '../constants/actionTypesPopups';

export const popupsActions = {
  showRegistration,
  showEarlyRegistration,
  showSignIn,
  showChallenge,
  hidePopups
};

function showRegistration() {
  return { type: actionTypesPopups.REGISTRATION_SHOW};
}
function showEarlyRegistration() {
  return { type: actionTypesPopups.REGISTRATION_EARLY_SHOW};
}

function showSignIn() {
  return { type: actionTypesPopups.SIGNIN_SHOW};
}

function showChallenge(opponent, opponentId) {
  return { type: actionTypesPopups.CHALLENGE_SHOW, opponent, opponentId};
}

function hidePopups() {
  return { type: actionTypesPopups.POPUPS_HIDE};
}
