const express = require('express');
const { asyncRoute } = require('@pins/common/src/utils/async-route');
const { getProjectUpdates, deleteProjectUpdate } = require('../controllers/project-updates');
const { validateRequestWithOpenAPI } = require('../middleware/validator/openapi');
const { parseIntegerParam } = require('../middleware/parseFormDataProperties');

const router = express.Router();

router.get('/:caseReference', validateRequestWithOpenAPI, asyncRoute(getProjectUpdates));
router.delete(
	'/:projectUpdateId',
	parseIntegerParam('projectUpdateId'),
	validateRequestWithOpenAPI,
	asyncRoute(deleteProjectUpdate)
);

module.exports = router;
