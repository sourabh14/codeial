const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.createComment = function(req, res) {
    Post.findById(req.body.post, function(err, post) {
        if (post) { // if the post is found then add comment
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

module.exports.destroyComment = function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        // .id means converting the object id into string
        if (comment.user == req.user.id) {
            let postId = comment.post;
            
            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function(err, post) {
                return res.redirect('back');
            })
        } else {
            return res.redirect('back');
        }
    })
}