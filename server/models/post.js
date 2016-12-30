import mongoose from 'mongoose'
import User from '../models/user';

const schema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        'default': function () {
            return new mongoose.Types.ObjectId
        }
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        unique: false,
        required: true
    },
    tags: {
        type: [String],
        required: false,
        default: []
    },
    published: {
        type: mongoose.Schema.Types.Boolean,
        required: true,
        default: false
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

const Post = mongoose.model('post', schema);
export default Post;
