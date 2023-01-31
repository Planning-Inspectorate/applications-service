const express = require('express');

const router = express.Router();

const organisationNameRouter = require('./name-of-organisation-or-charity');
const roleRouter = require('./what-job-title-or-role');

const commentsRouter = require('./tell-us-about-project');
const checkYourAnswersRouter = require('./check-answers');
const registrationSavedRouter = require('./registration-saved');
const confirmationRouter = require('./registration-complete');

router.use('/', organisationNameRouter);
router.use('/', roleRouter);
router.use('/', commentsRouter);
router.use('/', checkYourAnswersRouter);
router.use('/', registrationSavedRouter);
router.use('/', confirmationRouter);

module.exports = router;
