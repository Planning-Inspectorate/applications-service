/* istanbul ignore file */

const express = require('express');

const router = express.Router();

const applicationsRouter = require('./applications');
const interestedPartyRouter = require('./interested-party');
const apiDocsRouter = require('./api-docs');
const dbConnectionTestRouter = require('./db-connection-test');
const documentsV3Router = require('./documents.v3');
const representationsRouter = require('./representations');
const timetablesRouter = require('./timetables');
const submissionRouter = require('./submissions');
const adviceRoute = require('./advice');

router.use('/api/v1/applications', applicationsRouter);
router.use('/api/v1/interested-party', interestedPartyRouter);
router.use('/api-docs', apiDocsRouter);
router.use('/test', dbConnectionTestRouter);
router.use('/api/v3/documents', documentsV3Router);
router.use('/api/v1/representations', representationsRouter);
router.use('/api/v1/timetables', timetablesRouter);
router.use('/api/v1/submissions', submissionRouter);
router.use('/api/v1/advice', adviceRoute);

module.exports = router;
