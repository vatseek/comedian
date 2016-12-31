import mongoose from 'mongoose'
import Token from '../models/token';
import User from '../models/user';

const types = {
    values: ['slack', 'telegram'],
    message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
};

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
    bot: {
        type: String,
        unique: false,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        unique: false,
        required: true
    },
    disabled: {
        type: mongoose.Schema.Types.Boolean,
        required: true,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        enum: types,
        required: true,
        default: types.values[0]
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

export const tokenTypes = types;

export default mongoose.model('token', schema);
