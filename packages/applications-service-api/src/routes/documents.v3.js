const express = require('express');

const documentsV3Controller = require('../controllers/documents.v3');
const { validateRequestWithOpenAPI } = require('../middleware/validator/openapi');

const router = express.Router();

router.post('', validateRequestWithOpenAPI, documentsV3Controller.getDocuments);

module.exports = router;
