const express = require('express');

const typeOfPartyController = require('./type-of-party.controller');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');

const { rules: typeOfPartyRules } = require('./type-of-party.validator');

const router = express.Router();

router.get('/who-registering-for', typeOfPartyController.getTypeOfParty);

router.post(
	'/who-registering-for',
	typeOfPartyRules(),
	validationErrorHandler,
	typeOfPartyController.postTypeOfParty
);

module.exports = router;
