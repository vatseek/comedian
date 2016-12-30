import {ValidationError, HttpError} from '../errors';
const checkAuth = require('../middlewares/checkAuth');
import User from '../models/user';
const express = require('express');
const router = express.Router();

router.get('/dashboard', checkAuth.default, function(req, res, next) {
    return res.render('dashboard', {});
});

router.get('/register', require('../forms/registerUserForm'), function(req, res, next) {
    if( !req.form.isValid ){
        return next(new ValidationError(400, 'invalid params', 'json'))
    }

    // TODO: add new user
});

router.all('/login', require('../forms/loginForm'), function(req, res, next) {
    if (req.session && req.session.user) {
        return res.return(null, null, '/dashboard', () => {
            return next(new ValidationError(400, 'Already signed in'));
        });
    }

    if (req.method === 'POST') {
        if( !req.form.isValid ){
            return next(new ValidationError(400, 'invalid params'))
        }
        User.authorize(req.form.login, req.form.password).then(user => {
            req.session.user = user;
            return res.return(user, 'login', '/dashboard');
        }).catch(err => {
            next(err);
        })
    } else {
        res.render('login', {});
    }
});

router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});


module.exports = router;