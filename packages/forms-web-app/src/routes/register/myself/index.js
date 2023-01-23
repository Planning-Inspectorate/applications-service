const express = require('express');

const router = express.Router();

const over18Router = require('./are-you-18-over');
const telephoneRouter = require('./telephone');
const tellUsAboutProjectRouter = require('./tell-us-about-project');
const checkYourAnswersRouter = require('./check-your-answers');
const declarationRouter = require('./declaration');
const registrationSavedRouter = require('./registration-saved');
const registrationCompleteRouter = require('./registration-complete');

router.use('/', over18Router);
router.use('/', telephoneRouter);
router.use('/', tellUsAboutProjectRouter);
router.use('/', checkYourAnswersRouter);
router.use('/', declarationRouter);
router.use('/', registrationSavedRouter);
router.use('/', registrationCompleteRouter);

module.exports = router;
