import axios from 'axios';

const API_BASE_URL = "https://staging.cloud1.liagame.com";

export default {
  user: {
    confirmEmail: (emailVerificationCode) =>
      axios.post(API_BASE_URL + "/user/confirm-email/", {emailVerificationCode})
        .then((response) => response.data),

    edit: (firstName, lastName, organization, country, level) =>
      axios.post(API_BASE_URL + "/user/",
        {
          firstName: firstName,
          lastName: lastName,
          organization: organization,
          countryAlpha2Code: country,
          level: level
        }
      ).then((response) => response.data),

    getUserInfo: () =>
      axios.get(API_BASE_URL + "/user/")
        .then((response) => response.data),

    login: (username, password) =>
      axios.post(API_BASE_URL + "/auth/", {username, password})
        .then((response) => response.data),

    register: (username, email, firstName, lastName, password, country) =>
      axios.post(API_BASE_URL + "/user/register/",
        {
          username: username,
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
          level: "university",
          countryAlpha2Code: country
        }
      ).then((response) => response.data),

    usernameAvalible: (username) =>
      axios.get(API_BASE_URL + "/user/username-available/?username=" + encodeURI(username))
        .then((response) => response.data),
  },

  codes: {
    getCountries: () =>
      axios.get(API_BASE_URL + "/country/").then((response) => response.data),
    getLevels: () =>
      axios.get(API_BASE_URL + "/level/").then((response) => response.data)
  },

  game: {
    getLeaderboard: () =>
      axios.get(API_BASE_URL + "/game/leaderboard/").then((response) => response.data),
  },

  other: {
    getOrganizations: () =>
      axios.get(API_BASE_URL + "/suggestion/organization/").then((response) => response.data),
  }
}
