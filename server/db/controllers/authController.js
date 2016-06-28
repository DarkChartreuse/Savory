const passport = require('passport');


const attemptSignIn = (req, res, user) => {
  req.login(user, err => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.json(user);
    }
  });
};

const signIn = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err || !user) {
      res.status(401).send(info);
    } else {
      attemptSignIn(req, res, user);
    }
  })(req, res, next);
};

const logOut = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};


const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('is authenticated?', req.isAuthenticated());
    return next();
  }
  return res.redirect('/signin');
};

module.exports = {
  attemptSignIn,
  signIn,
  logOut,
  isLoggedIn,
};