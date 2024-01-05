const express = require('express');

const router = express.Router({ mergeParams: true });

const roleRouter = require('./what-job-title-or-role');

router.use('/', roleRouter);

module.exports = router;
