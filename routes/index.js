var express = require('express');
var router = express.Router();
var isAuthenticated = require('../middleware/isAuthenticated');

var news = require('../controllers/news/HackerNewsController');

// restrict index for logged in user only
router.get('/list', isAuthenticated, news.listContainer);

module.exports = router;
