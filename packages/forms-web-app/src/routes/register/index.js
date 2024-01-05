const express = require('express');

const behalfRegistrationRouter = require('./agent');
const { registerMiddleware } = require('./middleware');

const router = express.Router({ mergeParams: true });

router.use('/agent', registerMiddleware, behalfRegistrationRouter);

module.exports = router;
