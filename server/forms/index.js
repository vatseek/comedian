const form = require('express-form2');
import { tokenTypes } from '../models/token';
import _ from 'underscore';


const postForm = form(
    form.field( 'title' ).trim().required(),
    form.field( 'text' ).trim().required(),
    form.field( 'tags' ).trim().required().toArray(),
    form.field( 'published' ).trim().required()
);

export const postEditForm = postForm;


const tokenForm = form(
    form.field( 'token' ).required().trim().minLength(3),
    form.field( 'channel' ).trim().required(),
    form.field( 'bot' ).trim().required(),
    form.field( 'type' ).trim().required().custom(function(value) {
        if (!_.contains(tokenTypes.values, value)) {
            throw new Error( '%s invalid type' );
        }
    })
);

export const tokenEditForm = tokenForm;
