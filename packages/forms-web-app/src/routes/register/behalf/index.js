const express = require('express');

const router = express.Router();

const representingForRouter = require('./representing-for');
const representeeNameRouter = require('./representee-name');
const representeeOver18Router = require('./representee-over-18');
const representeeAddressRouter = require('./representee-address');
const representeeEmailRouter = require('./representee-email');
const representeeTelephoneRouter = require('./representee-telephone');

const fullNameRouter = require('./full-name');
const addressRouter = require('./address');
const emailRouter = require('./email');
const telephoneRouter = require('./telephone');
const organisationNameRouter = require('../agent/name-of-organisation');

const commentsRouter = require('./tell-us-about-project');
const checkYourAnswersRouter = require('./check-your-answers');
const declarationRouter = require('./declaration');
const registrationSavedRouter = require('../agent/registration-saved');
const confirmationRouter = require('./confirmation');

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
