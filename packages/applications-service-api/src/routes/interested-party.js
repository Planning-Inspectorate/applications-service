const express = require('express');

const interestedPartyController = require('../controllers/interested-party');
const { asyncRoute } = require('@pins/common/src/utils/async-route');
const { validateRequestWithOpenAPI } = require('../middleware/validator/openapi');

const router = express.Router();

router.post(
	'/',
	validateRequestWithOpenAPI,
	asyncRoute(interestedPartyController.createInterestedParty)
);

module.exports = router;
