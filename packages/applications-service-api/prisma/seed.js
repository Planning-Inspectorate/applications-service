const { prismaClient } = require('../src/lib/prisma');

const main = async () => {
	await prismaClient.project.upsert({
		where: { caseReference: 'BC0110001' },
		update: {},
		create: {
			caseId: 130,
			caseReference: 'BC0110001',
			projectName: 'Office Use Test Application 1',
			projectDescription:
				'A description of test case 1 which is a case of subsector type Office Use',
			publishStatus: 'published',
			sector: 'BC - Business and Commercial',
			projectType: 'BC01 - Office Use',
			sourceSystem: 'ODT',
			stage: 'pre_application',
			projectLocation: null,
			projectEmailAddress: 'BC0110001@example.org',
			regions: 'south_west',
			transboundary: null,
			easting: null,
			northing: null,
			welshLanguage: null,
			mapZoomLevel: 'none',
			secretaryOfState: null,
			dateProjectAppearsOnWebsite: null,
			dateOfDCOAcceptance: null,
			anticipatedDateOfSubmission: null,
			anticipatedSubmissionDateNonSpecific: null,
			dateOfDCOSubmission: null,
			dateOfRepresentationPeriodOpen: null,
			dateOfRelevantRepresentationClose: null,
			dateRRepAppearOnWebsite: null,
			confirmedStartOfExamination: null,
			dateTimeExaminationEnds: null,
			stage4ExtensionToExamCloseDate: null,
			stage5ExtensionToRecommendationDeadline: null,
			dateOfRecommendations: null,
			confirmedDateOfDecision: null,
			stage5ExtensionToDecisionDeadline: null,
			dateProjectWithdrawn: null,
			section46Notification: null,
			datePINSFirstNotifiedOfProject: null,
			screeningOpinionSought: null,
			screeningOpinionIssued: null,
			scopingOpinionSought: null,
			scopingOpinionIssued: null,
			deadlineForAcceptanceDecision: null,
			dateSection58NoticeReceived: null,
			preliminaryMeetingStartDate: null,
			deadlineForCloseOfExamination: null,
			deadlineForSubmissionOfRecommendation: null,
			deadlineForDecision: null,
			jRPeriodEndDate: null,
			extensionToDateRelevantRepresentationsClose: null,
			examinationTimetableId: null,
			createdAt: new Date(),
			modifiedAt: new Date()
		}
	});
};

main()
	.then(async () => {
		await prismaClient.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prismaClient.$disconnect();
		process.exit(1);
	});
