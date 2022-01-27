const Post = require('../models/posts');
const Comment = require('../models/comments');
const Like = require('../models/like');

module.exports.createPost = async function(req, res) {
    try {
        let pp = await Post.create({
            content: req.body.content,
            user: req.user._id
        })


        // console.log("post created with content: ");
        // console.log(pp);
        // console.log("id: ", pp._id);
        
        let post = await Post.findById(pp._id)
            .populate('user');

        // console.log("populated content");
        // console.log(post);

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

            // Delete the associated likes for the post and all its comments' likes too
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

            // let allCommentsOfPost = post.comments;

            // for (com in allCommentsOfPost) {
            //     await Like.deleteMany({likeable: com._id, onModel: 'Comment'});
            // }

            post.remove();

            await Comment.deleteMany({post: req.params.id});

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: 'Post deleted!'
                })
            }
            else {
                return res.redirect('back');
            }
            
        } else {
            return res.redirect('back');
        }
    } catch(err) {
        console.log('Error: ', err); return;
    }
}