const form = require('express-form2');

module.exports = form(
    form.field( 'login' ).trim().required().isArray(),
    form.field( 'password' ).trim().required().min(3)
);