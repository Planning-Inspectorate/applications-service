const express = require('express');

const applicationsController = require('../controllers/applications');
const { asyncRoute } = require('@pins/common/src/utils/async-route');
const { validateRequestWithOpenAPI } = require('../middleware/validator/openapi');
const {
	normaliseArrayQueryParams,
	parseIntegerQueryParams,
	parseBooleanQueryParams
} = require('../middleware/parseParamProperties');

const router = express.Router();

router.get('/download', asyncRoute(applicationsController.getAllApplicationsDownload));
router.get(
	'/:caseReference',
	validateRequestWithOpenAPI,
	asyncRoute(applicationsController.getApplication)
);
router.get(
	'',
	parseIntegerQueryParams(['page', 'size']),
	parseBooleanQueryParams(['excludeNullDateOfSubmission']),
	normaliseArrayQueryParams(['stage', 'region', 'sector']),
	validateRequestWithOpenAPI,
	asyncRoute(applicationsController.getAllApplications)
);

module.exports = router;
