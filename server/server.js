global.Promise = require('bluebird');
const path = require('path');
const express = require('express');
const engine = require('ejs-mate');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
import config from 'config';
import { mongoDb } from 'storage';
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
import router from 'routers/index';
import Token from './models/token';
import Application from 'engine';
const botEngine = new Application(config.get('serviceTick'));

const app = express();
app.use(express.static('public'));
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    resave: false,
    store: new MongoStore({ mongooseConnection: mongoDb.connection }),
    saveUninitialized: true
}));
app.use(require('middlewares/loadUser'));
app.use(require('middlewares/extendRequest'));
app.use(function(req, res, next) {
    req.bot = botEngine;
    next();
});

app.use('/', router);
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function(err, req, res, next) {
    // return next(err);
    const result = {
        message: err.message,
        error: {}
    };
    if (app.get('env') === 'development') {
        result['error'] = err;
    }
    res.status(err.status || 500);
    if (res.req.headers['x-request-with'] == 'XMLHttpRequest' || err.responseType === 'json') {
        delete(result.message);
        res.json(result);
    } else {
        res.render('error', {...result});
    }
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    const host = '127.0.0.1';
    console.log("Example app listening at http://%s:%s", host, PORT);
    // Run bot service
    Token.find({disabled: false}).then((tokens) => {
        botEngine.loadData(tokens);
        botEngine.start();
    });
});

module.exports = server;