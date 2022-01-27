const express = require('express');

const router = express.Router();
const friendshipController = require('../controllers/friendship_controller');

router.post('/send-request', friendshipController.sendFriendRequest);
router.post('/approve-request', friendshipController.acceptFriendRequest);

module.exports = router;