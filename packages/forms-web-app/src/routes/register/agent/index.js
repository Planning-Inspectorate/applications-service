const express = require('express');

const router = express.Router({ mergeParams: true });

const representeeEmailRouter = require('./their-email-address');
const representeeTelephoneRouter = require('./their-telephone-number');

router.use('/', representeeEmailRouter);
router.use('/', representeeTelephoneRouter);

module.exports = router;
