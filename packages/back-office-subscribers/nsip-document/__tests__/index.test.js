const sendMessage = require('../index');
const { prismaClient } = require('../../lib/prisma');

const mockFindUnique = jest.fn();
const mockUpsert = jest.fn();

jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		$transaction: jest.fn().mockImplementation((callback) =>
			callback({
				document: {
					findUnique: mockFindUnique,
					upsert: mockUpsert
				}
			})
		)
	}
}));

const mockCurrentTime = new Date('2023-01-01T09:00:00.000Z');
const mockPastTime = new Date('2023-01-01T08:00:00.000Z');
const mockFutureTime = new Date('2023-01-01T10:00:00.000Z');
const mockContext = {
	log: jest.fn(),
	bindingData: {
		enqueuedTimeUtc: mockCurrentTime.toUTCString(),
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
	documentType: null,
	securityClassification: 'public',
	sourceSystem: 'back_office',
	origin: 'pins',
	owner: 'someone',
	author: 'someone',
	representative: 'some agency',
	description: 'this is a description',
	documentCaseStage: 'decision',
	filter1: 'Deadline 2',
	filter2: 'Scoping Option Report'
};

const { documentCaseStage, ...documentProperties } = mockMessage;
const mockDocument = {
	...documentProperties,
	stage: documentCaseStage,
	modifiedAt: mockCurrentTime
};

const assertDocumentUpsert = () => {
	expect(mockUpsert).toHaveBeenCalledWith({
		where: {
			documentId: mockMessage.documentId
		},
		update: mockDocument,
		create: mockDocument
	});
	expect(mockContext.log).toHaveBeenCalledWith(
		`upserted document with documentId: ${mockMessage.documentId}`
	);
};

describe('nsip-document', () => {
	beforeEach(() => {
		mockFindUnique.mockReset();
		mockUpsert.mockReset();
	});
	beforeAll(() => {
		jest.useFakeTimers('modern');
		jest.setSystemTime(mockCurrentTime);
	});
	afterAll(() => {
		jest.useRealTimers();
	});

	it('logs message', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockContext.log).toHaveBeenCalledWith('invoking nsip-document function');
	});
	it('skips update if documentId is missing', async () => {
		await sendMessage(mockContext, {});
		expect(mockContext.log).toHaveBeenCalledWith('skipping update as documentId is missing');
		expect(mockFindUnique).not.toHaveBeenCalled();
	});
	it('start transaction', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(prismaClient.$transaction).toHaveBeenCalled();
	});
	it('finds existing document to determine if it should update', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockFindUnique).toHaveBeenCalledWith({
			where: {
				documentId: mockMessage.documentId
			}
		});
	});
	describe('when no document exists in database', () => {
		it('creates new document for documentId', async () => {
			mockFindUnique.mockResolvedValue(null);
			await sendMessage(mockContext, mockMessage);
			assertDocumentUpsert();
		});
	});

	describe('when document exists in database', () => {
		describe('and the message is older than existing document', () => {
			it('skips update', async () => {
				mockFindUnique.mockResolvedValue(mockDocument);
				const mockContextWithOlderTime = {
					...mockContext,
					bindingData: {
						...mockContext.bindingData,
						enqueuedTimeUtc: mockPastTime.toUTCString()
					}
				};
				await sendMessage(mockContextWithOlderTime, mockMessage);
				expect(mockUpsert).not.toHaveBeenCalled();
				expect(mockContext.log).toHaveBeenCalledWith(
					`skipping update of document with documentId: ${mockMessage.documentId}`
				);
			});
		});
		describe('and the message is newer than existing document', () => {
			it('updates document', async () => {
				mockFindUnique.mockResolvedValue(mockDocument);
				const mockContextWithNewerTime = {
					...mockContext,
					bindingData: {
						...mockContext.bindingData,
						enqueuedTimeUtc: mockFutureTime.toUTCString()
					}
				};
				await sendMessage(mockContextWithNewerTime, mockMessage);
				assertDocumentUpsert();
			});
		});
	});
});
