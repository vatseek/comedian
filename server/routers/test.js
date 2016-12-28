const express = require('express');
const router = express.Router();
import User from '../models/user'
import { HttpError } from '../errors';


router.get('/test', function(req, res, next) {
    User.authorize('user', 'qwerty').then(result => {
        return res.send({route: result});
    }).catch(err => {
        next(err);
    });

    // User.addUser({
    //     login: 'userq',
    //     email: 'userq@ra.ru',
    //     password: 'qwerty'
    // }).then(result => {
    //     console.log(result);
    // }, error => {
    //     console.log(error);
    // });

    // const user = new User({
    //     login: 'user',
    //     email: 'user@ra.ru',
    //     password: 'qwerty'
    // });

    // user.save().then(result => {
    //     console.log(result);
    // }, err => {
    //     console.log(err);
    // });
});

module.exports = router;