const express = require('express');

const router = express.Router();

const fullNameRouter = require('./full-name');
const over18Router = require('./are-you-18-over');
const organisationNameRouter = require('./organisation-name');
const roleRouter = require('./role');
const addressRouter = require('./address');
const emailRouter = require('./email');
const telephoneRouter = require('./telephone');
const commentsRouter = require('./tell-us-about-project');
const checkYourAnswersRouter = require('./check-your-answers');
const declarationRouter = require('./declaration');
const registrationSavedRouter = require('./registration-saved');
const confirmationRouter = require('./confirmation');

router.use('/', fullNameRouter);
router.use('/', over18Router);
router.use('/', organisationNameRouter);
router.use('/', roleRouter);
router.use('/', addressRouter);
router.use('/', emailRouter);
router.use('/', telephoneRouter);
router.use('/', commentsRouter);
router.use('/', checkYourAnswersRouter);
router.use('/', declarationRouter);
router.use('/', registrationSavedRouter);
router.use('/', confirmationRouter);

module.exports = router;
