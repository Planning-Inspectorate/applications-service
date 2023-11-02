const pick = require('lodash.pick');
const { prismaClient } = require('../lib/prisma');

module.exports = async (context, message) => {
	context.log(`invoking nsip-project function`);
	const caseReference = message.caseReference;

	if (!caseReference) {
		context.log(`skipping update as caseReference is missing`);
		return;
	}

	return await prismaClient.$transaction(async (tx) => {
		const existingProject = await tx.project.findUnique({
			where: {
				caseReference
			}
		});

		const shouldUpdate =
			!existingProject ||
			new Date(context.bindingData.enqueuedTimeUtc) >
				new Date(existingProject.modifiedAt.toUTCString());

		if (shouldUpdate) {
			let project = pick(message, projectPropertiesFromMessage);
			project = {
				...project,
				regions: Array.isArray(project.regions) ? JSON.stringify(project.regions) : null,
				modifiedAt: new Date()
			};
			await tx.project.upsert({
				where: {
					caseReference
				},
				update: project,
				create: project
			});
			context.log(`upserted project with caseReference: ${caseReference}`);
		} else {
			context.log(`skipping update of project with caseReference: ${caseReference}`);
		}
	});
};

const projectPropertiesFromMessage = [
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
];
