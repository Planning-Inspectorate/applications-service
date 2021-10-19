
const express = require('express');

const interestedPartyController = require('../../controllers/interested-party-guide/interested-party');
const { validationErrorHandler } = require('../../validators/validation-error-handler');

const {
    rules: interestedPartyRules,
  } = require('../../validators/interested-party-guide/interested-party');

const router = express.Router();

router.get('/interested-party', interestedPartyController.getInterestedParty);

router.post(
    '/interested-party',
    interestedPartyRules(),
    validationErrorHandler,
    interestedPartyController.postInterestedParty
  );

module.exports = router;