const form = require('express-form2');


const postForm = form(
    form.field( 'login' ).trim().required().minLength(3),
    form.field( 'password' ).trim().required().minLength(3)
);

export const postEditForm = postForm;


const tokenForm = form(
    form.field( 'token' ).required().trim().minLength(3),
    form.field( 'channel' ).trim().required()
);

export const tokenEditForm = tokenForm;
