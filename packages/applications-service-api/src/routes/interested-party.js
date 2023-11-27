const express = require('express');

const interestedPartyController = require('../controllers/interested-party');
const { asyncRoute } = require('@pins/common/src/utils/async-route');

const router = express.Router();

router.post('/', asyncRoute(interestedPartyController.createInterestedParty));

module.exports = router;
