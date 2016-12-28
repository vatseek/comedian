import {ValidationError, HttpError} from '../errors';
const express = require('express');
const router = express.Router();

router.get('/register', function(req, res) {
    res.send({route: 'api/v1/index'});
});

router.post('/login', require('../forms/loginForm'), function(req, res, next) {
    console.log(req.form);
    console.log(req.form.isValid);

    if( !req.form.isValid ){
        return next(new ValidationError(400, 'invalid params', 'json'))
    }
    // TODO: add user

    res.send({result: 'success', data: 'test'});
});

/**
 * Generate users
 * @function /api/v1/users/logout/
 */
router.get('/users/logout', function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            return next(err);
        }
        res.send({result: 'success'});
    });
});


module.exports = router;