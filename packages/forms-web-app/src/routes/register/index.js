const express = require('express');

const organisationRegistrationRouter = require('./organisation');
const behalfRegistrationRouter = require('./agent');
const { registerMiddleware } = require('./middleware');

const router = express.Router({ mergeParams: true });

router.use('/organisation', registerMiddleware, organisationRegistrationRouter);
router.use('/agent', registerMiddleware, behalfRegistrationRouter);

module.exports = router;
