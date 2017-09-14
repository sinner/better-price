const request = require('superagent');

var HackerNewsService = {};

HackerNewsService.getPostsList = function () {
  return request
    .get('http://hn.algolia.com/api/v1/search_by_date?query=nodejs');
};

module.exports = HackerNewsService;