const express = require('express');
const router = express.Router();
import Token from '../models/token'
import { ValidationError, HttpError } from '../errors';
import { checkAuth } from '../middlewares';
import { tokenEditForm } from '../forms';

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

router.patch('/token/:id', checkAuth, tokenEditForm, function(req, res, next) {
    if ( !req.form.isValid ) {
        return next(new ValidationError(400, req.form.getErrors()), 'json');
    }
    Token.findOne({_id: req.params.id}).then(token => {
        if (!token || !token.canEdit(req.session.user)) {
            return next(new HttpError(400, {'error': 'Access denied'}))
        }
        Object.assign(token, req.form);
        token.save().then(result => {
            return res.send({token: result});
        }).catch(err => next(err));
    }).catch(err => next(err));
});

router.get('/token/:id', checkAuth, function(req, res, next) {
    Token.findOne({_id: req.params.id}).then(token => {
        if (!token || !token.canEdit(req.session.user)) {
            return next(new HttpError(400, {'error': 'Access denied'}))
        }
        return res.send({token: token});
    }).catch(err => next(err));
});

router.delete('/token/:id', function(req, res, next) {
    Token.findOne({_id: req.params.id}).remove().exec();
    res.send({success: true});
});

module.exports = router;