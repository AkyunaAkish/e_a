'use strict';
const express = require('express');
const router = express.Router();

let submitPostController = require('./controllers/submitPost.server.controller.js');
let retrievePostsController = require('./controllers/retrievePosts.server.controller.js');
let retrieveCommentsController = require('./controllers/retrieveComments.server.controller.js');
let retrievePostController = require('./controllers/retrievePost.server.controller.js');
let submitCommentController = require('./controllers/submitComment.server.controller.js');
let likePostController = require('./controllers/likePost.server.controller.js');
let unlikePostController = require('./controllers/unlikePost.server.controller.js');

router.post('/submit-post', submitPostController);
router.post('/submit-comment', submitCommentController);
router.post('/like-post', likePostController);
router.post('/unlike-post', unlikePostController);
router.get('/retrieve-posts', retrievePostsController);
router.get('/retrieve-comments/:id', retrieveCommentsController);
router.get('/retrieve-post/:id', retrievePostController);

module.exports = router;
