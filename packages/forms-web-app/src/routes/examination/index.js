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
				enterComment,
				evidenceOrComment,
				enterAComment,
				haveYourSay,
				hasInterestedPartyNumber,
				nameMyself,
				nameOrganisation,
				nameAgent,
				selectDeadline,
				selectFile,
				submittingFor,
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
	getEnterComment,
	postEnterComment
} = require('../../controllers/examination/enter-comment');
const {
	getEvidenceOrComment,
	postEvidenceOrComment
} = require('../../controllers/examination/evidence-or-comment');

const {
	getHasInterestedPartyNumber,
	postHasInterestedPartyNumber
} = require('../../controllers/examination/has-interested-party-number');
const { getHaveYourSay } = require('../../controllers/examination/have-your-say');
const { getName, postName } = require('../../controllers/examination/name');
const {
	getSelectDeadline,
	postSelectDeadline
} = require('../../controllers/examination/select-deadline');
const { getSelectFile, postSelectFile } = require('../../controllers/examination/select-file');
const {
	getSubmittingFor,
	postSubmittingFor
} = require('../../controllers/examination/submitting-for');
const {
	getYourInterestedPartyNumber,
	postYourInterestedPartyNumber
} = require('../../controllers/examination/your-interested-party-number');
const {
	getEnterAComment,
	postEnterAComment
} = require('../../controllers/examination/enter-a-comment');

const router = express.Router();

router.get(applicant.route, getApplicant);
router.post(applicant.route, validateNotEmpty(applicant), validationErrorHandler, postApplicant);

router.get(checkYourAnswers.route, getCheckYourAnswers);

router.get(haveYourSay.route, getHaveYourSay);

router.get(email.route, getEmail);
router.post(email.route, emailValidationRules(email), validationErrorHandler, postEmail);

router.get(enterComment.route, getEnterComment);
router.post(enterComment.route, postEnterComment);

router.get(evidenceOrComment.route, getEvidenceOrComment);
router.post(
	evidenceOrComment.route,
	validateNotEmpty(evidenceOrComment),
	validationErrorHandler,
	postEvidenceOrComment
);

router.get(enterAComment.route, getEnterAComment);
router.post(enterAComment.route, postEnterAComment);

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

router.get(selectDeadline.route, getSelectDeadline);
router.post(
	selectDeadline.route,
	validateNotEmpty(selectDeadline),
	validationErrorHandler,
	postSelectDeadline
);

router.get(selectFile.route, getSelectFile);
router.post(selectFile.route, postSelectFile);

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
