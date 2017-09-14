var mongoose = require('mongoose');
var passport = require('passport');
var hackerNewsService = require('../../services/HackerNewsService');

var HackerNewsController = {};

/**
 * @param req
 * @param res
 */
HackerNewsController.listContainer = function(req, res) {
  res.render('news/list-container', { user : req.user });
};

/**
 * @param req
 * @param res
 */
HackerNewsController.getPostsList = function(req, res) {

  let jsonResponse = {
    error: true,
    errorDetails: null,
    success: false,
    message: 'It has occurred an error!',
    posts: []
  };

  hackerNewsService.getPostsList()
    .then((httpResponse) => {
      try{
        let postsList = JSON.parse(httpResponse.text);
        jsonResponse.error = false;
        jsonResponse.success = true;
        jsonResponse.message = 'The process was completed successfully!';
        jsonResponse.posts = postsList;
      }
      catch (error) {
        jsonResponse.errorDetails = error;
        res.json(jsonResponse);
      }

      return jsonResponse;

    },
    (httpError) => {
      jsonResponse.errorDetails = httpError;
      res.json(jsonResponse);
    })
    .then((jsonResponse) => {
      res.json(jsonResponse);
    });

};

module.exports = HackerNewsController;