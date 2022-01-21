const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.createComment = function(req, res) {
    Post.findById(req.body.post, function(err, post) {
        if (post) { // if the post is found then add comment
            console.log('[INFO] Post found .. adding comment');
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment) {
                // handle error

                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }
        else {
            console.log('[INFO] Post NOT found');
        }

    });
}