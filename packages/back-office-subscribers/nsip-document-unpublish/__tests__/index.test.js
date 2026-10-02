const sendMessage = require('../index');

const mockFindUnique = jest.fn();
const mockUpdate = jest.fn();
const mockDeleteMany = jest.fn();

jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		document: {
			findUnique: (query) => mockFindUnique(query),
			update: (query) => mockUpdate(query),
			deleteMany: (query) => mockDeleteMany(query)
		}
	}
}));

jest.mock('axios', () => ({
	delete: jest.fn(() => ({ data: {} }))
}));

const mockContext = {
	log: jest.fn(),
	warn: jest.fn(),
	bindingData: {
		enqueuedTimeUtc: '2023-01-01T09:00:00.000Z',
		deliveryCount: 1,
		messageId: 123
	}
};

const mockMessage = {
	documentId: 'mock-document-id',
	caseRef: 'mock-case-ref'
};

describe('nsip-document-unpublish', () => {
	beforeEach(() => {
		mockFindUnique.mockReset();
		mockUpdate.mockReset();
		mockDeleteMany.mockReset();
		mockContext.log.mockReset();
		mockContext.warn.mockReset();
	});

	it('logs starting message', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockContext.log).toHaveBeenCalledWith(
			`invoking nsip-document-unpublish function for documentId ${mockMessage.documentId} and caseRef ${mockMessage.caseRef}`
		);
	});

	it('skips unpublish if documentId is missing', async () => {
		await sendMessage(mockContext, { correlationId: 'id-1', caseRef: 'mock-case-ref' });
		expect(mockContext.warn).toHaveBeenCalledWith(
			`skipping nsip-document-unpublish function as documentId is missing`,
			{
				correlationId: 'id-1',
				caseReference: 'mock-case-ref'
			}
		);
	});

	it('logs message when case reference is missing', async () => {
		const messageWithoutCaseRef = { ...mockMessage };
		delete messageWithoutCaseRef.caseRef;

		await sendMessage(mockContext, messageWithoutCaseRef);
		expect(mockContext.log).toHaveBeenCalledWith('skipping cache clear as caseRef is required');
	});

	it('unpublishes and deletes document when document is not found or has no examinationRefNo', async () => {
		mockFindUnique.mockResolvedValueOnce(null);

		await sendMessage(mockContext, mockMessage);

		expect(mockFindUnique).toHaveBeenCalledWith({
			where: {
				documentId: mockMessage.documentId
			}
		});
		expect(mockDeleteMany).toHaveBeenCalledWith({
			where: {
				documentId: mockMessage.documentId
			}
		});
		expect(mockUpdate).not.toHaveBeenCalled();
		expect(mockContext.log).toHaveBeenCalledWith(
			`unpublished and deleted document for caseRef ${mockMessage.caseRef} with documentId: ${mockMessage.documentId}`
		);
	});

	it('unpublishes and deletes document when document has empty examinationRefNo', async () => {
		mockFindUnique.mockResolvedValueOnce({
			documentId: mockMessage.documentId,
			examinationRefNo: null
		});

		await sendMessage(mockContext, mockMessage);

		expect(mockFindUnique).toHaveBeenCalledWith({
			where: {
				documentId: mockMessage.documentId
			}
		});
		expect(mockDeleteMany).toHaveBeenCalledWith({
			where: {
				documentId: mockMessage.documentId
			}
		});
		expect(mockUpdate).not.toHaveBeenCalled();
		expect(mockContext.log).toHaveBeenCalledWith(
			`unpublished and deleted document for caseRef ${mockMessage.caseRef} with documentId: ${mockMessage.documentId}`
		);
	});

	it('updates publishedStatus to unpublished when document has examinationRefNo', async () => {
		mockFindUnique.mockResolvedValueOnce({
			documentId: mockMessage.documentId,
			examinationRefNo: 'REP1-001'
		});

		await sendMessage(mockContext, mockMessage);

		expect(mockFindUnique).toHaveBeenCalledWith({
			where: {
				documentId: mockMessage.documentId
			}
		});
		expect(mockUpdate).toHaveBeenCalledWith({
			where: {
				documentId: mockMessage.documentId
			},
			data: {
				publishedStatus: 'unpublished'
			}
		});
		expect(mockDeleteMany).not.toHaveBeenCalled();
		expect(mockContext.log).toHaveBeenCalledWith(
			`updated document publishedStatus to 'unpublished' for caseRef ${mockMessage.caseRef} with documentId: ${mockMessage.documentId} (retained due to EL reference)`
		);
	});
});
