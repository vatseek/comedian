const nconf = require('nconf');
const ENV = process.env.NODE_ENV;

const configDev = {
    "port": 5000,
    "mongoose": {
        "uri": "mongodb://localhost/comedy",
        "options": {
            "server": {
                "socketOptions": {
                    "keepAlive": 1
                }
            }
        },
        "db": "comedy"
    },
    "session": {
        "keys": {
            "secret1": "secret1",
            "secret2": "secret2"
        },
        "secret": "bookmark secret key",
        "key": "sid",
        "cookie": {
            "path": "/",
            "httpOnly": true,
            "maxAge": null
        },
        "store": {
            "host": "ds063240.mongolab.com",
            "port": "63240",
            "username": "heroku_app32398519",
            "password": "ni12i8390gep26obq200if8ufn",
            "db": "heroku_app32398519"
        }
    },
    "serviceTick": 5000,
    "telegram": {
        "token": "289831525:AAHOgpMzp2FU6nsQRcnmbgEZXoX1IOdpUrU"
    }
};

nconf.argv().env();
if (ENV == 'development') {
    nconf.defaults(configDev);
} else {
    nconf.defaults(configDev);
}

export default nconf;