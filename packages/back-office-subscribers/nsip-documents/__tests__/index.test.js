const subject = require('../index');

describe('nsip-documents', () => {
	const message = {
		documentId: '100000',
		caseRef: 'EN010120',
		documentReference: 'abcdef',
		version: '1',
		examinationRefNo: 'dunno',
		filename: 'a.pdf',
		originalFilename: 'a.pdf',
		size: 1,
		mime: 'application/pdf',
		documentURI: 'https://example.org/a.pdf',
		path: '/a.pdf',
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
	};

	beforeAll(() => jest.useFakeTimers());
	afterAll(() => jest.useRealTimers());

	describe('index', () => {
		it('assigns document data to binding in correct format', async () => {
			const dateNow = new Date();
			jest.setSystemTime(dateNow);

			const mockContext = {
				log: jest.fn(),
				bindingData: {
					enqueuedTimeUtc: 1,
					deliveryCount: 1,
					messageId: 123
				},
				bindings: {
					document: jest.fn()
				}
			};

			await subject(mockContext, message);

			const expectedDocument = {
				...message,
				modifiedAt: dateNow
			};

			expect(mockContext.bindings.document).toEqual(expectedDocument);
			expect(mockContext.log).toBeCalledWith(
				`invoking nsip-documents function with message: ${JSON.stringify(message)}`
			);
		});
	});
});
