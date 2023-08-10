const express = require('express');

const documentsV3Controller = require('../controllers/documents.v3');
const { validateRequestWithOpenAPI } = require('../middleware/validator/openapi');
const config = require('../lib/config');
const { asyncRoute } = require('@pins/common/src/utils/async-route');

const router = express.Router();

router.get(
	'/:caseReference',
	validateRequestWithOpenAPI,
	asyncRoute(documentsV3Controller.getDocumentByCaseReference)
);

const getDocumentsRoute = (req, res, next) => {
	const backOfficeCaseReferences =
		config.backOfficeIntegration.documents.getDocuments.caseReferences || [];

	const route = backOfficeCaseReferences.includes(req.body.caseReference)
		? documentsV3Controller.getBackOfficeDocuments
		: documentsV3Controller.getNIDocuments;

	return asyncRoute(route)(req, res, next);
};

router.post('', validateRequestWithOpenAPI, getDocumentsRoute);

module.exports = router;
