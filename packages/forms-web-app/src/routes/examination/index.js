const express = require('express');
const { rules: validateFullName } = require('../../validators/shared/full-name');

const {
	validateInterestedPartyNumber
} = require('../../validators/shared/interested-party-number');

const { validationErrorHandler } = require('../../validators/validation-error-handler');

const {
	routesConfig: {
		examination: {
			pages: { haveYourSay, submittingFor, yourInterestedPartyNumber, yourName }
		}
	}
} = require('../../routes/config');

const { getHaveYourSay } = require('../../controllers/examination/have-your-say');

const {
	getSubmittingFor,
	postSubmittingFor
} = require('../../controllers/examination/submitting-for');

const {
	getYourInterestedPartyNumber,
	postYourInterestedPartyNumber
} = require('../../controllers/examination/your-interested-party-number');

const { getYourName, postYourName } = require('../../controllers/examination/your-name');

const router = express.Router();

router.get(haveYourSay.route, getHaveYourSay);
router.get(submittingFor.route, getSubmittingFor);
router.get(yourInterestedPartyNumber.route, getYourInterestedPartyNumber);
router.post(
	yourInterestedPartyNumber.route,
	validateInterestedPartyNumber(),
	validationErrorHandler,
	postYourInterestedPartyNumber
);
router.post(submittingFor.route, postSubmittingFor);
router.get(yourName.route, getYourName);
router.post(yourName.route, validateFullName(), validationErrorHandler, postYourName);

module.exports = router;
