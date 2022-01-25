const Comment = require('../models/comments');
const Post = require('../models/posts');
const Like = require('../models/like');


module.exports.createComment = async function(req, res) {
    try {
        let post = await Post.findById(req.body.post)
        if (post) { // if the post is found then add comment
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: 'Comment created!'
                })
            }

            res.redirect('/');
        }
        else {
            console.log('[INFO] Post NOT found');
        }
    } catch(err) {
        console.log("Error: ", err);
    }
    
}

module.exports.destroyComment = async function(req, res) {
    try {
        let comment = await Comment.findById(req.params.id)
        // .id means converting the object id into string
        if (comment.user == req.user.id) {
            let postId = comment.post;
            
            comment.remove();

            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

            // Destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
                
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: 'Comment deleted!'
                })
            }

            return res.redirect('back');

        } else {
            return res.redirect('back');
        }
    } catch(err) {
        console.log("Error: ", err);
        return;
    }
    
}