var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../../models/User");

var AuthenticationController = {};

// Go to registration page
AuthenticationController.register = function(req, res) {
  res.render('access/register');
};

// Post registration
AuthenticationController.doRegister = function(req, res) {
  User.register(new User({ username : req.body.username, name: req.body.name }), req.body.password, function(err, user) {
    if (err) {
      return res.render('access/register', { user : user });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/news/list');
    });
  });
};

// Go to login page
AuthenticationController.login = function(req, res) {
  res.render('access/login');
};

// Post login
AuthenticationController.doLogin = function(req, res) {
  passport.authenticate('local')(req, res, function () {
    res.redirect('/');
  });
};

// logout
AuthenticationController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

module.exports = AuthenticationController;