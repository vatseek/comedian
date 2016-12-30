const express = require('express');
const router = express.Router();
import Token from '../models/token'
import { ValidationError, HttpError } from '../errors';
import { checkAuth } from '../middlewares';
import { tokenEditForm } from '../forms';

const ownerHelper = function (req, res, next) {
    if (!req.params.id || !req.session.user) {
        next(new HttpError(406, 'Bad request'));
    }
};

router.get('/token/list', checkAuth, function(req, res, next) {
    const userId = req.session.user._id;
    Token.find({user: userId}).then(tokens => {
        res.send({tokens: tokens});
    }).catch(err => next(err));
});

router.post('/token/add', tokenEditForm, function(req, res, next) {
    if ( !req.form.isValid ) {
        return next(new ValidationError(400, req.form.getErrors()), 'json');
    }

    Token.getByCode(req.form.token).then(tokenData => {
        if (tokenData) {
            return next(new HttpError(400, {'error': 'Already exists'}));
        }
        const token = new Token({
            ...req.form,
            user: req.session.user
        });

        token.save().then(token => {
            res.send({token: token});
        }).catch(err => next(err));
    }).catch(err => next(err));
});

router.get('/token/:id', ownerHelper, function(req, res, next) {
    res.send({test: req.params.id});
});

router.patch('/token/:id', function(req, res, next) {
    res.send({test: req.params.id});
});

router.delete('/token/:id', function(req, res, next) {
    res.send({test: req.params.id});
});

module.exports = router;