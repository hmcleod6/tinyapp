let emailInUse = function(email, userDatabase) {
  for (let user in userDatabase) {
    if (userDatabase[user].email === email) {
      return true;
    }
  }
  return false;
};

function generateRandomString() {
  let string = '';
  let alphaNumerical = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 6; i++) {
    string += alphaNumerical.charAt(Math.floor(Math.random() *
      alphaNumerical.length));
  }
  return string;
}
function urlsForUser(id, urlDatabase) {
  let usersURLS = {};
  for (let shortURLS in urlDatabase) {
    if (urlDatabase[shortURLS].userID === id) {
      usersURLS[shortURLS] = urlDatabase[shortURLS];
    }
  }
  return usersURLS;
}
const getUserByEmail = function(email, users) {
  for (let userID in users) {
    const user = users[userID];
    if (user.email === email) {
      return user.id;
    }
  }
  return null;
};

const doesCookieHaveUser = function(currentCookie, userDatabase) {
  for (let currentUser in userDatabase) {
    if (currentCookie === currentUser) {
      return true;
    }
  } return false;

};


module.exports = { emailInUse, generateRandomString, urlsForUser, getUserByEmail, doesCookieHaveUser };