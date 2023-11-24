const express = require('express');

const adviceController = require('../controllers/advice');
const { asyncRoute } = require('@pins/common/src/utils/async-route');
const { validateRequestWithOpenAPI } = require('../middleware/validator/openapi');
const { parseIntegerQueryParams } = require('../middleware/parseQueryParamProperties');

const router = express.Router();

router.get('/:adviceID', validateRequestWithOpenAPI, asyncRoute(adviceController.getAdviceById));
router.get(
	'',
	parseIntegerQueryParams(['page', 'size']),
	validateRequestWithOpenAPI,
	asyncRoute(adviceController.getAdvice)
);

module.exports = router;
