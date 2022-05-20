const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 8080;

app.use(cookieParser());
app.set("view engine", "ejs");

const bodyParser = require("body-parser");
const { response } = require("express");
const res = require("express/lib/response");
app.use(bodyParser.urlencoded({ extended: true }));


//---- FUNCTIONS AND DATABASES

const urlDatabase = {
  b2xVn2: {
    longURL: "http://www.lighthouselabs.ca",
    userID: "userRandomID"
  },
  9sm5xK: {
    longURL: "https://www.google.ca",
    userID: "userRandomID"
  }
};

const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};
const getUserByLogin = function(email, users, password) {
  for (let lookFor in users) {
    // console.log(users[lookFor])
    if (users[lookFor].email === email) {
      // console.log(users[lookFor].email);
      if (users[lookFor].password === password) {
      return users[lookFor];
      }

    }
  }
};

// SERVER ------
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
// -----------
// ROUTES TO GET
app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls", (req, res) => {
  console.log(req)
  const userID = req.cookies["user_id"];
  const user = users[userID];
  const templateVars = {
    urls: urlDatabase,
    userID,
    user
  };
  res.render('urls_index', templateVars);

  // if (req.userID) {
  // } else {
  //   res.status(400);
  // }
});


app.get("/urls/new", (req, res) => {
  const userID = req.cookies["user_id"];
  const user = users[userID];
  const templateVars = {
    urls: urlDatabase,
    email: req.cookies["email"],
    user: user
  }
  if (!req.cookies["user_id"]) {
    res.redirect(401,'/login');
  } else {
    res.render('urls_new', templateVars);
  }
});

app.get("/register", (req, res) => {
  const userID = req.cookies["user_id"];
  const user = users[userID];
  const templateVars = {
    urls: urlDatabase,
    user: user
  };
  
  res.render("urls_register", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  const userID = req.cookies["user_id"];
  const user = users[userID];
  let longURL = urlDatabase[req.params.shortURL].longURL;
  console.log(longURL);
  console.log(urlDatabase[req.params.shortURL]);
  const templateVars = {
    shortURL: req.params.shortURL, longURL: longURL,
    urls: urlDatabase, user: user
  };
  res.render("urls_show", templateVars);
});
app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});
app.get('/login', (req, res) => {
  const userID = req.cookies["user_id"];
  const user = users[userID];
  const templateVars = {
    urls: urlDatabase,
    user: user
  };
  res.render("urls_login", templateVars);
});
app.get('/urls/:userID', (req, res) => {
  let templateVars = {
    shortURL: req.params.userID,
    fullURL: urlDatabase[req.params.id].longURL,
    user_id: req.params.id,
    users: users
  };
  if (urlDatabase[req.params.userID].userID === req.params.userID) {
    res.render('urls_show', templateVars);
  } else {
    res.status(400);
  }
})
app.get('/logout', (req, res) => {
  res.clearCookie("user_id");
  res.redirect(`/urls`);
});

// ROUTES TO POST ------

app.post("/urls", (req, res) => {
  if (!user) {
    res.redirect('/login')
  }

})
app.post("/urls/new", (req, res) => {
  console.log(req.body);  // Log the POST request body to the console
  const shortURL = generateRandomString();
  const longURL = req.body.longURL;
  urlDatabase[shortURL] = {
    longURL,
    userID: req.cookie('user_id')
  };
  res.redirect(`http://localhost:8080/urls/${shortURL}`);
});

app.post('/urls/:shortURL/delete', (req, res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect('/urls');
});

app.post('/urls/:shortURL', (req, res) => {
  const shortLinkURL = req.params.shortURL;
  res.redirect(`/urls/${shortLinkURL}`);
});

app.post('/login', (req, res) => {
  const user = getUserByLogin(req.body.email, users, req.body.password);
  console.log(user)
  if (user === undefined) {
    res.status(403)
    res.send('User not found');
  } else {
    res.cookie('user_id', user.id);
    res.redirect(`/urls`);
  }
});

app.post('/logout', (req, res) => {
  res.clearCookie("user_id");
  res.redirect(`/urls`);
});
app.post('/register', (req, res) => {
  if (req.body.email === '' || req.body.password === '') {
    res.status(400);
    res.send('Empty email/password field!');
  }
  for (userEmails in users) {
    if (users[userEmails].email === req.body.email) {
      res.status(400);
      res.send('Email already in use!');
    } else {
      const newUserID = generateRandomString();
      users[`${newUserID}`] = {
        "id": `${newUserID}`,
        "email": `${req.body.email}`,
        "password": `${req.body.password}`
      };
      res.cookie('user_id', newUserID);
      break
    }
  }
console.log(users)
  res.redirect(`/urls`);
});

function generateRandomString() {
  let string = '';
  let alphaNumerical = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 6; i++) {
    string += alphaNumerical.charAt(Math.floor(Math.random() *
      alphaNumerical.length));
  }
  return string;
}