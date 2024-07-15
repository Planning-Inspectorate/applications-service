const express = require('express');

const {
	validateNotEmpty,
	validateNotEmptyAndLength,
	emailValidationRules
} = require('../../validators/shared');

const { validateApplicant } = require('./applicant/_utils/validate-applicant');
const {
	validateHasInterestedPartyNumber
} = require('../../validators/examination/has-interested-party-number');
const { validateNameAgent } = require('./name/_validators/validate-name-agent');
const { validateNameMyself } = require('./name/_validators/validate-name-myself');
const { validateNameOrganisation } = require('./name/_validators/validate-name-organisation');
const { validateSubmittingFor } = require('./submitting-for/utils/validate-submitting-for');
const {
	validateYourInterestedPartyNumber
} = require('../../validators/examination/your-interested-party-number');

const { validationErrorHandler } = require('../../validators/validation-error-handler');

const { forwardView } = require('../../middleware/forward-view');
const {
	unsetEditModeSubmissionItemId
} = require('../../middleware/unset-edit-mode-submission-item-id');

const { decodeUri } = require('../../middleware/decode-uri');
const { projectsMiddleware } = require('../projects/_middleware/middleware');
const {
	addCommonTranslationsMiddleware
} = require('../../pages/_middleware/i18n/add-common-translations-middleware');
const {
	addExaminationTranslationsMiddleware
} = require('./_middleware/add-examination-translations-middleware');

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
				submissionComplete,
				submissionError
			}
		}
	}
} = require('../../routes/config');

const { getApplicant, postApplicant } = require('./applicant/controller');
const {
	getCheckSubmissionItem,
	postCheckSubmissionItem
} = require('./check-submission-item/controller');
const { getCheckYourAnswers } = require('./check-your-answers/controller');
const { getEmail, postEmail } = require('./email/controller');
const { getEnterComment, postEnterComment } = require('./enter-comment/controller');
const { getEvidenceOrComment, postEvidenceOrComment } = require('./evidence-or-comment/controller');
const {
	getHasInterestedPartyNumber,
	postHasInterestedPartyNumber
} = require('./has-interested-party-number/controller');
const { getHaveYourSay } = require('./have-your-say/controller');
const { getName, postName } = require('./name/controller');
const {
	getPersonalInformation,
	postPersonalInformation
} = require('./personal-information/controller');
const {
	getPersonalInformationWhich,
	postPersonalInformationWhich
} = require('./personal-information-which/controller');
const { getSelectDeadline, postSelectDeadline } = require('./select-deadline/controller');
const { getSelectFile, postSelectFile } = require('./select-file/controller');
const { getSubmittingFor, postSubmittingFor } = require('./submitting-for/controller');
const {
	getYourInterestedPartyNumber,
	postYourInterestedPartyNumber
} = require('./your-interested-party-number/controller');
const {
	getAddAnotherDeadlineItem,
	postAddAnotherDeadlineItem,
	postChangeADeadlineItem
} = require('./add-another-deadline-item/controller');

const {
	getSelectIfYouWantToDeleteData,
	postSelectIfYouWantToDeleteData,
	postMarkDeadlineItemForDelete
} = require('./select-if-want-to-delete-data/controller');
const { getProcessSubmission, postProcessSubmission } = require('./process-submission/controller');
const { getSubmissionComplete } = require('./submission-complete/controller');
const { getSubmissionError } = require('./submission-error/controller');
const chooseDeadlineRouter = require('./choose-deadline/router');

const router = express.Router({ mergeParams: true });

router.use(addCommonTranslationsMiddleware, addExaminationTranslationsMiddleware);

router.get(`/${applicant.route}`, getApplicant);
router.post(`/${applicant.route}`, validateApplicant(), validationErrorHandler, postApplicant);

router.get(`/${checkSubmissionItem.route}`, getCheckSubmissionItem);
router.post(`/${checkSubmissionItem.route}`, postCheckSubmissionItem);

router.get(`/${checkYourAnswers.route}`, getCheckYourAnswers);

router.get(`/${haveYourSay.route}`, projectsMiddleware, getHaveYourSay);

router.get(`/${email.route}`, getEmail);
router.post(
	`/${email.route}`,
	addCommonTranslationsMiddleware,
	emailValidationRules(email),
	validationErrorHandler,
	postEmail
);

router.get(`/${evidenceOrComment.route}`, getEvidenceOrComment);
router.post(
	`/${evidenceOrComment.route}`,
	validateNotEmpty(evidenceOrComment),
	validationErrorHandler,
	postEvidenceOrComment
);

router.get(`/${enterComment.route}`, getEnterComment);
router.post(
	`/${enterComment.route}`,
	decodeUri('body', [enterComment.id]),
	validateNotEmptyAndLength(enterComment),
	validationErrorHandler,
	postEnterComment
);

router.get(`/${hasInterestedPartyNumber.route}`, getHasInterestedPartyNumber);
router.post(
	`/${hasInterestedPartyNumber.route}`,
	validateHasInterestedPartyNumber(hasInterestedPartyNumber),
	validationErrorHandler,
	postHasInterestedPartyNumber
);

