module.exports = async (context, message, currentProjectUpdate, currentDocument) => {
	const messageTime = new Date(context.bindingData.enqueuedTimeUtc);
	currentProjectUpdate = currentProjectUpdate[0];
	currentDocument = currentDocument[0];

	context.log({
		message,
		currentProjectUpdate,
		currentDocument,
		messageTime
	});

	// Table One - Project Update
	const newProjectUpdate = message.projectUpdate;

	// note - using dates to ensure we don't process older messages
	if (!newProjectUpdate || messageTime > new Date(newProjectUpdate.modifiedAt)) {
		context.log(`Adding to projectUpdate table`);
		context.bindings.projectUpdate = {
			projectUpdateId: newProjectUpdate.projectUpdateId,
			caseReference: newProjectUpdate.caseReference,
			updateDate: newProjectUpdate.updateDate,
			updateName: newProjectUpdate.updateName,
			updateContentEnglish: newProjectUpdate.updateContentEnglish,
			updateContentWelsh: newProjectUpdate.updateContentWelsh,
			updateStatus: newProjectUpdate.updateStatus,
			modifiedAt: messageTime // Note - using the message time
		};
	}

	// Table Two - Document
	const newDocument = message.document;

	// note - using dates to ensure we don't process older messages
	if (!currentDocument || messageTime > new Date(currentDocument.modifiedAt)) {
		context.log(`Adding to document table`);
		context.bindings.document = {
			documentId: newDocument.documentId,
			caseReference: newDocument.caseReference,
			documentName: newDocument.documentName,
			documentUrl: newDocument.documentUrl,
			documentType: newDocument.documentType,
			documentStatus: newDocument.documentStatus,
			modifiedAt: messageTime // Note - using the message time
		};
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
