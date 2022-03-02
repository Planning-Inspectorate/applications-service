const express = require('express');

const router = express.Router();

const startRouter = require('./start');
const typeOfPartyRouter = require('./type-of-party');
const myselfRegistrationRouter = require('./myself');
const organisationRegistrationRouter = require('./organisation');
const behalfRegistrationRouter = require('./agent');

router.use('/', typeOfPartyRouter);
router.use('/myself', myselfRegistrationRouter);
router.use('/organisation', organisationRegistrationRouter);
router.use('/agent', behalfRegistrationRouter);
router.use('/', startRouter);

module.exports = router;
