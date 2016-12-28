const express = require('express');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comedy');

import User from './models/user'
// User.authorize('user', 'qwerty').then(result => {
//     console.log(result);
// }, err => {
//     console.log(err);
// });

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

const app = express();
app.use(cookieParser());

app.get('/', function (req, res) {
    res.sendFile( __dirname + "/templates/index.html" );
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    const host = '127.0.0.1';
    console.log("Example app listening at http://%s:%s", host, PORT)
});

module.exports = server;