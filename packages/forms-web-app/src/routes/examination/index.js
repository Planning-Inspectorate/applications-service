const express = require('express');

const { validateNotEmpty, validateNotEmptyAndLength } = require('../../validators/shared/index');

const { validationErrorHandler } = require('../../validators/validation-error-handler');

const {
	routesConfig: {
		examination: {
			pages: {
				applicant,
				checkYourAnswers,
				haveYourSay,
				submittingFor,
				nameMyself,
				nameOrganisation,
				nameAgent,
				yourInterestedPartyNumber
			}
		}
	}
} = require('../../routes/config');

const { getApplicant } = require('../../controllers/examination/applicant');
const { getCheckYourAnswers } = require('../../controllers/examination/check-your-answers');
const { getHaveYourSay } = require('../../controllers/examination/have-your-say');

const {
	getSubmittingFor,
	postSubmittingFor
} = require('../../controllers/examination/submitting-for');

const {
	getYourInterestedPartyNumber,
	postYourInterestedPartyNumber
} = require('../../controllers/examination/your-interested-party-number');

const { getName, postName } = require('../../controllers/examination/name');

const router = express.Router();

router.get(applicant.route, getApplicant);
router.get(checkYourAnswers.route, getCheckYourAnswers);
router.get(haveYourSay.route, getHaveYourSay);
router.get(submittingFor.route, getSubmittingFor);
router.get(yourInterestedPartyNumber.route, getYourInterestedPartyNumber);
router.get(nameAgent.route, getName);
router.get(nameOrganisation.route, getName);
router.get(nameMyself.route, getName);

const {
	errorMessage: { notEmpty, checkLength },
	id: yourInterestedPartyNumberId
} = yourInterestedPartyNumber;

router.post(
	yourInterestedPartyNumber.route,
	validateNotEmptyAndLength({
		notEmpty,
		checkLength,
		id: yourInterestedPartyNumberId,
		options: { min: 3, max: 20 }
	}),
	validationErrorHandler,
	postYourInterestedPartyNumber
);

router.post(
	submittingFor.route,
	validateNotEmpty(submittingFor.id, submittingFor.errorMessage),
	validationErrorHandler,
	postSubmittingFor
);

const nameValidationObject = {
	notEmpty: 'Enter your full name',
	checkLength: 'Full name must be between 3 and 64 characters',
	options: {
		min: 3,
		max: 64
	},
	id: 'full-name'
};

router.post(nameAgent.route, postName);
router.post(
	nameMyself.route,
	validateNotEmptyAndLength(nameValidationObject),
	validationErrorHandler,
	postName
);
router.post(nameOrganisation.route, postName);

module.exports = router;
