const form = require('express-form2');


const postForm = form(
    form.field( 'title' ).trim().required(),
    form.field( 'text' ).trim().required(),
    form.field( 'tags' ).trim().required().toArray(),
    form.field( 'published' ).trim().required()
);

export const postEditForm = postForm;


const tokenForm = form(
    form.field( 'token' ).required().trim().minLength(3),
    form.field( 'channel' ).trim().required()
);

export const tokenEditForm = tokenForm;
