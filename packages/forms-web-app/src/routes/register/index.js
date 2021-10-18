const express = require('express');

const router = express.Router();

const typeOfPartyRouter = require('./type-of-party');
const fullNmaeRouter = require('./full-name');

router.use('/', typeOfPartyRouter);
router.use('/', fullNmaeRouter);

module.exports = router;
