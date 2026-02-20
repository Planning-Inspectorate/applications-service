const sendMessage = require('../index');
const buildMergeQuery = require('../../lib/build-merge-query');

const mockExecuteRawUnsafe = jest.fn();
jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		$executeRawUnsafe: (statement, ...parameters) => mockExecuteRawUnsafe(statement, ...parameters)
	}
}));
jest.mock('../../lib/build-merge-query', () =>
	jest.fn().mockImplementation(jest.requireActual('../../lib/build-merge-query'))
);
jest.mock('axios', () => ({
	delete: jest.fn().mockResolvedValue({ status: 200 })
}));

const mockEnqueueDateTime = new Date('2023-01-01T09:00:00.000Z').toUTCString();
const mockContext = {
	log: jest.fn(),
	bindingData: {
		enqueuedTimeUtc: mockEnqueueDateTime,
		deliveryCount: 1,
		messageId: 123
	}
};

const mockMessage = {
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
	documentType: 'abc',
	securityClassification: 'public',
	sourceSystem: 'back_office',
	origin: 'pins',
	owner: 'someone',
	author: 'someone',
	authorWelsh: 'author welsh',
	representative: 'some agency',
	description: 'this is a description',
	descriptionWelsh: 'this is a description welsh',
	documentCaseStage: 'decision',
	filter1: 'Deadline 2',
	filter1Welsh: 'Deadling 2 welsh',
	filter2: 'Scoping Option Report'
};

const { documentCaseStage, ...documentProperties } = mockMessage;
const mockDocument = {
	...documentProperties,
	stage: documentCaseStage,
	modifiedAt: new Date()
};

describe('nsip-document', () => {
	beforeEach(() => {
		mockExecuteRawUnsafe.mockReset();
	});
	beforeAll(() => {
		jest.useFakeTimers('modern');
		jest.setSystemTime(new Date(mockDocument.modifiedAt));
	});
	afterAll(() => {
		jest.useRealTimers();
	});

	it('logs starting message', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockContext.log).toHaveBeenCalledWith('invoking nsip-document function');
	});

	it('throws error if documentId is missing', async () => {
		await expect(async () => await sendMessage(mockContext, {})).rejects.toThrow(
			'documentId is required'
		);
		expect(mockExecuteRawUnsafe).not.toHaveBeenCalled();
	});

	it('logs message when case reference is missing', async () => {
		const messageWithoutCaseRef = { ...mockMessage };
		delete messageWithoutCaseRef.caseRef;

		await sendMessage(mockContext, messageWithoutCaseRef);
		expect(mockContext.log).toHaveBeenCalledWith('skipping cache clear as caseRef is required');
	});

	it('calls buildMergeQuery with correct parameters', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(buildMergeQuery).toHaveBeenCalledWith(
			'document',
			'documentId',
			mockDocument,
			mockEnqueueDateTime
		);
	});

	it('runs query to upsert document', async () => {
		await sendMessage(mockContext, mockMessage);
		const [receivedStatement, ...receivedParameters] = mockExecuteRawUnsafe.mock.calls[0];
		const expectedParameters = Object.values(mockDocument);
		const statements = receivedStatement.split('\n');
		expect(statements[0].trim()).toBe('MERGE INTO [document] AS Target');
		expect(statements[1].trim()).toBe(
			'USING (SELECT @P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8, @P9, @P10, @P11, @P12, @P13, @P14, @P15, @P16, @P17, @P18, @P19, @P20, @P21, @P22, @P23, @P24, @P25, @P26, @P27, @P28, @P29, @P30, @P31, @P32, @P33, @P34, @P35, @P36) AS Source ([documentId], [caseId], [caseRef], [documentReference], [version], [examinationRefNo], [filename], [originalFilename], [size], [mime], [documentURI], [publishedDocumentURI], [virusCheckStatus], [fileMD5], [dateCreated], [lastModified], [caseType], [documentStatus], [redactedStatus], [publishedStatus], [datePublished], [documentType], [securityClassification], [sourceSystem], [origin], [owner], [author], [authorWelsh], [representative], [description], [descriptionWelsh], [filter1], [filter1Welsh], [filter2], [stage], [modifiedAt])'
		);
		expect(statements[2].trim()).toBe('ON Target.[documentId] = Source.[documentId]');
		expect(statements[3].trim()).toBe('WHEN MATCHED');
		expect(statements[4].trim()).toBe(
			`AND '2023-01-01 09:00:00' >= DATEADD(MINUTE, -1, Target.[modifiedAt])`
		);
		expect(statements[5].trim()).toBe(
			'THEN UPDATE SET Target.[caseId] = Source.[caseId], Target.[caseRef] = Source.[caseRef], Target.[documentReference] = Source.[documentReference], Target.[version] = Source.[version], Target.[examinationRefNo] = Source.[examinationRefNo], Target.[filename] = Source.[filename], Target.[originalFilename] = Source.[originalFilename], Target.[size] = Source.[size], Target.[mime] = Source.[mime], Target.[documentURI] = Source.[documentURI], Target.[publishedDocumentURI] = Source.[publishedDocumentURI], Target.[virusCheckStatus] = Source.[virusCheckStatus], Target.[fileMD5] = Source.[fileMD5], Target.[dateCreated] = Source.[dateCreated], Target.[lastModified] = Source.[lastModified], Target.[caseType] = Source.[caseType], Target.[documentStatus] = Source.[documentStatus], Target.[redactedStatus] = Source.[redactedStatus], Target.[publishedStatus] = Source.[publishedStatus], Target.[datePublished] = Source.[datePublished], Target.[documentType] = Source.[documentType], Target.[securityClassification] = Source.[securityClassification], Target.[sourceSystem] = Source.[sourceSystem], Target.[origin] = Source.[origin], Target.[owner] = Source.[owner], Target.[author] = Source.[author], Target.[authorWelsh] = Source.[authorWelsh], Target.[representative] = Source.[representative], Target.[description] = Source.[description], Target.[descriptionWelsh] = Source.[descriptionWelsh], Target.[filter1] = Source.[filter1], Target.[filter1Welsh] = Source.[filter1Welsh], Target.[filter2] = Source.[filter2], Target.[stage] = Source.[stage], Target.[modifiedAt] = Source.[modifiedAt]'
		);
		expect(statements[6].trim()).toBe(
			'WHEN NOT MATCHED THEN INSERT ([documentId], [caseId], [caseRef], [documentReference], [version], [examinationRefNo], [filename], [originalFilename], [size], [mime], [documentURI], [publishedDocumentURI], [virusCheckStatus], [fileMD5], [dateCreated], [lastModified], [caseType], [documentStatus], [redactedStatus], [publishedStatus], [datePublished], [documentType], [securityClassification], [sourceSystem], [origin], [owner], [author], [authorWelsh], [representative], [description], [descriptionWelsh], [filter1], [filter1Welsh], [filter2], [stage], [modifiedAt]) VALUES (@P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8, @P9, @P10, @P11, @P12, @P13, @P14, @P15, @P16, @P17, @P18, @P19, @P20, @P21, @P22, @P23, @P24, @P25, @P26, @P27, @P28, @P29, @P30, @P31, @P32, @P33, @P34, @P35, @P36);'
		);
		expect(receivedParameters.length).toBe(expectedParameters.length);
		expect(receivedParameters).toEqual(expect.arrayContaining(expectedParameters));
		expect(mockContext.log).toHaveBeenCalledWith(
			`upserted document with documentId ${mockMessage.documentId}`
		);
	});
});
