const Post = require('../models/posts');
const User = require('../models/user');
const moment = require('moment');

module.exports.home = async function(req, res) {
    try {
        // Populate the user and comments in each post
        console.log("*******************[DEBUG] home_controller START");

        var posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                },
                populate: {
                    path: 'likes'
                }
            })
            .populate('likes');

        console.log("*******************[DEBUG] home_controller AFTER POSTS");

        let users = await User.find({});

        console.log("*******************[DEBUG] home_controller AFTER USERS");

        return res.render('home', {
            title: 'Home',
            posts: posts,
            all_users: users,
            moment: moment
        });
        
    } catch(err) {
        console.log('Error: ', err);
        return;
    }
    
}