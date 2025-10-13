const express = require("express");
const router = express.Router();
const User = require("../models/s.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {
  isLoggedIn,
  isLoggedOut,
  saveRedirectUrl,
} = require("../middleware/log"); // or wherever

// Show signup form
router.get("/signup", (req, res) => {
  res.render("./users/signup.ejs");
});

// Handle signup
router.post(
  "/signup",
  wrapAsync(async (req, res, next) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const reguser = await User.register(newUser, password);
      req.login(reguser, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/sh");
      });
    } catch (e) {
      console.error(e);
      // Render error page on failure
      res.status(400).render("error", { message: e.message });
      // Or use redirect instead:
      // res.redirect("/sh/signup");
    }
  })
);

// Show login form
router.get("/login", (req, res) => {
  res.render("./users/login.ejs");
});

// Handle login
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/sh/login",
    failureFlash: true,
  }),
  wrapAsync(async (req, res) => {
    const redirectUrl = req.session.redirectUrl || "/sh";
    delete req.session.redirectUrl;
    res.redirect(redirectUrl);
  })
);

// Logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy((err) => {
      if (err) return next(err);
      res.redirect("/sh");
    });
  });
});

module.exports = router;
