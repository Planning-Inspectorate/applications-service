const express = require('express');

const router = express.Router({ mergeParams: true });

const representeeNameRouter = require('./name-person-representing');
const representeeAddressRouter = require('./their-postal-address');
const representeeEmailRouter = require('./their-email-address');
const representeeTelephoneRouter = require('./their-telephone-number');

router.use('/', representeeNameRouter);
router.use('/', representeeAddressRouter);
router.use('/', representeeEmailRouter);
router.use('/', representeeTelephoneRouter);

module.exports = router;
