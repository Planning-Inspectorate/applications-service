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
			dateOfNonAcceptance: new Date('2021-06-10'),
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

	await prismaClient.projectUpdate.upsert({
		where: { projectUpdateId: 1 },
		update: {},
		create: {
			projectUpdateId: 1,
			caseReference: 'BC0110001',
			updateDate: '2023-06-10',
			updateName: 'Case update',
			updateContentEnglish: 'The application has been accepted for examination.',
			updateContentWelsh: 'Mae’r cais wedi’i dderbyn i’w archwilio.',
			updateStatus: 'Published'
		}
	});

	await prismaClient.projectUpdate.upsert({
		where: { projectUpdateId: 2 },
		update: {},
		create: {
			projectUpdateId: 2,
			caseReference: 'BC0110001',
			updateDate: '2023-07-21',
			updateName: 'Case update',
			updateContentEnglish:
				'The applicant has agreed that all application documents can be published as soon as practicable to help everyone become familiar with the detail of what is being proposed in this application. The Planning Inspectorate will therefore make the application documents available as soon as practicable. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.',
			updateContentWelsh:
				'Mae’r ymgeisydd wedi cytuno y gellir cyhoeddi’r holl ddogfennau cais cyn gynted ag y bo’n ymarferol er mwyn helpu pawb i ddod yn gyfarwydd â manylion yr hyn a gynigir yn y cais hwn. Bydd yr Arolygiaeth Gynllunio felly yn sicrhau bod dogfennau’r cais ar gael cyn gynted ag y bo’n ymarferol. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.',
			updateStatus: 'Published'
		}
	});

	await prismaClient.projectUpdate.upsert({
		where: { projectUpdateId: 3 },
		update: {},
		create: {
			// exam
			projectUpdateId: 3,
			caseReference: 'BC0110001',
			updateDate: '2023-08-04',
			updateName: 'Case update',
			updateContentEnglish: `this is a test of the html project update that should be able to handle:
				<ul>
					<li>unordered lists</li>
					<li><b>bold text</b></li>
					<li>and <a href="#">links</a></li>
				</ul>`,
			updateContentWelsh: `WELSH: this is a test of the html project update that should be able to handle:
				<ul>
					<li>unordered lists</li>
					<li><b>bold text</b></li>
					<li>and <a href="#">links</a></li>
				</ul>`,
			updateStatus: 'Published'
		}
	});

	// Delete any existing timetable events
	await prismaClient.examinationTimetableEventItem.deleteMany();
	await prismaClient.examinationTimetable.deleteMany();

	// Exam Preliminary Meeting
	await createExaminationTimetableWithEventItems({
		eventId: 1,
		examinationTimetableId: 1,
		type: 'Preliminary Meeting',
		eventTitle: 'Example Preliminary Meeting',
		description: 'A preliminary meeting will be held to discuss the examination process.',
		eventDeadlineStartDate: '2023-06-10',
		date: '2023-07-10',
		eventItemDescriptions: ['Item 1 Preliminary Description', 'Item 2 Preliminary Description']
	});

	// Exam Deadline
	await createExaminationTimetableWithEventItems({
		examinationTimetableId: 1,
		eventId: 2,
		type: 'Deadline',
		eventTitle: 'Deadline Event',
		description: 'A deadline meeting description',
		eventDeadlineStartDate: '2023-06-10',
		date: '2025-05-10',
		eventItemDescriptions: ['Item 1 Deadline Description', 'Item 2 Deadline Description']
	});
};

async function createExaminationTimetableWithEventItems(data) {
	await prismaClient.examinationTimetable.create({
		data: {
			caseReference: 'BC0110001',
			eventId: data.eventId,
			type: data.type,
			eventTitle: data.eventTitle,
			description: data.description,
			eventDeadlineStartDate: new Date(data.eventDeadlineStartDate),
			date: new Date(data.date),
			eventLineItems: {
				create: data.eventItemDescriptions.map((description) => ({
					eventLineItemDescription: description
				}))
			}
		}
	});
}

main()
	.then(async () => {
		await prismaClient.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prismaClient.$disconnect();
		process.exit(1);
	});
