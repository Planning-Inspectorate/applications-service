const { prismaClient } = require('../lib/prisma');

module.exports = async (context, message) => {
	context.log(`invoking nsip-project-spike function with message: ${JSON.stringify(message)}`);

	const messageTime = new Date(context.bindingData.enqueuedTimeUtc);

	// Table 1: Project Update
	const newProjectUpdate = message.projectUpdate;

	const projectUpdateRecord = await prismaClient.projectUpdate.findUnique({
		where: {
			projectUpdateId: newProjectUpdate.projectUpdateId
		}
	});

	context.log({
		projectUpdateRecord
	});
	// If projectUpdateRecord doesn't exist or messageTime is newer than modifiedAt, then upsert
	if (!projectUpdateRecord || messageTime > new Date(projectUpdateRecord.modifiedAt)) {
		await prismaClient.projectUpdate.upsert({
			where: {
				projectUpdateId: newProjectUpdate.projectUpdateId
			},
			update: {
				...newProjectUpdate,
				modifiedAt: messageTime
			},
			create: {
				...newProjectUpdate,
				modifiedAt: messageTime
			}
		});
	}
	// Table 2: Document
	const newDocument = message.document;

	const documentRecord = await prismaClient.document.findUnique({
		where: {
			documentId: newDocument.documentId
		}
	});

	// If documentRecord doesn't exist or messageTime is newer than modifiedAt, then upsert
	if (!documentRecord || messageTime > new Date(documentRecord.modifiedAt)) {
		await prismaClient.document.upsert({
			where: {
				documentId: newDocument.documentId
			},
			update: {
				...newDocument,
				modifiedAt: messageTime
			},
			create: {
				...newDocument,
				modifiedAt: messageTime
			}
		});
	}
};

// Run the below to get the payload for request
// this is only here for the spike
const message = {
	document: {
		documentId: '130ce4ec-e790-43e0-ae25-0703c81cb9b2',
		caseId: 1,
		caseRef: 'EN010120',
		documentReference: 'abcdef',
		version: 1,
		examinationRefNo: 'dunno',
		filename: 'a.pdf',
		originalFilename: 'a.pdf',
		size: 1,
		mime: 'application/pdf',
		documentURI: 'https://example.org/a.pdf',
		publishedDocumentURI: 'https://example.org/published/a.pdf',
		virusCheckStatus: 'looks legit',
		fileMD5: 'b57987f7594c89366f7183ee9b7ae6b2',
		dateCreated: '2023-03-26T00:00:00.000',
		lastModified: '2023-03-26T00:00:00.000',
		caseType: 'nsip',
		documentStatus: 'submitted',
		redactedStatus: 'redacted',
		publishedStatus: 'published',
		datePublished: '2023-03-26T00:00:00.000',
		documentType: null,
		securityClassification: 'public',
		sourceSystem: 'back_office',
		origin: 'pins',
		owner: 'someone',
		author: 'someone',
		representative: 'some agency',
		description: 'this is a description',
		stage: 'decision',
		filter1: 'Deadline 2',
		filter2: 'Scoping Option Report'
	},
	projectUpdate: {
		projectUpdateId: 1011,
		caseReference: 'AB0000002',
		updateDate: '2023-07-28',
		updateName: 'July Update',
		updateContentEnglish: 'this is an update',
		updateContentWelsh: 'diweddariad yw hwn',
		updateStatus: 'published'
	}
};
const stringMessage = JSON.stringify(message);
const escapedMessage = stringMessage.replace(/"/g, '\\"');
console.log(escapedMessage);