router.get(`/${nameAgent.route}`, forwardView(nameAgent), getName);
router.post(
	`/${nameAgent.route}`,
	decodeUri('body', [nameAgent.id]),
	validateNameAgent(nameAgent.id),
	validationErrorHandler,
	forwardView(nameAgent),
	postName
);

router.get(`/${nameMyself.route}`, forwardView(nameMyself), getName);
router.post(
	`/${nameMyself.route}`,
	decodeUri('body', [nameMyself.id]),
	validateNameMyself(nameMyself.id),
	validationErrorHandler,
	forwardView(nameMyself),
	postName
);

router.get(`/${nameOrganisation.route}`, forwardView(nameOrganisation), getName);
router.post(
	`/${nameOrganisation.route}`,
	decodeUri('body', [nameOrganisation.id]),
	validateNameOrganisation(nameOrganisation.id),
	validationErrorHandler,
	forwardView(nameOrganisation),
	postName
);

router.get(
	`/${personalInformationComment.route}`,
	forwardView(personalInformationComment),
	getPersonalInformation
);
router.post(
	`/${personalInformationComment.route}`,
	validateNotEmpty(personalInformationComment),
	validationErrorHandler,
	forwardView(personalInformationComment),
	postPersonalInformation
);

router.get(
	`/${personalInformationCommentFiles.route}`,
	forwardView(personalInformationCommentFiles),
	getPersonalInformation
);
router.post(
	`/${personalInformationCommentFiles.route}`,
	validateNotEmpty(personalInformationCommentFiles),
	validationErrorHandler,
	forwardView(personalInformationCommentFiles),
	postPersonalInformation
);

router.get(
	`/${personalInformationFiles.route}`,
	forwardView(personalInformationFiles),
	getPersonalInformation
);
router.post(
	`/${personalInformationFiles.route}`,
	validateNotEmpty(personalInformationFiles),
	validationErrorHandler,
	forwardView(personalInformationFiles),
	postPersonalInformation
);

router.get(
	`/${personalInformationWhichCommentFiles.route}`,
	forwardView(personalInformationWhichCommentFiles),
	getPersonalInformationWhich
);
router.post(
	`/${personalInformationWhichCommentFiles.route}`,
	validateNotEmpty(personalInformationWhichCommentFiles),
	validationErrorHandler,
	forwardView(personalInformationWhichCommentFiles),
	postPersonalInformationWhich
);

router.get(
	`/${personalInformationWhichFiles.route}`,
	forwardView(personalInformationWhichFiles),
	getPersonalInformationWhich
);
router.post(
	`/${personalInformationWhichFiles.route}`,
	validateNotEmpty(personalInformationWhichFiles),
	validationErrorHandler,
	forwardView(personalInformationWhichFiles),
	postPersonalInformationWhich
);

router.get(`/${selectDeadline.route}`, getSelectDeadline);
router.post(
	`/${selectDeadline.route}`,
	validateNotEmpty(selectDeadline),
	validationErrorHandler,
	postSelectDeadline
);

router.get(`/${selectFile.route}`, getSelectFile);
router.post(`/${selectFile.route}`, postSelectFile);

router.get(`/${submittingFor.route}`, getSubmittingFor);
router.post(
	`/${submittingFor.route}`,
	validateSubmittingFor(),
	validationErrorHandler,
	postSubmittingFor
);

router.get(`/${yourInterestedPartyNumber.route}`, getYourInterestedPartyNumber);
router.post(
	`/${yourInterestedPartyNumber.route}`,
	validateYourInterestedPartyNumber(yourInterestedPartyNumber),
	validationErrorHandler,
	postYourInterestedPartyNumber
);

router.get(
	`/${addAnotherDeadlineItem.route}`,
	unsetEditModeSubmissionItemId(),
	getAddAnotherDeadlineItem
);
router.post(`/${addAnotherDeadlineItem.changeADeadlineItem.route}`, postChangeADeadlineItem);
router.post(
	`/${addAnotherDeadlineItem.route}`,
	validateNotEmpty(addAnotherDeadlineItem),
	validationErrorHandler,
	postAddAnotherDeadlineItem
);

router.get(`/${addAnotherDeadlineItem.route}`, getAddAnotherDeadlineItem);
router.post(
	`/${addAnotherDeadlineItem.route}`,
	validateNotEmpty(addAnotherDeadlineItem),
	validationErrorHandler,
	postAddAnotherDeadlineItem
);

router.get(`/${selectIfYouWantToDeleteData.route}`, getSelectIfYouWantToDeleteData);
router.post(
	`/${selectIfYouWantToDeleteData.route}`,
	validateNotEmpty(selectIfYouWantToDeleteData),
	validationErrorHandler,
	postSelectIfYouWantToDeleteData
);

router.post(
	`/${selectIfYouWantToDeleteData.markDeadlineItemForDelete.route}`,
	postMarkDeadlineItemForDelete
);

router.get(`/${processSubmission.route}`, getProcessSubmission);
router.post(`/${processSubmission.route}`, postProcessSubmission);

router.get(`/${submissionComplete.route}`, getSubmissionComplete);
router.get(`/${submissionError.route}`, getSubmissionError);

router.use(chooseDeadlineRouter);

module.exports = router;
