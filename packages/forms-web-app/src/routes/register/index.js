const express = require('express');

const router = express.Router({ mergeParams: true });

const startRouter = require('./start');
const registrationPeriodClosedRouter = require('./registration-period-closed');
const typeOfPartyRouter = require('./type-of-party');
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
router.use('/register-have-your-say', startRouter);

router.use('/myself', commonRouter);
router.use('/organisation', commonRouter);
router.use('/agent', commonRouter);

module.exports = router;
