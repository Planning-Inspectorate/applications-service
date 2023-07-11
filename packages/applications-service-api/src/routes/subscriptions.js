const express = require('express');
const { validateRequestWithOpenAPI } = require('../middleware/validator/openapi');
const { createSubscription, confirmSubscription } = require('../controllers/subscriptions');
const { asyncRoute } = require('@pins/common/src/utils/async-route');

const router = express.Router();

router.post('/:caseReference', validateRequestWithOpenAPI, asyncRoute(createSubscription));
router.put('/:caseReference', validateRequestWithOpenAPI, asyncRoute(confirmSubscription));

module.exports = router;
