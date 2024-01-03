const express = require('express');
const myselfRegistrationRouter = require('./myself');
const organisationRegistrationRouter = require('./organisation');
const behalfRegistrationRouter = require('./agent');
const { registerMiddleware } = require('./middleware');

const router = express.Router({ mergeParams: true });

router.use('/myself', registerMiddleware, myselfRegistrationRouter);
router.use('/organisation', registerMiddleware, organisationRegistrationRouter);
router.use('/agent', registerMiddleware, behalfRegistrationRouter);

module.exports = router;
