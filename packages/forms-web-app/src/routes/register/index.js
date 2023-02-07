const express = require('express');

const router = express.Router();

const startRouter = require('../../pages/register/start/start.router');
const registrationPeriodClosedRouter = require('./registration-period-closed');
const typeOfPartyRouter = require('../../pages/register/who-are-you-registering-for/type-of-party.router');
const myselfRegistrationRouter = require('./myself');
const organisationRegistrationRouter = require('./organisation');
const behalfRegistrationRouter = require('./agent');
const couldNotVerifyEmailRouter = require('./could-not-verify-email');
const commonRouter = require('./common');

router.use('/registration-period-closed', registrationPeriodClosedRouter);
router.use('/', typeOfPartyRouter);
router.use('/myself', myselfRegistrationRouter);
router.use('/organisation', organisationRegistrationRouter);
router.use('/agent', behalfRegistrationRouter);
router.use('/could-not-verify-email', couldNotVerifyEmailRouter);
router.use('/', startRouter);

router.use('/myself', commonRouter);
router.use('/organisation', commonRouter);
router.use('/agent', commonRouter);

module.exports = router;
