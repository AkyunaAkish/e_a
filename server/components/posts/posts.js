'use strict';
const express = require('express');
const router = express.Router();

let submitPostController = require('./controllers/submitPost.server.controller.js');
let retrievePostsController = require('./controllers/retrievePosts.server.controller.js');

router.post('/submit-post', submitPostController);
router.get('/retrieve-posts', retrievePostsController);

module.exports = router;
