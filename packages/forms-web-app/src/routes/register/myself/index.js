const express = require('express');

const router = express.Router();

const fullNameRouter = require('./full-name');
const over18Router = require('./are-you-18-over');
const addressRouter = require('./address');
const emailRouter = require('./email-address');
const telephoneRouter = require('./telephone');
const tellUsAboutProjectRouter = require('./tell-us-about-project');
const checkYourAnswersRouter = require('./check-your-answers');
const declarationRouter = require('./declaration');
const registrationCompleteRouter = require('./registration-complete');

router.use('/', fullNameRouter);
router.use('/', over18Router);
router.use('/', addressRouter);
router.use('/', emailRouter);
router.use('/', telephoneRouter);
router.use('/', tellUsAboutProjectRouter);
router.use('/', checkYourAnswersRouter);
router.use('/', declarationRouter);
router.use('/', registrationCompleteRouter);

module.exports = router;
