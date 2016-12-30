import mongoose from 'mongoose'

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
    }
});

const Post = mongoose.model('post', schema);
export default Post;
