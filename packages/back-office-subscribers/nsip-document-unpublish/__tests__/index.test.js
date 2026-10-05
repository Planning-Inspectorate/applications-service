const sendMessage = require('../index');

const mockUpdateMany = jest.fn();
const mockDeleteMany = jest.fn();

jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		document: {
			updateMany: (query) => mockUpdateMany(query),
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
		mockUpdateMany.mockReset();
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

	it('deletes document when examinationRefNo is missing', async () => {
		await sendMessage(mockContext, mockMessage);

		expect(mockDeleteMany).toHaveBeenCalledWith({
			where: {
				documentId: mockMessage.documentId
			}
		});
		expect(mockUpdateMany).not.toHaveBeenCalled();
		expect(mockContext.log).toHaveBeenCalledWith(
			`deleted document for caseRef ${mockMessage.caseRef} with documentId: ${mockMessage.documentId} (no EL reference)`
		);
	});

	it('deletes document when examinationRefNo is null', async () => {
		await sendMessage(mockContext, {
			...mockMessage,
			examinationRefNo: null
		});

		expect(mockDeleteMany).toHaveBeenCalledWith({
			where: {
				documentId: mockMessage.documentId
			}
		});
		expect(mockUpdateMany).not.toHaveBeenCalled();
		expect(mockContext.log).toHaveBeenCalledWith(
			`deleted document for caseRef ${mockMessage.caseRef} with documentId: ${mockMessage.documentId} (no EL reference)`
		);
	});

	it('updates publishedStatus to unpublished when document has examinationRefNo', async () => {
		await sendMessage(mockContext, {
			...mockMessage,
			examinationRefNo: 'REP1-001'
		});

		expect(mockUpdateMany).toHaveBeenCalledWith({
			where: {
				documentId: mockMessage.documentId
			},
			data: {
				publishedStatus: 'unpublished'
			}
		});
		expect(mockDeleteMany).not.toHaveBeenCalled();
		expect(mockContext.log).toHaveBeenCalledWith(
			`unpublished document for caseRef ${mockMessage.caseRef} with documentId: ${mockMessage.documentId} (retained due to EL reference)`
		);
	});
});
