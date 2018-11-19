import actionTypeUser from '../constants/actionTypeUser';
import api from '../api';
import setAuthHeader from '../setAuthHeader';

export const userActions = {
  login,
  logout
};

async function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));
    try {
      const respLogin = await api.user.login(username, password);
      localStorage.JWT = respLogin.token;
      setAuthHeader(respLogin.token);
      const respUserInfo = await api.user.getInfo();
    } catch(err) {
      dispatch(failure(err));
      this.logout
    }
  }
}

function logout() {

}
