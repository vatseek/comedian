import mongoose from 'mongoose'
import crypto from 'crypto'
import ExtError from '../errors';
import Post from './post';
import Token from './token';


const schema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        'default': function () {
            return new mongoose.Types.ObjectId
        }
    },
    login: {
        type: String,
        unique: false,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    tokens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Token'}],
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });

schema.statics.authorize = function(username, password) {
    return new Promise((resolve, reject) => {
        User.findOne({login: username}).then(
            user => {
                if (user && user.checkPassword(password)) {
                    resolve(user);
                }
                reject(new AuthError(400, 'Invalid user'));
            }, error => {
                reject(error);
            }
        );
    });
};

schema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.isAdmin = function (user) {
    return (user && user.login === 'admin');
};

schema.statics.addUser = (data) => {
    const user = new User({...data});
    return new Promise((resolve, reject) => {
        user.save().then(user => {
            resolve(user);
        }, error => {
            if (error.code === 11000 ) {
                reject(new AuthError('User already exusts'));
            }
            reject(error);
        });
    });
};

schema.statics.getUserByEmailOrLogin = function(email, login) {
    return User.findOne({
        $or: [
            { email: email },
            { login: login }
        ]
    })
};

const User = mongoose.model('user', schema);
export default User;

class UserAuthError extends ExtError {
    constructor(code, message) {
        super(code, message);
    }
}

export const AuthError = UserAuthError;
