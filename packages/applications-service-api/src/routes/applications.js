const express = require('express');

const applicationsController = require('../controllers/applications');
const applicationsControllerV2 = require('../controllers/applications.v2');
const { asyncRoute } = require('@pins/common/src/utils/async-route');
const config = require('../lib/config');
const { validateRequestWithOpenAPI } = require('../middleware/validator/openapi');

const router = express.Router();

const getApplicationsRoute = (req, res, next) => {
	const backOfficeCaseReferences =
		config.backOfficeIntegration.applications.getApplication.caseReferences || [];

	const route = backOfficeCaseReferences.includes(req.params.caseReference)
		? applicationsControllerV2.getApplication
		: applicationsController.getApplication;

	return asyncRoute(route)(req, res, next);
};

router.get('/download', applicationsController.getAllApplicationsDownload);
router.get('/:caseReference', validateRequestWithOpenAPI, getApplicationsRoute);
router.get('/', applicationsController.getAllApplications);

module.exports = router;
