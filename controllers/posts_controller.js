const Post = require('../models/posts');

module.exports.createPost = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post) {
        if (err) { console.log('error in create a post'); return; }
        return res.redirect('back');
    })
}