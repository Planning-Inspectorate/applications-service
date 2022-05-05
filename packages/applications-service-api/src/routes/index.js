/* istanbul ignore file */

const express = require('express');

const router = express.Router();

const applicationsRouter = require('./applications');
const interestedPartyRouter = require('./interested-party');
const apiDocsRouter = require('./api-docs');
const dbConnectionTestRouter = require('./db-connection-test');
const documentRouter = require('./documents');
const representationsRouter = require('./representations');

router.use('/api/v1/applications', applicationsRouter);
router.use('/api/v1/interested-party', interestedPartyRouter);
router.use('/api-docs', apiDocsRouter);
router.use('/test', dbConnectionTestRouter);
router.use('/api/v1/documents', documentRouter);
router.use('/api/v2/documents', documentRouter);
router.use('/api/v1/representations', representationsRouter);

module.exports = router;
