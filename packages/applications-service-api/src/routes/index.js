/**
 * Routes
 *
 * This puts all the endpoints into the application.
 */
const express = require('express');

const router = express.Router();

const interestedPartyRouter = require('./interested-party');
const apiDocsRouter = require('./api-docs');

router.use('/api/v1/interested-party', interestedPartyRouter);
router.use('/api-docs', apiDocsRouter);

module.exports = router;
