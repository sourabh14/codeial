var mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content : {
        type: String,
        required: true
    },
    user : { // user who has commented
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post : { // post on which comment is made 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;