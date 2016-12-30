const form = require('express-form2');

module.exports = form(
    form.field( 'login' ).trim().required().minLength(3),
    form.field( 'email' ).trim().required().isEmail(),
    form.field( 'password' ).trim().required().minLength(3),
    form.field( 'password_confirm' ).trim().required().equals('field::password')
);