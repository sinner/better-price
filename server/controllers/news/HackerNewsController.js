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

  hackerNewsService.getPostsListFiltered(req.user)
    .then((data) => {
      try{
        let postsList = data;
        jsonResponse.error = false;
        jsonResponse.success = true;
        jsonResponse.message = 'The process was completed successfully!';
        jsonResponse.posts = postsList;
        return res.json(jsonResponse);
      }
      catch (error) {
        jsonResponse.errorDetails = error;
        return res.json(jsonResponse);
      }
    },
    (httpError) => {
      jsonResponse.errorDetails = httpError;
      return res.json(jsonResponse);
    });

};

/**
 * @param req
 * @param res
 */
HackerNewsController.deletePost = function(req, res) {
  let jsonResponse = {
    error: true,
    errorDetails: null,
    success: false,
    message: 'It has occurred an error!',
    posts: []
  };
  hackerNewsService.removePost(req.user, req.body.post)
    .then(function(userDoc){
      console.log(userDoc);
      userDoc.save(function (err, userDocUpdated) {
        if (err) {
          jsonResponse.errorDetails = err;
        }
        else{
          jsonResponse.error = false;
          jsonResponse.success = true;
          jsonResponse.message = 'The deletion process was completed successfully!';
          jsonResponse.postsRemoved = userDocUpdated.postsRemoved;
        }
        return res.json(jsonResponse);
      });
    },
    function(err){
      console.log(err);
      jsonResponse.errorDetails = err;
      return res.json(jsonResponse);
    });
};

module.exports = HackerNewsController;