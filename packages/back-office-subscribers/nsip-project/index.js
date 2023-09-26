// const pick = require('lodash.pick');
const { prismaClient } = require('@pins/common/src/lib/prisma');

module.exports = async (context, message) => {
	context.log(`invoking nsip-project function with message: ${JSON.stringify(message)}`);

	const project = await prismaClient.project.findUnique({
		where: {
			caseReference: message.caseReference
		}
	});

	context.log(`project details: ${project}`);
	console.log(`project details: ${project}`);

	// const project = pick(message, [
	// 	'caseId',
	// 	'caseReference',
	// 	'projectName',
	// 	'projectDescription',
	// 	'publishStatus',
	// 	'sector',
	// 	'projectType',
	// 	'sourceSystem',
	// 	'stage',
	// 	'projectLocation',
	// 	'projectEmailAddress',
	// 	'transboundary',
	// 	'easting',
	// 	'northing',
	// 	'welshLanguage',
	// 	'mapZoomLevel',
	// 	'secretaryOfState',
	// 	'dateProjectAppearsOnWebsite',
	// 	'dateOfDCOAcceptance',
	// 	'dateOfNonAcceptance',
	// 	'dateIAPIDue',
	// 	'notificationDateForEventsDeveloper',
	// 	'notificationDateForPMAndEventsDirectlyFollowingPM',
	// 	'rule6LetterPublishDate',
	// 	'rule8LetterPublishDate',
	// 	'anticipatedDateOfSubmission',
	// 	'anticipatedSubmissionDateNonSpecific',
	// 	'dateOfDCOSubmission',
	// 	'dateOfRepresentationPeriodOpen',
	// 	'dateOfRelevantRepresentationClose',
	// 	'dateRRepAppearOnWebsite',
	// 	'confirmedStartOfExamination',
	// 	'dateTimeExaminationEnds',
	// 	'stage4ExtensionToExamCloseDate',
	// 	'stage5ExtensionToRecommendationDeadline',
	// 	'dateOfRecommendations',
	// 	'confirmedDateOfDecision',
	// 	'stage5ExtensionToDecisionDeadline',
	// 	'dateProjectWithdrawn',
	// 	'section46Notification',
	// 	'datePINSFirstNotifiedOfProject',
	// 	'screeningOpinionSought',
	// 	'screeningOpinionIssued',
	// 	'scopingOpinionSought',
	// 	'scopingOpinionIssued',
	// 	'deadlineForAcceptanceDecision',
	// 	'dateSection58NoticeReceived',
	// 	'preliminaryMeetingStartDate',
	// 	'deadlineForCloseOfExamination',
	// 	'deadlineForSubmissionOfRecommendation',
	// 	'deadlineForDecision',
	// 	'jRPeriodEndDate',
	// 	'extensionToDateRelevantRepresentationsClose',
	// 	'examinationTimetableId'
	// ]);
	//
	// context.bindings.project = {
	// 	...project,
	// 	modifiedAt: new Date()
	// };
};
