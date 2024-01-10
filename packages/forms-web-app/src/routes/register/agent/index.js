const express = require('express');

const router = express.Router({ mergeParams: true });

const representeeEmailRouter = require('./their-email-address');

router.use('/', representeeEmailRouter);

module.exports = router;
