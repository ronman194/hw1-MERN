const express = require('express');
const router = express.Router();
const post = require('../controller/post_controller.js');

router.get('/', post.getAllPosts);

router.get('/:id', post.getPostById);

router.post('/', post.addNewPost);

router.put('/:id', post.updatePostById);

module.exports = router;