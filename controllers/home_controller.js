const Post = require('../models/posts')

module.exports.home = (req, res) => {
	// console.log(req.cookies);
    // res.cookie('user_id', 25);
    
    Post.find({}, function(err, posts) {
        return res.render('home', {
            title: 'Home',
            posts: posts
        })
    })
}