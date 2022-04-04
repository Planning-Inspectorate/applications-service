const express = require('express');

const router = express.Router();

const fullNameRouter = require('./full-name');
const over18Router = require('./are-you-18-over');
const organisationNameRouter = require('./name-of-organisation-or-charity');
const roleRouter = require('./what-job-title-or-role');
const addressRouter = require('./address');
const emailRouter = require('./email-address');
const telephoneRouter = require('./telephone-number');
const commentsRouter = require('./tell-us-about-project');
const checkYourAnswersRouter = require('./check-answers');
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
