const express = require('express');

const postsController = require('../controllers/posts');

const router = express.Router();

router.get('/:tag', postsController.getBanners);

module.exports = router;
