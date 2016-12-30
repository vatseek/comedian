const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');

router.get('/', function(req, res) {
    res.render('index', { what: 'best', who: 'me' });
});

router.all('/token/*', checkAuth.default, require('./token'), function(req, res, next) {
    next();
});

router.all('/post', require('./post'), function(req, res, next) {
    next();
});

router.all('/*', require('./user'), function(req, res, next) {
    next();
});

router.all('/*', require('./test'), function(req, res, next) {
    next();
});

export default router;
