const express = require('express');
const typeOfPartyRouter = require('./type-of-party');
const myselfRegistrationRouter = require('./myself');
const organisationRegistrationRouter = require('./organisation');
const behalfRegistrationRouter = require('./agent');
const couldNotVerifyEmailRouter = require('./could-not-verify-email');
const commonRouter = require('./common');
const { registerMiddleware } = require('./middleware');

const router = express.Router({ mergeParams: true });

router.use('/who-registering-for', registerMiddleware, typeOfPartyRouter);
router.use('/myself', registerMiddleware, myselfRegistrationRouter);
router.use('/organisation', registerMiddleware, organisationRegistrationRouter);
router.use('/agent', registerMiddleware, behalfRegistrationRouter);
router.use('/could-not-verify-email', registerMiddleware, couldNotVerifyEmailRouter);

router.use('/myself', registerMiddleware, commonRouter);
router.use('/organisation', registerMiddleware, commonRouter);
router.use('/agent', registerMiddleware, commonRouter);

module.exports = router;
