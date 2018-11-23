export const validators = {
  length,
  username,
  email,
  password,
  passwordWithRepeat
};

function length(string, maxLen, minLen=1) {
  if(string.length < minLen || string.length > maxLen){
    return false;
  }
  return true;
}

function username(username) {
  const regUsername = /^[a-zA-Z0-9_-]+$/;
  if(length(username, 32, 3)){
    return regUsername.test(String(username));
  } else {
    return false;
  }
}

function email(email) {
  let regEmail = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
  if(length(email, 200)){
      return regEmail.test(String(email));
  } else {
    return false;
  }

}

function password(password) {
  return length(password, 64, 6);
}

function passwordWithRepeat(password, repeat) {
  if(length(password, 64, 6)) {
    return (password === repeat);
  } else {
    return false;
  }

}
