const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.createPost = async function(req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'Post created!'
            })
        }

        return res.redirect('back');

    } catch(err) {
        console.log('Error in create a post: ', err); return;
    }
}

module.exports.destroyPost = async function(req, res) {
    try {
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            
            return res.redirect('back');
            
        } else {
            return res.redirect('back');
        }
    } catch(err) {
        console.log('Error: ', err); return;
    }
}