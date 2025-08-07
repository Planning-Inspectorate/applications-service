const express = require('express');
const documentsV3Controller = require('../controllers/documents.v3');
const { validateRequestWithOpenAPI } = require('../middleware/validator/openapi');
const { isBackOfficeCaseReference } = require('../utils/is-backoffice-case-reference');
const { asyncRoute } = require('@pins/common/src/utils/async-route');

const router = express.Router();

router.get(
	'/:caseReference',
	validateRequestWithOpenAPI,
	asyncRoute(documentsV3Controller.getDocumentByCaseReference)
);

router.get(
	'/short-link/:docRef',
	validateRequestWithOpenAPI,
	asyncRoute(documentsV3Controller.getDocumentLinkByDocumentReference)
);

const getDocumentsRoute = (req, res, next) => {
	const route = isBackOfficeCaseReference(req.body.caseReference)
		? documentsV3Controller.getBackOfficeDocuments
		: documentsV3Controller.getNIDocuments;

	return asyncRoute(route)(req, res, next);
};

router.post('', validateRequestWithOpenAPI, getDocumentsRoute);

module.exports = router;
