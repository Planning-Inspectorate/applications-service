const express = require('express');

const router = express.Router();

const myselfRegistrationRouter = require('./myself');

router.use('/myself', myselfRegistrationRouter);

module.exports = router;
