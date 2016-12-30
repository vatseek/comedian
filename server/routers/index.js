const express = require('express');
const router = express.Router();
import { checkAuth } from '../middlewares';


router.get('/', function(req, res) {
    res.render('index', { what: 'best', who: 'me' });
});

router.all('/token/*', checkAuth, require('./token'), function(req, res, next) {
    next();
});

router.all('/post/*', checkAuth, require('./post'), function(req, res, next) {
    next();
});

router.all('/*', require('./user'), function(req, res, next) {
    next();
});

export default router;
