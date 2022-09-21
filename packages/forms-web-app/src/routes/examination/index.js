const express = require('express');

const {
	validateNotEmpty,
	validateNotEmptyAndLength,
	emailValidationRules
} = require('../../validators/shared/index');
const { validationErrorHandler } = require('../../validators/validation-error-handler');

const {
	routesConfig: {
		examination: {
			pages: {
				applicant,
				checkYourAnswers,
				email,
				haveYourSay,
				hasInterestedPartyNumber,
				submittingFor,
				nameMyself,
				nameOrganisation,
				nameAgent,
				yourInterestedPartyNumber
			}
		}
	}
} = require('../../routes/config');

const { forwardView } = require('../../middleware/forward-view');

const { getApplicant, postApplicant } = require('../../controllers/examination/applicant');
const { getCheckYourAnswers } = require('../../controllers/examination/check-your-answers');
const { getEmail, postEmail } = require('../../controllers/examination/email');
const {
	getHasInterestedPartyNumber,
	postHasInterestedPartyNumber
} = require('../../controllers/examination/has-interested-party-number');
const { getHaveYourSay } = require('../../controllers/examination/have-your-say');
const { getName, postName } = require('../../controllers/examination/name');
const {
	getSubmittingFor,
	postSubmittingFor
} = require('../../controllers/examination/submitting-for');
const {
	getYourInterestedPartyNumber,
	postYourInterestedPartyNumber
} = require('../../controllers/examination/your-interested-party-number');

const router = express.Router();

router.get(applicant.route, getApplicant);
router.post(applicant.route, validateNotEmpty(applicant), validationErrorHandler, postApplicant);

router.get(checkYourAnswers.route, getCheckYourAnswers);
router.get(haveYourSay.route, getHaveYourSay);

router.get(email.route, getEmail);
router.post(email.route, emailValidationRules(email), validationErrorHandler, postEmail);

router.get(hasInterestedPartyNumber.route, getHasInterestedPartyNumber);
router.post(
	hasInterestedPartyNumber.route,
	validateNotEmpty(hasInterestedPartyNumber),
	validationErrorHandler,
	postHasInterestedPartyNumber
);

router.get(nameAgent.route, forwardView(nameAgent), getName);
router.post(
	nameAgent.route,
	validateNotEmptyAndLength(nameAgent),
	validationErrorHandler,
	forwardView(nameAgent),
	postName
);

router.get(nameMyself.route, forwardView(nameMyself), getName);
router.post(
	nameMyself.route,
	validateNotEmptyAndLength(nameMyself),
	validationErrorHandler,
	forwardView(nameMyself),
	postName
);

router.get(nameOrganisation.route, forwardView(nameOrganisation), getName);
router.post(
	nameOrganisation.route,
	validateNotEmptyAndLength(nameOrganisation),
	validationErrorHandler,
	forwardView(nameOrganisation),
	postName
);

router.get(submittingFor.route, getSubmittingFor);
router.post(
	submittingFor.route,
	validateNotEmpty(submittingFor),
	validationErrorHandler,
	postSubmittingFor
);

router.get(yourInterestedPartyNumber.route, getYourInterestedPartyNumber);
router.post(
	yourInterestedPartyNumber.route,
	validateNotEmptyAndLength(yourInterestedPartyNumber),
	validationErrorHandler,
	postYourInterestedPartyNumber
);

module.exports = router;
