const express = require('express');

const router = express.Router({ mergeParams: true });

const tellUsAboutProjectRouter = require('./tell-us-about-project');
const checkYourAnswersRouter = require('./check-your-answers');

router.use('/', tellUsAboutProjectRouter);
router.use('/', checkYourAnswersRouter);

module.exports = router;
