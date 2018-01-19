var mongoose = require("mongoose");
var passport = require("passport");
var flash = require('connect-flash');
var User = require("../../models/User");

var AuthenticationController = {};

// Go to registration page
AuthenticationController.register = function(req, res) {
  res.render('access/register', {errors: {}});
};

// Post registration
AuthenticationController.doRegister = function(req, res) {
  var passwordErrors = (req.method==='POST')?validatePassword(req.body.password, req.body.confirm):{};
  console.log(passwordErrors);
  if(passwordErrors.error) {
    console.log(passwordErrors);
    return res.render('access/register', { errors: passwordErrors});
  }
  User.register(new User({ username : req.body.username, name: req.body.name, email: req.body.email }), req.body.password, function(err, user) {
    if (err) {
      var errors = err.errors;
      if(passwordErrors.error){
        errors.password = passwordErrors.password;
      }
      console.log(errors);
      return res.render('access/register', { user : user, errors: errors});
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/news/list');
    });
  });
};

// Go to login page
AuthenticationController.login = function(req, res) {
  var flashMessages = req.flash();
  var message = (undefined!==flashMessages && undefined!==flashMessages.error)?flashMessages.error[0]:null;
  res.render('access/login', {message: message});
};

// Post login
AuthenticationController.doLogin = function(req, res) {
  passport.authenticate('local', { failureRedirect: '/login', failureFlash : true })(req, res, function () {
    res.redirect('/news/list');
  });
};

// logout
AuthenticationController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

var validatePassword = function (password, confirm) {
  if(password!==confirm) {
    return {
      error: true,
      password: {message: 'The password and its confirmation field must be equals.'}
    };
  }
  else if ((!password || password.length<6)){
    return {
      error: true,
      password: {message: 'The password should contain at least 6 characters.'}
    };
  }
  return {error: false};
};

module.exports = AuthenticationController;