const express = require("express");
const app = express();
const PORT = 8080;
const bcrypt = require("bcryptjs");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const { response } = require("express");
const res = require("express/lib/response");

const {
  emailInUse,
  generateRandomString,
  urlsForUser,
  getUserByEmail,
  doesCookieHaveUser,
} = require("./helpers");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["LIGHTHOUSE"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

//---- DATABASES ----
const salt = bcrypt.genSaltSync(10);
const urlDatabase = {
  b2xVn2: {
    longURL: "http://www.lighthouselabs.ca",
    userID: "userRandomID",
  },
  s9m5xK: {
    longURL: "https://www.google.ca",
    userID: "userRandomID",
  },
};
const users = {
  userRandomID: {
    id: "userRandomID",
    email: "user@example.com",
    password: bcrypt.hashSync("123", salt),
  },
  user2RandomID: {
    id: "user2RandomID",
    email: "user2@example.com",
    password: bcrypt.hashSync("dishwasher-funk", salt),
  },
};

// ---- GET ---
app.get("/", (req, res) => {
  if (!doesCookieHaveUser(req.session.user_id, users)) {
    res.redirect("/login");
  } else {
    res.redirect("/urls");
  }
});

app.get("/urls", (req, res) => {
  const userID = req.session.user_id;
  const user = users[userID];
  const urls = urlsForUser(userID, urlDatabase);
  const templateVars = {
    urls,
    user,
  };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  if (!doesCookieHaveUser(req.session.user_id, users)) {
    res.redirect(401, "/login");
  } else {
    const userID = req.session.user_id;
    const user = users[userID];
    const templateVars = {
      user: user,
      urls: urlDatabase,
    };
    res.render("urls_new", templateVars);
  }
});

app.get("/register", (req, res) => {
  if (!doesCookieHaveUser(req.session.user_id, users)) {
    const userID = req.session.user_id;
    const user = users[userID];
    const templateVars = {
      user: user,
    };
    res.render("urls_register", templateVars);
  } else {
    res.redirect("/urls");
  }
});

app.get("/urls/:shortURL", (req, res) => {
  if (urlDatabase[req.params.shortURL]) {
    const shortURL = req.params.shortURL;
    const longURL = urlDatabase[req.params.shortURL].longURL;
    const userID = urlDatabase[req.params.shortURL].userID;
    const user = users[req.session.user_id];
    let templateVars = {
      shortURL,
      longURL,
      userID,
      user,
    };
    res.render("urls_show", templateVars);
  } else {
    res.send("The short URL you entered does not exist.");
  }
});

app.get("/u/:shortURL", (req, res) => {
  if (urlDatabase[req.params.shortURL]) {
    const longURL = urlDatabase[req.params.shortURL].longURL;
    res.redirect(longURL);
  } else {
    res.send("The short URL you entered does not yet exist.");
  }
});

app.get("/login", (req, res) => {
  let user = users[req.session.user_id];
  if (doesCookieHaveUser(req.session.user_id, users)) {
    res.redirect("/urls");
  } else {
    let templateVars = {
      user,
    };
    res.render("urls_login", templateVars);
  }
});

// ---- POST ----

app.post("/urls", (req, res) => {
  if (!req.session.user_id) {
    res.status(401);
  } else {
    let shortURL = generateRandomString();
    let longURL = req.body.longURL;
    urlDatabase[shortURL] = {
      longURL: longURL,
      userID: req.session.user_id,
    };
    res.redirect(`urls/${shortURL}`);
  }
});

app.post("/register", (req, res) => {
  const newEmail = req.body.email;
  const newPassword = req.body.password;
  if (newEmail === "" || newPassword === "") {
    res.status(400);
    res.send("Empty email/password field!");
  } else if (emailInUse(newEmail, users)) {
    res.status(400);
    res.send("Email already in use!");
  } else {
    const newUserID = generateRandomString();
    users[newUserID] = {
      id: newUserID,
      email: newEmail,
      password: bcrypt.hashSync(newPassword, salt),
    };
    req.session.user_id = newUserID;
    res.redirect("/urls");
  }
});

app.post("/urls/new", (req, res) => {
  const shortURL = generateRandomString();
  const longURL = req.body.longURL;
  urlDatabase[shortURL] = {
    longURL,
    userID: req.session.user_id,
  };
  res.redirect(`/urls/${shortURL}`);
});

app.post("/login", (req, res) => {
  let password = req.body.password;
  let userID = getUserByEmail(req.body.email, users);
  let user = users[userID];

  if (!user) {
    res.status(403);
    res.send("Email not found");
  }

  if (!bcrypt.compareSync(password, user.password)) {
    res.status(403);
    res.send("Password does not match!");
  }
  req.session.user_id = user.id;
  res.redirect("/urls");
});

app.post("/urls/:shortURL/delete", (req, res) => {
  let user = users[req.session.user_id];
  if (!user) {
    res.send(
      "You cannot delete a URL that does not belong to you. Please log in"
    );
  }
  const shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];
  res.redirect("/urls");
});

app.post("/urls/:shortURL", (req, res) => {
  const user = users[req.session.user_id];
  if (!user) {
    res.send("This is not your URL to edit. Please login");
  }
  const shortURL = req.params.shortURL;
  const editLongLink = req.body.longURL;
  const userID = req.session.user_id;
  urlDatabase[shortURL] = {
    longURL: editLongLink,
    userID,
  };
  res.redirect("/urls");
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/urls");
});

// SERVER ------
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
