const express = require('express');

const representationsController = require('../controllers/representations');
const { asyncRoute } = require('@pins/common/src/utils/async-route');
const { validateRequestWithOpenAPI } = require('../middleware/validator/openapi');
const {
	parseIntegerPathParams,
	parseIntegerQueryParams,
	normaliseArrayQueryParams
} = require('../middleware/parseParamProperties');

const router = express.Router();

router.get(
	'/:id',
	parseIntegerPathParams(['id']),
	validateRequestWithOpenAPI,
	asyncRoute(representationsController.getRepresentationById)
);
router.get(
	'/',
	parseIntegerQueryParams(['page', 'size']),
	normaliseArrayQueryParams(['type']),
	validateRequestWithOpenAPI,
	asyncRoute(representationsController.getRepresentationsForApplication)
);

module.exports = router;
