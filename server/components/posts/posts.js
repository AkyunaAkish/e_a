'use strict';
const express = require('express');
const router = express.Router();

let submitPostController = require('./controllers/submitPost.server.controller.js');
let retrievePostsController = require('./controllers/retrievePosts.server.controller.js');
let retrieveLikesController = require('./controllers/retrieveLikes.server.controller.js');
let retrieveCommentsController = require('./controllers/retrieveComments.server.controller.js');
let deleteCommentController = require('./controllers/deleteComment.server.controller.js');
let retrievePostController = require('./controllers/retrievePost.server.controller.js');
let submitCommentController = require('./controllers/submitComment.server.controller.js');
let likeController = require('./controllers/like.server.controller.js');

router.post('/submit-post', submitPostController);
router.post('/submit-comment', submitCommentController);
router.post('/delete-comment', deleteCommentController);
router.post('/like', likeController);
router.get('/retrieve-posts', retrievePostsController);
router.get('/retrieve-comments/:id', retrieveCommentsController);
router.get('/retrieve-likes/:id', retrieveLikesController);
router.get('/retrieve-post/:id', retrievePostController);

module.exports = router;
