const express = require('express');

const router = express.Router();

const addressRouter = require('./address');
const telephoneRouter = require('./telephone');
const tellUsAboutProjectRouter = require('./tell-us-about-project');
const checkYourAnswersRouter = require('./check-your-answers');
const declarationRouter = require('./declaration');
const registrationSavedRouter = require('./registration-saved');
const registrationCompleteRouter = require('./registration-complete');

router.use('/', addressRouter);
router.use('/', telephoneRouter);
router.use('/', tellUsAboutProjectRouter);
router.use('/', checkYourAnswersRouter);
router.use('/', declarationRouter);
router.use('/', registrationSavedRouter);
router.use('/', registrationCompleteRouter);

module.exports = router;
