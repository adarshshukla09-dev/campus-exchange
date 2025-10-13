module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    return res.redirect("/sh/login");
  }
  next();
};

module.exports.isLoggedOut = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  res.redirect("/sh"); // or wherever logged-in users should go
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};
