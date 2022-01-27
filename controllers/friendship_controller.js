const User = require('../models/user');
const Friendship = require('../models/friendship');
//const fs = require('fs');
//const path = require('path');

// Send friend request
module.exports.sendFriendRequest = async function(req, res) {
    try {
        let friendship = await Friendship.create({
            from_user: req.query.fromUser,
            to_user: req.query.toUser,
            accepted: false
        });

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    friendship: friendship
                },
                message: 'Friend request sent'
            })
        }

        res.redirect('back');
    }  catch(err) {
        console.log("Error: ", err);
    }
    
}

// Accept friend request
module.exports.acceptFriendRequest = async function(req, res) {
    try {
        // update friendship database
        let friendship = await Friendship.findOne({
            from_user: req.query.toUser,
            to_user: req.query.fromUser,
            accepted: false
        });

        console.log(friendship)
        friendship.accepted = true;
        await friendship.save();

        // add friends in user entry - for both users
        let user1 = await User.findById(req.query.fromUser);
        user1.friendships.push(req.query.toUser);
        await user1.save();

        let user2 = await User.findById(req.query.toUser);
        user2.friendships.push(req.query.fromUser);
        await user2.save();

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    friendship: friendship
                },
                message: 'Friends'
            })
        }

        res.redirect('back');
    }  catch(err) {
        console.log("Error: ", err);
    }
    
}