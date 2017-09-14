const request = require('superagent');
const mongoose = require('mongoose');
const _ = require('lodash');
const User = require('../models/User');

mongoose.Promise = global.Promise;

var HackerNewsService = {};

HackerNewsService.getPostsList = function () {
  return request
    .get('http://hn.algolia.com/api/v1/search_by_date?query=nodejs');
};

HackerNewsService.getPostsListFiltered = function (user) {

  let jsonResponse = {
    error: true,
    errorDetails: null,
    success: false,
    message: 'It has occurred an error!',
    posts: []
  };

  return HackerNewsService.getPostsList()
    .then((httpResponse) => { // Fetching the posts list from the API
        try{
          let postsList = JSON.parse(httpResponse.text);
          jsonResponse.error = false;
          jsonResponse.success = true;
          jsonResponse.message = 'The process was completed successfully!';
          jsonResponse.posts = postsList;
        }
        catch (error) {
          jsonResponse.errorDetails = error;
          return jsonResponse;
        }
        return jsonResponse;
      },
      (httpError) => {
        console.log("API");
        jsonResponse.errorDetails = httpError;
        return jsonResponse;
      })
    .then((jsonResponse) => { // Finding the removed posts list of the user
        var promise = User.findById(user._id).exec();
        return promise.then(function(userDoc){
          let data = {
            postsRemoved: userDoc.postsRemoved,
            postsList: jsonResponse.posts
          };
          return data;
        });
      },
      (httpError) => {
        console.log("DATABASE");
        jsonResponse.errorDetails = httpError;
        return jsonResponse;
      })
    .then((data) => { // Filtering with the user removed posts
        let dataFiltered = data.postsList.hits.filter(function(post){
          for (let i in data.postsRemoved) {
            if(post.objectID===data.postsRemoved[i]){
              return false;
            }
          }
          return true;
        });
        // console.log(dataFiltered);
        return dataFiltered;
      },
      (error) => {
        console.log("FILTERING");
        jsonResponse.errorDetails = error;
        return jsonResponse;
      });
};

/**
 * Register a new Removed Post
 *
 * @param user
 * @param post
 * @returns {Promise.<TResult>}
 */
HackerNewsService.removePost = function (user, post) {
  var promise = User.findById(user._id).exec();
  return promise.then(function(userDoc){
    userDoc.postsRemoved.push(post.objectID);
    userDoc.postsRemoved = _.uniq(userDoc.postsRemoved);
    console.log(userDoc);
    return userDoc;
  });
};

module.exports = HackerNewsService;