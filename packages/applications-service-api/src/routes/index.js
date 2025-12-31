/* istanbul ignore file */

const express = require('express');

const router = express.Router();

const applicationsRouter = require('./applications');
const interestedPartyRouter = require('./interested-party');
const apiDocsRouter = require('./api-docs');
const documentsV3Router = require('./documents.v3');
const projectUpdatesRouter = require('./project-updates');
const representationsRouter = require('./representations');
const timetablesRouter = require('./timetables');
const submissionRouter = require('./submissions');
const subscriptionRoute = require('./subscriptions');
const adviceRoute = require('./advice');
const osMapsRouter = require('./os-maps');
const validateMigrationRouter = require('./validate-migration');
const config = require('../lib/config');

router.get('/', (req, res) => res.sendStatus(204));

router.get('/health', async (req, res) => {
	res.status(200).send({
		status: 'OK',
		uptime: process.uptime(),
		commit: config.gitSha
	});
});

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
router.use('/api/v1/os-maps', osMapsRouter);
router.use('/validate-migration', validateMigrationRouter);

module.exports = router;
