const pick = require('lodash.pick');

module.exports = async (context, message) => {
	context.log(`invoking nsip-project function with message: ${JSON.stringify(message)}`);

	const project = pick(message, [
		'caseId',
		'caseReference',
		'projectName',
		'projectDescription',
		'publishStatus',
		'sector',
		'projectType',
		'sourceSystem',
		'stage',
		'projectLocation',
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
		'examinationTimetableId'
	]);

	context.bindings.project = {
		...project,
		// TODO: store regions in separate table
		regions: Array.isArray(project.regions) ? JSON.stringify(project.regions) : null,
		modifiedAt: new Date()
	};
};
