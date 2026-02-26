const express = require('express');

const applicationsController = require('../controllers/applications');
const applicationsControllerV2 = require('../controllers/applications.v2');
// Commented out until IDAS-40 frontend GeoJSON service is built — see route comment below
// const { getApplicationsGeoJSON } = require('../controllers/applications.geojson');
const { asyncRoute } = require('@pins/common/src/utils/async-route');
const { validateRequestWithOpenAPI } = require('../middleware/validator/openapi');
const {
	normaliseArrayQueryParams,
	parseIntegerQueryParams,
	parseBooleanQueryParams
} = require('../middleware/parseParamProperties');
const { isBackOfficeCaseReference } = require('../utils/is-backoffice-case-reference');

const router = express.Router();

const getApplicationsRoute = (req, res, next) => {
	// TODO combine the two controllers into one, and have new single controller invoke getApplication from application.service, then remove this middleware
	const route = isBackOfficeCaseReference(req.params.caseReference)
		? applicationsControllerV2.getApplication
		: applicationsController.getApplication;

	return asyncRoute(route)(req, res, next);
};

router.get('/download', applicationsController.getAllApplicationsDownload);

// NOTE: This route is intentionally commented out until the forms-web-app GeoJSON service
// (projects-map.service.js) is built and actively consumes it (see idas-40).
// Uncomment this route as part of that task to avoid exposing an unused endpoint.
// See: packages/applications-service-api/src/controllers/applications.geojson.js
//
// router.get(
// 	'/geojson',
// 	normaliseArrayQueryParams(['stage', 'region', 'sector']),
// 	asyncRoute(getApplicationsGeoJSON)
// );
router.get('/:caseReference', validateRequestWithOpenAPI, getApplicationsRoute);
router.get(
	'',
	parseIntegerQueryParams(['page', 'size']),
	parseBooleanQueryParams(['excludeNullDateOfSubmission']),
	normaliseArrayQueryParams(['stage', 'region', 'sector']),
	validateRequestWithOpenAPI,
	asyncRoute(applicationsController.getAllApplications)
);

module.exports = router;
