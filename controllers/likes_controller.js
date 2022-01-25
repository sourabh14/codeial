const Post =  require("../models/posts");
const Comment = require('../models/comments');
const Like = require("../models/like");


module.exports.toggleLike = async function(req, res){
    try{
        // likes/toggle/?id=abcdef&type=Post
        let likeable;
        let deleted = false;

        if (req.query.type == 'Post') {
            likeable = await Post.findById(req.query.id).populate('likes');
        } else {
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // check if a like already exists
        let existingLike = await Like.findOne({
            user: req.user._id,
            likeable: req.query.id,
            onModel: req.query.type
        })

        // if a like already exists then delete it
        if (existingLike) {
            // pull the like id from the post/comment likes array
            await likeable.likes.pull(existingLike._id);
            await likeable.save();
            // remove the like from like schema
            await existingLike.remove();
            deleted = true;

        } else {
            // else make a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });
            // push the new like in post/comment
            await likeable.likes.push(newLike._id);
            await likeable.save();
        }

        return res.json(200, {
            message: "Like/Unlike Request successful!",
            data: {
                deleted: deleted
            }
        })

    } catch(err) {
        console.log(err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}