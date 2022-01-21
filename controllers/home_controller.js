const Post = require('../models/posts');
const moment = require('moment');

module.exports.home = (req, res) => {
	// console.log(req.cookies);
    // res.cookie('user_id', 25);
    
    // Post.find({}, function(err, posts) {
    //     return res.render('home', {
    //         title: 'Home',
    //         posts: posts,
    //         moment: moment
    //     })
    // })

    // Populate the user of each post
    Post.find({}).populate('user').exec(function(err, posts) {
        return res.render('home', {
            title: 'Home',
            posts: posts,
            moment: moment
        });
    });
}