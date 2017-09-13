var mongoose = require("mongoose");
var passport = require("passport");

var HackerNewsController = {};

// Restrict access to root page
HackerNewsController.listContainer = function(req, res) {
  res.render('news/index', { user : req.user });
};

module.exports = HackerNewsController;