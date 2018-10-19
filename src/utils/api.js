import axios from 'axios';

const API_BASE_URL = "http://mp12.maas.garaza.io:8000";

export default {
  user: {
    register: (username, email, firstName, lastName, password) =>
      axios.post(API_BASE_URL + "/user/register/", {
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password
      })
      .then((response) => console.log(response)),
  }
}
