const express = require('express');
const socialmediaController = require('../controllers/socialmediaController');

const router = express.Router();

router.get('/', socialmediaController.getFacebookLikes);

module.exports = router;