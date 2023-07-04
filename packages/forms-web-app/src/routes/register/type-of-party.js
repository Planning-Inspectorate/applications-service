const express = require('express');

const typeOfPartyController = require('../../controllers/register/type-of-party');
const { validationErrorHandler } = require('../../validators/validation-error-handler');

const { rules: typeOfPartyRules } = require('../../validators/register/type-of-party');

const router = express.Router({ mergeParams: true });

router.get('/who-registering-for', typeOfPartyController.getTypeOfParty);

router.post(
	'/who-registering-for',
	typeOfPartyRules(),
	validationErrorHandler,
	typeOfPartyController.postTypeOfParty
);

module.exports = router;
