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
    Post.findOne({_id: req.params.id}).then(result => {
        if (!result) {
            return next(new HttpError(400, 'Not found'));
        }
        return res.send({post: result});
    }).catch(err => next(err));
});

router.patch('/post/:id', postEditForm, function(req, res, next) {
    if ( !req.form.isValid ) {
        return next(new ValidationError(400, req.form.getErrors()), 'json');
    }

    Post.findOne({_id: req.params.id}).then(post => {
        if (!post || !post.canEdit(req.session.user)) {
            return next(new HttpError(400, 'Not found'));
        }
        if (!User.isAdmin(req.session.user)) {
            delete(req.form.published);
        }
        Object.assign(post, req.form);
        post.save().then((result) => {
            return res.send({post: result});
        }).catch(err => next(err));
    }).catch(err => next(err));
});

router.delete('/post/:id', function (req, res, next) {
    if (!User.isAdmin(req.session.user)) {
        return next(new HttpError(400, {"error": "Access denied"}, 'json'));
    }
    Post.findOneAndRemove({ _id: req.params.id }).then(() => {
        return res.send({success: true});
    }).catch(err => next(err));
});

module.exports = router;