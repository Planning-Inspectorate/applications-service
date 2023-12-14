const express = require('express');

const representationsController = require('../controllers/representations');
const { asyncRoute } = require('@pins/common/src/utils/async-route');
const { validateRequestWithOpenAPI } = require('../middleware/validator/openapi');
const { parseIntegerPathParams } = require('../middleware/parseParamProperties');

const router = express.Router();

router.get(
	'/:id',
	parseIntegerPathParams(['id']),
	validateRequestWithOpenAPI,
	asyncRoute(representationsController.getRepresentationById)
);
router.get(
	'/',
	parseIntegerPathParams(['page', 'size']),
	validateRequestWithOpenAPI,
	asyncRoute(representationsController.getRepresentationsForApplication)
);

module.exports = router;
