const express = require('express');

const {
	validateInterestedPartyNumber
} = require('../../validators/shared/interested-party-number');

const { rules: validateFullName } = require('../../validators/shared/full-name');
const { rules: validateNotEmpty } = require('../../validators/shared/not-empty');
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

router.post(
	yourInterestedPartyNumber.route,
	validateInterestedPartyNumber(),
	validationErrorHandler,
	postYourInterestedPartyNumber
);

router.post(
	submittingFor.route,
	validateNotEmpty(submittingFor.id, submittingFor.errorMessage),
	validationErrorHandler,
	postSubmittingFor
);

router.post(nameAgent.route, postName);
router.post(nameMyself.route, validateFullName(), validationErrorHandler, postName);
router.post(nameOrganisation.route, postName);

module.exports = router;
