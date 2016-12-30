import mongoose from 'mongoose'
import Token from '../models/token';
import User from '../models/user';

const schema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        'default': function () {
            return new mongoose.Types.ObjectId
        }
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    channel: {
        type: String,
        unique: false,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        unique: false,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.canEdit = function(user) {
    if (user._id == this.user || User.isAdmin(user)) {
        return true;
    }
    return false;
};

schema.statics.getByCode = function(code) {
    return Token.findOne({ token: code });
};


export default mongoose.model('token', schema);
