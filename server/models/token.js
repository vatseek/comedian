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

schema.statics.getByCode = function(code) {
    return Token.findOne({ token: code });
};


export default mongoose.model('token', schema);
