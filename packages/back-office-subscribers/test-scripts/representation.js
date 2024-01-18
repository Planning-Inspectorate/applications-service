const sendRepresentationMessage = require('../nsip-representation');

const context = {
	log: () => {},
	bindingData: {
		enqueuedTimeUtc: new Date().toUTCString()
	}
};

const generateNRepresentationMessages = (n) => {
	const representations = [];
	for (let i = 1; i <= n; i++) {
		let representation = {
			representationId: i,
			caseRef: 'BC0110001',
			caseId: 123,
			referenceId: 'reference-id',
			status: 'published',
			dateReceived: new Date('2023-01-01T09:00:00.000Z'),
			redacted: false,
			redactedRepresentation: 'redacted-representation',
			originalRepresentation: 'original-representation',
			representationFrom: 'PERSON',
			representationType: 'Local Authorities',
			registerFor: 'ORGANISATION',
			representedId: `represented-${i}`,
			representativeId: `representative-${i}`,
			attachmentIds: ['123', '456']
		};
		representations.push(representation);
	}
	return representations;
};

async function run(n) {
	const representationMessages = generateNRepresentationMessages(n);

	await Promise.all([
		...representationMessages.map((message) => sendRepresentationMessage(context, message))
	]);
}

const num = process.argv[2] || 50;
run(num).catch((err) => console.error(err));
