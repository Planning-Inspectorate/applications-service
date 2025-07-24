const express = require('express');
const fileUpload = require('express-fileupload');

const submissionsController = require('../controllers/submissions');
const config = require('../lib/config');
const { parseFormDataProperties } = require('../middleware/parseFormDataProperties');
const { fileUploadLimitHandler } = require('../middleware/fileUploadLimitHandler');
const { validateCreateSubmissionRequest } = require('../middleware/validator/submission');
const { normaliseRequestFileData } = require('../middleware/normaliseRequestFileData');
const { validateRequestWithOpenAPI } = require('../middleware/validator/openapi');
const { asyncRoute } = require('@pins/common/src/utils/async-route');

const router = express.Router();

router.post(
	'/:caseReference',
	fileUpload({
		limits: { fileSize: config.uploads.fileSizeLimit },
		abortOnLimit: true,
		limitHandler: fileUploadLimitHandler,
		defCharset: 'utf8',
		defParamCharset: 'utf8'
	}),
	normaliseRequestFileData,
	parseFormDataProperties(['interestedParty', 'sensitiveData', 'lateSubmission']),
	validateCreateSubmissionRequest,
	asyncRoute(submissionsController.createSubmission)
);

router.post(
	'/:submissionId/complete',
	validateRequestWithOpenAPI,
	asyncRoute(submissionsController.completeSubmission)
);

module.exports = router;
