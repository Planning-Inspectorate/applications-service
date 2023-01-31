const express = require('express');

const router = express.Router();

const tellUsAboutProjectRouter = require('./tell-us-about-project');
const checkYourAnswersRouter = require('./check-your-answers');
const registrationSavedRouter = require('./registration-saved');

router.use('/', tellUsAboutProjectRouter);
router.use('/', checkYourAnswersRouter);
router.use('/', registrationSavedRouter);

module.exports = router;
