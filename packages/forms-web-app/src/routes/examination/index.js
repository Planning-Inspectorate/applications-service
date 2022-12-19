const express = require('express');

const {
	validateNotEmpty,
	validateNotEmptyAndLength,
	emailValidationRules
} = require('../../validators/shared/index');
const { validationErrorHandler } = require('../../validators/validation-error-handler');
const { forwardView } = require('../../middleware/forward-view');
const {
	unsetEditModeSubmissionItemId
} = require('../../middleware/unset-edit-mode-submission-item-id');

const {
	routesConfig: {
		examination: {
			pages: {
				applicant,
				checkSubmissionItem,
				checkYourAnswers,
				email,
				enterComment,
				evidenceOrComment,
				haveYourSay,
				hasInterestedPartyNumber,
				nameMyself,
				nameOrganisation,
				nameAgent,
				personalInformationComment,
				personalInformationCommentFiles,
				personalInformationFiles,
				personalInformationWhichCommentFiles,
				personalInformationWhichFiles,
				selectDeadline,
				selectFile,
				submittingFor,
				yourInterestedPartyNumber,
				addAnotherDeadlineItem,
				selectIfYouWantToDeleteData,
				processSubmission,
				submissionComplete
			}
		}
	}
} = require('../../routes/config');

const { getApplicant, postApplicant } = require('../../controllers/examination/applicant');
const {
	getCheckSubmissionItem,
	postCheckSubmissionItem
} = require('../../controllers/examination/check-submission-item/controller');
const {
	getCheckYourAnswers
} = require('../../controllers/examination/check-your-answers/controller');
const { getEmail, postEmail } = require('../../controllers/examination/email/controller');
const {
	getEnterComment,
	postEnterComment
} = require('../../controllers/examination/enter-comment/controller');
const {
	getEvidenceOrComment,
	postEvidenceOrComment
} = require('../../controllers/examination/evidence-or-comment/controller');
const {
	getHasInterestedPartyNumber,
	postHasInterestedPartyNumber
} = require('../../controllers/examination/has-interested-party-number');
const { getHaveYourSay } = require('../../controllers/examination/have-your-say');
const { getName, postName } = require('../../controllers/examination/name');
const {
	getPersonalInformation,
	postPersonalInformation
} = require('../../controllers/examination/personal-information/controller');
const {
	getPersonalInformationWhich,
	postPersonalInformationWhich
} = require('../../controllers/examination/personal-information-which/controller');
const {
	getSelectDeadline,
	postSelectDeadline
} = require('../../controllers/examination/select-deadline/controller');
const {
	getSelectFile,
	postSelectFile
} = require('../../controllers/examination/select-file/controller');
const {
	getSubmittingFor,
	postSubmittingFor
} = require('../../controllers/examination/submitting-for');
const {
	getYourInterestedPartyNumber,
	postYourInterestedPartyNumber
} = require('../../controllers/examination/your-interested-party-number/controller');
const {
	getAddAnotherDeadlineItem,
	postAddAnotherDeadlineItem,
	postChangeADeadlineItem
} = require('../../controllers/examination/add-another-deadline-item/controller');

const {
	getSelectIfYouWantToDeleteData,
	postSelectIfYouWantToDeleteData,
	postMarkDeadlineItemForDelete
} = require('../../controllers/examination/select-if-want-to-delete-data/controller');
const {
	getProcessSubmission,
	postProcessSubmission
} = require('../../controllers/examination/process-submission/controller');
const {
	getSubmissionComplete
} = require('../../controllers/examination/submission-complete/controller');

const router = express.Router();

router.get(applicant.route, getApplicant);
router.post(applicant.route, validateNotEmpty(applicant), validationErrorHandler, postApplicant);

router.get(checkSubmissionItem.route, getCheckSubmissionItem);
router.post(checkSubmissionItem.route, postCheckSubmissionItem);

router.get(checkYourAnswers.route, getCheckYourAnswers);

router.get(haveYourSay.route, getHaveYourSay);

router.get(email.route, getEmail);
router.post(email.route, emailValidationRules(email), validationErrorHandler, postEmail);

router.get(evidenceOrComment.route, getEvidenceOrComment);
router.post(
	evidenceOrComment.route,
	validateNotEmpty(evidenceOrComment),
	validationErrorHandler,
	postEvidenceOrComment
);

router.get(enterComment.route, getEnterComment);
router.post(
	enterComment.route,
	validateNotEmptyAndLength(enterComment),
	validationErrorHandler,
	postEnterComment
);

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

router.get(
	personalInformationComment.route,
	forwardView(personalInformationComment),
	getPersonalInformation
);
router.post(
	personalInformationComment.route,
	validateNotEmpty(personalInformationComment),
	validationErrorHandler,
	forwardView(personalInformationComment),
	postPersonalInformation
);

router.get(
	personalInformationCommentFiles.route,
	forwardView(personalInformationCommentFiles),
	getPersonalInformation
);
router.post(
	personalInformationCommentFiles.route,
	validateNotEmpty(personalInformationCommentFiles),
	validationErrorHandler,
	forwardView(personalInformationCommentFiles),
	postPersonalInformation
);

router.get(
	personalInformationFiles.route,
	forwardView(personalInformationFiles),
	getPersonalInformation
);
router.post(
	personalInformationFiles.route,
	validateNotEmpty(personalInformationFiles),
	validationErrorHandler,
	forwardView(personalInformationFiles),
	postPersonalInformation
);

router.get(
	personalInformationWhichCommentFiles.route,
	forwardView(personalInformationWhichCommentFiles),
	getPersonalInformationWhich
);
router.post(
	personalInformationWhichCommentFiles.route,
	validateNotEmpty(personalInformationWhichCommentFiles),
	validationErrorHandler,
	forwardView(personalInformationWhichCommentFiles),
	postPersonalInformationWhich
);

router.get(
	personalInformationWhichFiles.route,
	forwardView(personalInformationWhichFiles),
	getPersonalInformationWhich
);
router.post(
	personalInformationWhichFiles.route,
	validateNotEmpty(personalInformationWhichFiles),
	validationErrorHandler,
	forwardView(personalInformationWhichFiles),
	postPersonalInformationWhich
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

router.get(
	addAnotherDeadlineItem.route,
	unsetEditModeSubmissionItemId(),
	getAddAnotherDeadlineItem
);
router.post(addAnotherDeadlineItem.changeADeadlineItem.route, postChangeADeadlineItem);
router.post(
	addAnotherDeadlineItem.route,
	validateNotEmpty(addAnotherDeadlineItem),
	validationErrorHandler,
	postAddAnotherDeadlineItem
);

router.get(addAnotherDeadlineItem.route, getAddAnotherDeadlineItem);
router.post(
	addAnotherDeadlineItem.route,
	validateNotEmpty(addAnotherDeadlineItem),
	validationErrorHandler,
	postAddAnotherDeadlineItem
);

router.get(selectIfYouWantToDeleteData.route, getSelectIfYouWantToDeleteData);
router.post(
	selectIfYouWantToDeleteData.route,
	validateNotEmpty(selectIfYouWantToDeleteData),
	validationErrorHandler,
	postSelectIfYouWantToDeleteData
);

router.post(
	selectIfYouWantToDeleteData.markDeadlineItemForDelete.route,
	postMarkDeadlineItemForDelete
);

router.get(processSubmission.route, getProcessSubmission);
router.post(processSubmission.route, postProcessSubmission);

router.get(submissionComplete.route, getSubmissionComplete);

module.exports = router;
