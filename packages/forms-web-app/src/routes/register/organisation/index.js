const express = require('express');

const router = express.Router({ mergeParams: true });

const roleRouter = require('./what-job-title-or-role');

const commentsRouter = require('./tell-us-about-project');
const checkYourAnswersRouter = require('./check-answers');

router.use('/', roleRouter);
router.use('/', commentsRouter);
router.use('/', checkYourAnswersRouter);

module.exports = router;
