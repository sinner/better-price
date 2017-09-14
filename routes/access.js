var express = require('express');
var router = express.Router();

var auth = require("../controllers/access/AuthenticationController");

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/news/list');
  }
  res.render('index', { title: 'Express' });
});

router.get('/register', auth.register);

router.post('/register', auth.doRegister);

router.get('/login', auth.login);

router.post('/login', auth.doLogin);

router.get('/logout', auth.logout);

module.exports = router;