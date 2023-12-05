const express = require('express');

const router = express.Router({ mergeParams: true });

const representingForRouter = require('./who-representing');
const representeeNameRouter = require('./name-person-representing');
const representeeAddressRouter = require('./their-postal-address');
const representeeEmailRouter = require('./their-email-address');
const representeeTelephoneRouter = require('./their-telephone-number');

const organisationNameRouter = require('./name-of-organisation');

const commentsRouter = require('./tell-us-about-project');
const checkYourAnswersRouter = require('./check-answers');

router.use('/', representingForRouter);
router.use('/', representeeNameRouter);
router.use('/', representeeAddressRouter);
router.use('/', representeeEmailRouter);
router.use('/', representeeTelephoneRouter);

router.use('/', organisationNameRouter);

router.use('/', commentsRouter);
router.use('/', checkYourAnswersRouter);

module.exports = router;
