global.Promise = require('bluebird');
const path = require('path');
const express = require('express');
const engine = require('ejs-mate');
const cookieParser = require('cookie-parser');
const config = require('config');
import { mongoDb } from 'storage';
import router from 'routers/index';

const app = express();
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');
app.use(cookieParser());

app.use('/', router);
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function(err, req, res, next) {
    const result = {
        message: err.message,
        error: {}
    };
    if (app.get('env') === 'development') {
        result['error'] = err;
    }
    res.status(err.status || 500);
    if (res.req.headers['x-request-with'] == 'XMLHttpRequest') {
        res.json(result);
    } else {
        res.render('error', {...result});
    }
});


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    const host = '127.0.0.1';
    console.log("Example app listening at http://%s:%s", host, PORT)
});

module.exports = server;