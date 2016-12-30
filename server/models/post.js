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
        unique: false,
        required: true
    },
    text: {
        type: String,
        unique: true,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        unique: false,
        required: true
    }
});

const Post = mongoose.model('post', schema);
export default Post;
