const express = require('express');

const router = express.Router();

const representingForRouter = require('./who-representing');
const representeeNameRouter = require('./name-person-representing');
const representeeOver18Router = require('./are-they-18-over');
const representeeAddressRouter = require('./their-postal-address');
const representeeEmailRouter = require('./their-email-address');
const representeeTelephoneRouter = require('./their-telephone-number');

const fullNameRouter = require('./full-name');
const addressRouter = require('./address');
const emailRouter = require('./email-address');
const telephoneRouter = require('./telephone-number');
const organisationNameRouter = require('./name-of-organisation');

const commentsRouter = require('./tell-us-about-project');
const checkYourAnswersRouter = require('./check-answers');
const declarationRouter = require('./declaration');
const registrationSavedRouter = require('./registration-saved');
const confirmationRouter = require('./registration-complete');

router.use('/', representingForRouter);
router.use('/', representeeNameRouter);
router.use('/', representeeOver18Router);
router.use('/', representeeAddressRouter);
router.use('/', representeeEmailRouter);
router.use('/', representeeTelephoneRouter);

router.use('/', fullNameRouter);
router.use('/', addressRouter);
router.use('/', emailRouter);
router.use('/', telephoneRouter);
router.use('/', organisationNameRouter);

router.use('/', commentsRouter);
router.use('/', checkYourAnswersRouter);
router.use('/', declarationRouter);
router.use('/', registrationSavedRouter);
router.use('/', confirmationRouter);

module.exports = router;
