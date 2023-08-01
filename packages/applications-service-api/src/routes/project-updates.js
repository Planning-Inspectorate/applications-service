const express = require('express');
const { asyncRoute } = require('@pins/common/src/utils/async-route');
const { getProjectUpdates } = require('../controllers/project-updates');
const { validateRequestWithOpenAPI } = require('../middleware/validator/openapi');

const router = express.Router();

router.get('/:caseReference', validateRequestWithOpenAPI, asyncRoute(getProjectUpdates));

module.exports = router;
