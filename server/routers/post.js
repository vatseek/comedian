const express = require('express');
const router = express.Router();
import Post from '../models/post';
import User from '../models/user';
import { ValidationError, HttpError } from '../errors';
import { postEditForm } from '../forms';


router.get('/post/list', function(req, res, next) {
    const filters = req.query;
    Post.find(filters).then(result => {
        res.send({posts: result});
    }).catch(err => next(err));
});

router.post('/post/add', postEditForm, function(req, res, next) {
    if ( !req.form.isValid ) {
        return next(new ValidationError(400, req.form.getErrors()), 'json');
    }

    const formData = {...req.form, user: req.session.user};
    if (!User.isAdmin(req.session.user)) {
        delete(formData.published);
    }
    const post = new Post(formData);
    post.save().then( post => {
        res.send({post: post})
    }).catch(err => next(err));
});

router.get('/post/:id', function(req, res, next) {
    res.send({test: 'test'});
});

router.patch('/post/:id', function(req, res, next) {
    res.send({test: 'test'});
});

router.delete('/post/:id', function(req, res, next) {
    res.send({test: 'test'});
});

module.exports = router;