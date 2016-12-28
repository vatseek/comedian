const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('index', { what: 'best', who: 'me' });
});

router.get('/*', require('./user'), function(req, res, next) {
    next();
});

router.get('/*', require('./test'), function(req, res, next) {
    next();
});

export default router;
