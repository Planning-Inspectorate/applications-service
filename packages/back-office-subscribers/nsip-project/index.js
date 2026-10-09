const pick = require('lodash.pick');
const { prismaClient } = require('../lib/prisma');
const buildMergeQuery = require('../lib/build-merge-query');
const { serviceUserQuery } = require('../lib/queries');
const axios = require('axios');

module.exports = async (context, message) => {
	const caseReference = message.caseReference;

	if (!caseReference) {
		throw new Error(`caseReference is required for nsip-project function`, {
			correlationId: message.correlationId
		});
	}

	if (!message.applicantId) {
		throw new Error(`applicantId is required for nsip-project function`, {
			correlationId: message.correlationId
		});
	}

	context.log(`invoking nsip-project function for caseReference: ${caseReference}`);

	await prismaClient.$executeRawUnsafe(serviceUserQuery, message.applicantId);
	context.log(
		`created applicant with serviceUserId ${message.applicantId} for caseReference: ${caseReference}`
	);

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

	context.log(`nsip-project function upserted project with caseReference ${caseReference}`);
	context.log(`clearing project data cache for caseRef ${caseReference}...`);

	const cacheKeyPattern = `cache:${caseReference}:projectData:*`;
	const url = `${process.env.APPLICATIONS_SERVICE_API_URL}/api/v1/cache/clear?pattern=${cacheKeyPattern}`;

	const { data: cacheClearResponse } = await axios.delete(url);

	context.log(JSON.stringify(cacheClearResponse, null, 2));
	context.log(`project data cache cleared for caseRef ${caseReference}`);
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
	'subProjectType',
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
