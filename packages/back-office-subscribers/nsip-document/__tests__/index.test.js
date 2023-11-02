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
	stage: 'decision',
	filter1: 'Deadline 2',
	filter2: 'Scoping Option Report'
};

const mockDocument = {
	...mockMessage,
	modifiedAt: mockCurrentTime
};

const assertDocumentUpsert = (mockUpsert, mockDocument) => {
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
});
