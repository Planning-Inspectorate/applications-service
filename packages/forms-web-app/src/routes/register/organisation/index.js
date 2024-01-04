const express = require('express');

const router = express.Router({ mergeParams: true });

const roleRouter = require('./what-job-title-or-role');

const commentsRouter = require('./tell-us-about-project');

router.use('/', roleRouter);
router.use('/', commentsRouter);

module.exports = router;
