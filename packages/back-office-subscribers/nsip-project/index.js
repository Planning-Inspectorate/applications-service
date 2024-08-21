const pick = require('lodash.pick');
const { prismaClient } = require('../lib/prisma');
const buildMergeQuery = require('../lib/build-merge-query');
const { serviceUserQuery } = require('../lib/queries');

module.exports = async (context, message) => {
	context.log(`invoking nsip-project function`);
	const caseReference = message.caseReference;

	if (!caseReference) {
		throw new Error('caseReference is required');
	}

	if (!message.applicantId) {
		throw new Error('applicantId is required');
	}

	await prismaClient.$executeRawUnsafe(serviceUserQuery, message.applicantId);
	context.log(`created applicant with serviceUserId ${message.applicantId}`);

	const project = {
		...pick(message, projectPropertiesFromMessage),
		regions: Array.isArray(message.regions) ? message.regions.join(',') : null,
		applicantId: message.applicantId,
		modifiedAt: new Date()
	};

	const { statement, parameters } = buildMergeQuery(
		'project',
		'caseReference',
		project,
		context.bindingData.enqueuedTimeUtc
	);

	await prismaClient.$executeRawUnsafe(statement, ...parameters);
	context.log(`upserted project with caseReference ${caseReference}`);
};

const projectPropertiesFromMessage = [
	'caseId',
	'caseReference',
	'projectName',
	'projectNameWelsh',
	'projectDescription',
	'projectDescriptionWelsh',
	'publishStatus',
	'sector',
	'projectType',
	'sourceSystem',
	'stage',
	'projectLocation',
	'projectLocationWelsh',
	'projectEmailAddress',
	'regions',
	'transboundary',
	'easting',
	'northing',
	'welshLanguage',
	'mapZoomLevel',
	'secretaryOfState',
	'dateProjectAppearsOnWebsite',
	'dateOfDCOAcceptance',
	'dateOfNonAcceptance',
	'dateIAPIDue',
	'notificationDateForEventsDeveloper',
	'notificationDateForPMAndEventsDirectlyFollowingPM',
	'rule6LetterPublishDate',
	'rule8LetterPublishDate',
	'anticipatedDateOfSubmission',
	'anticipatedSubmissionDateNonSpecific',
	'dateOfDCOSubmission',
	'dateOfRepresentationPeriodOpen',
	'dateOfRelevantRepresentationClose',
	'dateRRepAppearOnWebsite',
	'dateOfReOpenRelevantRepresentationStart',
	'dateOfReOpenRelevantRepresentationClose',
	'confirmedStartOfExamination',
	'dateTimeExaminationEnds',
	'stage4ExtensionToExamCloseDate',
	'stage5ExtensionToRecommendationDeadline',
	'dateOfRecommendations',
	'confirmedDateOfDecision',
	'stage5ExtensionToDecisionDeadline',
	'dateProjectWithdrawn',
	'section46Notification',
	'datePINSFirstNotifiedOfProject',
	'screeningOpinionSought',
	'screeningOpinionIssued',
	'scopingOpinionSought',
	'scopingOpinionIssued',
	'deadlineForAcceptanceDecision',
	'dateSection58NoticeReceived',
	'preliminaryMeetingStartDate',
	'deadlineForCloseOfExamination',
	'deadlineForSubmissionOfRecommendation',
	'deadlineForDecision',
	'jRPeriodEndDate',
	'extensionToDateRelevantRepresentationsClose',
	'examinationTimetableId',
	'isMaterialChange'
];
