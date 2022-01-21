const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.createPost = function(req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post) {
        if (err) { console.log('error in create a post'); return; }
        return res.redirect('back');
    })
}

module.exports.destroyPost = function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        // .id means converting the object id into string
        if (post.user == req.user.id) {
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err) {
                return res.redirect('back');
            })
        } else {
            return res.redirect('back');
        }
    })
}