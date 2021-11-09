/**
 * Routes
 *
 * This puts all the endpoints into the application.
 */
const express = require('express');

const router = express.Router();

const applicationsRouter = require('./applications');
const interestedPartyRouter = require('./interested-party');
const apiDocsRouter = require('./api-docs');
const dbConnectionTestRouter = require('./db-connection-test');

router.use('/api/v1/applications', applicationsRouter);
router.use('/api/v1/interested-party', interestedPartyRouter);
router.use('/api-docs', apiDocsRouter);
router.use('/test', dbConnectionTestRouter);

module.exports = router;
