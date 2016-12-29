import {ValidationError, HttpError} from '../errors';
import User from '../models/user';
const express = require('express');
const router = express.Router();


router.get('/dashboard', function(req, res, next) {
    res.send({link: 'dashboard'});
});

router.get('/register', require('../forms/registerUserForm'), function(req, res) {
    if( !req.form.isValid ){
        return next(new ValidationError(400, 'invalid params', 'json'))
    }

    // TODO: add new user
});

router.all('/login', require('../forms/loginForm'), function(req, res, next) {
    if (req.session && req.session.user) {
        res.redirect('/dashboard')
    }

    if (req.method === 'POST') {
        if( !req.form.isValid ){
            return next(new ValidationError(400, 'invalid params', 'json'))
        }
        User.authorize(req.form.login, req.form.password).then(user => {
            res.session.user = user;
            res.redirect('/dashboard');
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
        res.send({result: 'success'});
    });
});


module.exports = router;