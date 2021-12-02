const express = require('express');

const router = express.Router();

const startRouter = require('./start');
const typeOfPartyRouter = require('./type-of-party');
const myselfRegistrationRouter = require('./myself');
const organisationRegistrationRouter = require('./organisation');

router.use('/', startRouter);
router.use('/', typeOfPartyRouter);
router.use('/myself', myselfRegistrationRouter);
router.use('/organisation', organisationRegistrationRouter);

module.exports = router;
