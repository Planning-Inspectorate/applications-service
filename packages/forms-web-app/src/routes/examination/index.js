const express = require('express');
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
				haveAnInterestedPartyNumber,
				nameMyself,
				nameOrganisation,
				nameAgent
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
	getHaveAnInterestedPartyNumber
} = require('../../controllers/examination/have-an-interested-party-number');
const { getName, postName } = require('../../controllers/examination/name');

const router = express.Router();

router.get(applicant.route, getApplicant);
router.get(checkYourAnswers.route, getCheckYourAnswers);
router.get(haveAnInterestedPartyNumber.route, getHaveAnInterestedPartyNumber);
router.get(haveYourSay.route, getHaveYourSay);
router.get(submittingFor.route, getSubmittingFor);
router.post(
	submittingFor.route,
	validateNotEmpty(submittingFor.id, submittingFor.errorMessage),
	validationErrorHandler,
	postSubmittingFor
);
router.get(nameAgent.route, getName);
router.post(nameAgent.route, postName);
router.get(nameMyself.route, getName);
router.post(nameMyself.route, validateFullName(), validationErrorHandler, postName);
router.get(nameOrganisation.route, getName);
router.post(nameOrganisation.route, postName);

module.exports = router;
