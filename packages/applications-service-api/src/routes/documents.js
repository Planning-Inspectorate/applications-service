const express = require('express');
const { getDocumentByCaseReference, getDocuments } = require('../controllers/documents');
const { validateRequestWithOpenAPI } = require('../middleware/validator/openapi');
const { asyncRoute } = require('@pins/common/src/utils/async-route');

const router = express.Router();

router.get('/:caseReference', validateRequestWithOpenAPI, asyncRoute(getDocumentByCaseReference));

router.post('', validateRequestWithOpenAPI, asyncRoute(getDocuments));

module.exports = router;
