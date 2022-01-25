const Post = require('../models/posts');
const User = require('../models/user');
const moment = require('moment');

module.exports.home = async function(req, res) {
    try {
        // Populate the user and comments in each post
        var posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: [
                    {path: 'user'},
                    {path: 'likes'}
                ]
            })
            .populate('likes');

        let users = await User.find({});

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