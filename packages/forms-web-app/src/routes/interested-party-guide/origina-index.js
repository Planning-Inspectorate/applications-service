const express = require('express');

const router = express.Router();

const haveSayPreApplicationRouter = require('./have-say-pre-application');
const fullNmaeRouter = require('./full-name');

router.use('/', haveSayPreApplicationRouter);
router.use('/', fullNmaeRouter);

module.exports = router;