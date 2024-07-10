/* istanbul ignore file */

const express = require('express');

const router = express.Router();

const applicationsRouter = require('./applications');
const interestedPartyRouter = require('./interested-party');
const apiDocsRouter = require('./api-docs');
const documentsV3Router = require('./documents');
const projectUpdatesRouter = require('./project-updates');
const representationsRouter = require('./representations');
const timetablesRouter = require('./timetables');
const submissionRouter = require('./submissions');
const subscriptionRoute = require('./subscriptions');
const adviceRoute = require('./advice');

router.get('/', (req, res) => res.sendStatus(204));

router.use('/api/v1/applications', applicationsRouter);
router.use('/api/v1/interested-party', interestedPartyRouter);
router.use('/api-docs', apiDocsRouter);
router.use('/api/v3/documents', documentsV3Router);
router.use('/api/v1/project-updates', projectUpdatesRouter);
router.use('/api/v1/representations', representationsRouter);
router.use('/api/v1/timetables', timetablesRouter);
router.use('/api/v1/submissions', submissionRouter);
router.use('/api/v1/subscriptions', subscriptionRoute);
router.use('/api/v1/advice', adviceRoute);

module.exports = router;
