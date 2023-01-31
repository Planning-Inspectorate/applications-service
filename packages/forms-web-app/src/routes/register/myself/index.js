const express = require('express');

const router = express.Router();

const tellUsAboutProjectRouter = require('./tell-us-about-project');
const checkYourAnswersRouter = require('./check-your-answers');
const registrationSavedRouter = require('./registration-saved');
const registrationCompleteRouter = require('./registration-complete');

router.use('/', tellUsAboutProjectRouter);
router.use('/', checkYourAnswersRouter);
router.use('/', registrationSavedRouter);
router.use('/', registrationCompleteRouter);

module.exports = router;
