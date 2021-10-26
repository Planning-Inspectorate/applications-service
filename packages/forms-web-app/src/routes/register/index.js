const express = require('express');

const router = express.Router();

const startRouter = require('./start');
const typeOfPartyRouter = require('./type-of-party');
const fullNameRouter = require('./full-name');

router.use('/', startRouter);
router.use('/', typeOfPartyRouter);
router.use('/', fullNameRouter);

module.exports = router;
