import mongoose from 'mongoose'
import Token from '../models/token';

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
    }
});

schema.methods.canEdit = function(user) {
    if (user._id == this.user || user.isAdmin()) {
        return true;
    }
    return false;
};

schema.statics.getByCode = function(code) {
    return Token.findOne({ token: code });
};


export default mongoose.model('token', schema);
