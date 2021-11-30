const express = require('express');

const router = express.Router();

const startRouter = require('./start');
const typeOfPartyRouter = require('./type-of-party');
const myselfRegistrationRouter = require('./myself');

router.use('/', startRouter);
router.use('/', typeOfPartyRouter);
router.use('/myself', myselfRegistrationRouter);

module.exports = router;
