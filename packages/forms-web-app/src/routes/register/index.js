const express = require('express');

const router = express.Router();

const typeOfPartyRouter = require('./type-of-party');

router.use('/', typeOfPartyRouter);

module.exports = router;
