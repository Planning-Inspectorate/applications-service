const express = require('express');
const fileUpload = require('express-fileupload');

const submissionsController = require('../controllers/submissions');
const config = require('../lib/config');
const { parseFormDataProperties } = require('../middleware/parseFormDataProperties');
const { fileUploadLimitHandler } = require('../middleware/fileUploadLimitHandler');
const { validateRequest } = require('../middleware/validator/submission');
const { normaliseRequestFileData } = require('../middleware/normaliseRequestFileData');

const router = express.Router();

router.post(
	'/:caseReference',
	fileUpload({
		limits: { fileSize: config.uploads.fileSizeLimit },
		abortOnLimit: true,
		limitHandler: fileUploadLimitHandler
	}),
	normaliseRequestFileData,
	parseFormDataProperties(['interestedParty', 'sensitiveData', 'lateSubmission'], ['submissionId']),
	validateRequest,
	submissionsController.createSubmission
);

module.exports = router;
