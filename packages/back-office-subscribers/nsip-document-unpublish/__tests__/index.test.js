const sendMessage = require('../index');

const mockDeleteMany = jest.fn();

jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		document: {
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

	it('unpublishes document', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockDeleteMany).toHaveBeenCalledWith({
			where: {
				documentId: mockMessage.documentId
			}
		});
		expect(mockContext.log).toHaveBeenCalledWith(
			`unpublished document for caseRef ${mockMessage.caseRef} with documentId: ${mockMessage.documentId}`
		);
	});
});
