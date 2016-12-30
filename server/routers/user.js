import {ValidationError, HttpError} from '../errors';
import { checkAuth } from '../middlewares';
import User from '../models/user';
const express = require('express');
const router = express.Router();

router.get('/dashboard', checkAuth, function(req, res, next) {
    return res.render('dashboard', {});
});

router.all('/register', require('../forms/registerUserForm'), function(req, res, next) {
    if (req.session && req.session.user) {
        return res.return(null, null, '/dashboard', () => {
            return next(new ValidationError(400, 'Already signed in'));
        });
    }

    if (req.method === 'POST') {
        if( !req.form.isValid ){
            return res.return({form: req.form}, 'register_user');
        }

        User.getUserByEmailOrLogin(req.form.email, req.form.login).then(user => {
            if (user) {
                return res.return({
                    form: req.form,
                    errors: {
                        user: ['User already exists']
                    }
                }, 'register_user');
            }
            User.addUser(req.form).then(user => {
                req.session.user = user;
                return res.return(user, null, '/dashboard');
            }).catch(err => next(err));
        }).catch(err => next(err));
    } else {
        res.return({form: req.form}, 'register_user');
    }
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

router.get('/profile', function (req, res) {
    res.return({}, 'index');
});

module.exports = router;
