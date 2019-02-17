import axios from 'axios';

const API_BASE_URL = (() => {

  let apis = {
    "dev": "https://dev.cloud1.liagame.com",
    "staging": "https://staging.cloud1.liagame.com",
    "staging2": "https://staging2.cloud1.liagame.com",
    "prod": "https://prod.cloud1.liagame.com",
    "production": "https://production.cloud1.liagame.com",
  };

  let hostname = window.location.hostname;
  let lastSubdomain = hostname.split(".")[0];

  let apiUrlLog = (apiUrl) => {
    console.log("Using Lia API: " + apiUrl);
    return apiUrl;
  };

  switch (lastSubdomain) {
    case "dev":
      return apiUrlLog(apis["staging2"]);
    case "staging":
      return apiUrlLog(apis["staging"]);
    case "staging2":
      return apiUrlLog(apis["staging2"]);
    case "production":
      return apiUrlLog(apis["production"]);
    case "www":
      return apiUrlLog(apis["prod"]);
    case "localhost":
      return apiUrlLog(apis["staging2"]);
    default:
      return apiUrlLog(apis["prod"]);
  }
})();

export default {
  user: {
    confirmEmail: (emailVerificationCode) =>
      axios.post(API_BASE_URL + "/user/confirm-email/", {emailVerificationCode})
        .then((response) => response.data),

    edit: (firstName, lastName, organization, country, level, allowGlobal, allowMarketing, allowTournament) =>
      axios.post(API_BASE_URL + "/user/",
        {
          firstName: firstName,
          lastName: lastName,
          organization: organization,
          countryAlpha2Code: country,
          level: level,
          allowPublicationToGlobalLeaderboard: allowGlobal,
          allowMarketingEmails: allowMarketing,
          allowTournament2019Emails: allowTournament
        }
      ).then((response) => response.data),

    getUserInfo: () =>
      axios.get(API_BASE_URL + "/user/")
        .then((response) => response.data),

    login: (username, password) =>
      axios.post(API_BASE_URL + "/auth/", {username, password})
        .then((response) => response.data),

    register: (username, email, firstName, lastName, password, level, organization, allowGlobal, allowMarketing, allowTournament, country, referral ) =>
      axios.post(API_BASE_URL + "/user/register/",
        {
          username: username,
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
          level: level,
          organization: organization,
          allowPublicationToGlobalLeaderboard: allowGlobal,
          allowMarketingEmails: allowMarketing,
          allowTournament2019Emails: allowTournament,
          countryAlpha2Code: country,
          referral: referral
        }
      ).then((response) => response.data),

    usernameAvalible: (username) =>
      axios.get(API_BASE_URL + "/user/username-available/?username=" + encodeURI(username))
        .then((response) => response.data),

    getUsernameToUserId: (username) =>
      axios.get(API_BASE_URL + "/user/" + username + "/userid/")
        .then((response) => response.data),
  },

  codes: {
    getCountries: () =>
      axios.get(API_BASE_URL + "/country/")
        .then((response) => response.data),
    getLevels: () =>
      axios.get(API_BASE_URL + "/level/")
        .then((response) => response.data),
  },

  game: {
    getLeaderboard: () =>
      axios.get(API_BASE_URL + "/game/leaderboard/")
        .then((response) => response.data),
    getGamesList: (offset = 0) =>
      axios.get(API_BASE_URL + "/game/match/latest/?offset=" + encodeURI(offset))
        .then((response) => response.data),
    getGame: (matchId) =>
      axios.get(API_BASE_URL + "/game/match/" + matchId + "/")
        .then((response) => response.data),
    getUserPublic: (userId) =>
      axios.get(API_BASE_URL + "/game/user/" + userId + "/")
        .then((response) => response.data),
    getUserGames: (userId, offset) =>
      axios.get(API_BASE_URL + "/game/user/" + userId + "/matches/?offset=" + encodeURI(offset))
        .then((response) => response.data),
    getActiveBot: () =>
      axios.get(API_BASE_URL + "/game/bot/active/")
        .then((response) => response.data),
    getLatestBot: () =>
      axios.get(API_BASE_URL + "/game/bot/latest/")
        .then((response) => response.data),
    getBot: (botId) =>
      axios.get(API_BASE_URL + "/game/bot/" + botId + "/")
        .then((response) => response.data),
    getChallengesStats: () =>
      axios.get(API_BASE_URL + "/game/challenges/")
        .then((response) => response.data),
    getUserChallenges: (userId, offset) =>
      axios.get(API_BASE_URL + "/game/user/" + userId + "/challenges/?offset=" + encodeURI(offset))
        .then((response) => response.data),
    challengeUser: (userId) =>
      axios.post(API_BASE_URL + "/game/user/" + userId + "/challenge/")
        .then((response) => response.data),
  },

  other: {
    getOrganizations: () =>
      axios.get(API_BASE_URL + "/organizations/")
        .then((response) => response.data),
  }
}
