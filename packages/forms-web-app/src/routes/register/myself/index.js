const express = require('express');

const router = express.Router({ mergeParams: true });

const checkYourAnswersRouter = require('./check-your-answers');

router.use('/', checkYourAnswersRouter);

module.exports = router;
