// auth page - Setting up
const express = require('express')
const router = express.Router();

// i: Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require ('mongoose');

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require('../models/User.model');

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const {isLoggedOut, isLoggedIn} = require('../middleware/route-guard');

// GET /auth/signup
router.get('/signup', isLoggedOut, (req, res) => {
    res.render('auth/signup');
});

// POST /auth/signup
router.post('/signup', (req, res, next) => {
    console.log('req.body', req.body)
    const { username, email, password} = req.body;
    // check that user, email and password are provided
    if (username === "" || email === "" | password === ""){
        res.status(400).render('auth/signup', {
            errorMessage:
            "All fields are mandatory. Please provide your username, email and password.",
        });
        return;
    }
    if (password.length < 6) {
        res.status(400).render("auth/signup", {
            errorMessage: "Your password needs to be at least 6 characters long.",
        });
        return
    }

bcrypt
.genSalt(saltRounds)
.then((salt) => bcrypt.hash(password, salt))
.then((passwordHash) => {
  // Create a user and save it in the DB
  return User.create({ username, email, passwordHash });
})
.then(() => {
  res.redirect("/auth/login");
})
.catch((error) => {
  if (error instanceof mongoose.Error.ValidationError) {
    res.status(500).render("auth/signup", { errorMessage: error.message });
  } else if (error.code === 11000) {
    res.status(500).render("auth/signup", {
      errorMessage:
        "Username and email need to be unique. Provide a valid username or email.",
    });
  } else {
    next(error);
  }
});
});

// GET /auth/login
router.get("/login", isLoggedOut, (req, res) => {
res.render("auth/login");
});

// POST /auth/login
router.post("/login", isLoggedOut, (req, res, next) => {
const { username, password } = req.body;

// Check that username, email, and password are provided
if (username === "" || password === "") {
res.status(400).render("auth/login", {
  errorMessage:
    "All fields are mandatory. Please provide username, email and password.",
});

return;
}

// Search the database for a user with the email submitted in the form
User.findOne({ username })
.then((user) => {
  // If the user isn't found, send an error message that user provided wrong credentials
  if (!user) {
    res
      .status(400)
      .render("auth/login", { errorMessage: "Wrong credentials." });
    return;
  }

  // If user is found based on the username, check if the in putted password matches the one saved in the database
  bcrypt
    .compare(password, user.passwordHash)
    .then((isSamePassword) => {
      if (!isSamePassword) {
        res
          .status(400)
          .render("auth/login", { errorMessage: "Wrong credentials." });
        return;
      }

      // Add the user object to the session object
      req.session.currentUser = user.toObject();
      // Remove the password field
      delete req.session.currentUser.password;

      res.redirect("/");
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
})
.catch((err) => next(err));
});

// GET /auth/logout
router.post("/logout", isLoggedIn, (req, res) => {
req.session.destroy()
// if (err) {
//   res.status(500).render("auth/login", { errorMessage: err.message });
//   return;
// }

res.redirect("/");

});

module.exports = router;
