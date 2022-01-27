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
        let current_user = await User.findById(req.user.id)
        let friends = [];

        for (f of current_user.friendships) {
            let fobject = await User.findById(f._id);
            friends.push(fobject);
        }

        console.log("current user: ", current_user);

        return res.render('home', {
            title: 'Home',
            posts: posts,
            friends: friends,
            all_users: users,
            moment: moment
        });
        
    } catch(err) {
        console.log('Error: ', err);
        return;
    }
    
}