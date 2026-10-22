const sendMessage = require('../index');

const mockUpdateMany = jest.fn();
const mockDeleteMany = jest.fn();
const mockFindFirst = jest.fn();
const mockUpdate = jest.fn();

jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		document: {
			updateMany: (query) => mockUpdateMany(query),
			deleteMany: (query) => mockDeleteMany(query)
		},
		representation: {
			findFirst: (query) => mockFindFirst(query),
			update: (query) => mockUpdate(query)
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
		mockFindFirst.mockReset();
		mockUpdate.mockReset();
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
		expect(mockContext.log).toHaveBeenCalledWith(
			'skipping document cache clear as caseRef is required'
		);
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
		expect(mockContext.log).toHaveBeenCalledWith(
			`clearing documents cache for caseRef ${mockMessage.caseRef}`
		);
		expect(mockContext.log).toHaveBeenCalledWith(
			`documents cache cleared for caseRef ${mockMessage.caseRef}`
		);
	});

	it('logs starting message for deleting document from representation if document is a representation attachment', async () => {
		mockFindFirst.mockResolvedValue({
			representationId: 1,
			attachmentIds: 'mock-document-id'
		});

		await sendMessage(mockContext, {
			...mockMessage,
			description: 'Relevant representation attachment'
		});

		expect(mockContext.log).toHaveBeenCalledWith(
			`deleting documentId: ${mockMessage.documentId} from representation attachmentIds`
		);
	});

	it('throws an error if representation is missing', async () => {
		mockFindFirst.mockResolvedValue(null);

		await expect(
			sendMessage(mockContext, {
				...mockMessage,
				description: 'Relevant representation attachment'
			})
		).rejects.toThrow(`no representation found for documentId: ${mockMessage.documentId}`);

		expect(mockUpdate).not.toHaveBeenCalled();
	});

	it('throws an error if representation id is missing', async () => {
		mockFindFirst.mockResolvedValue({ representationId: null });

		await expect(
			sendMessage(mockContext, {
				...mockMessage,
				description: 'Relevant representation attachment'
			})
		).rejects.toThrow('representationId is missing from representation');

		expect(mockUpdate).not.toHaveBeenCalled();
	});

	it('deletes document id when document is the only representation attachment', async () => {
		mockFindFirst.mockResolvedValue({
			representationId: 1,
			attachmentIds: 'mock-document-id'
		});

		await sendMessage(mockContext, {
			...mockMessage,
			description: 'Relevant representation attachment'
		});

		expect(mockUpdate).toHaveBeenCalledWith({
			where: {
				representationId: 1
			},
			data: {
				attachmentIds: null,
				modifiedAt: expect.any(Date)
			}
		});
	});

	it('deletes document id when document is one of many representation attachments', async () => {
		mockFindFirst.mockResolvedValue({
			representationId: 1,
			attachmentIds: 'mock-document-id,second-document-id,third-document-id,fourth-document-id'
		});

		await sendMessage(mockContext, {
			...mockMessage,
			description: 'Relevant representation attachment'
		});

		expect(mockUpdate).toHaveBeenCalledWith({
			where: {
				representationId: 1
			},
			data: {
				attachmentIds: 'second-document-id,third-document-id,fourth-document-id',
				modifiedAt: expect.any(Date)
			}
		});
	});

	it('clears representations cache once representation has been updated', async () => {
		mockFindFirst.mockResolvedValue({
			representationId: 1,
			attachmentIds: 'mock-document-id'
		});

		await sendMessage(mockContext, {
			...mockMessage,
			description: 'Relevant representation attachment'
		});

		expect(mockContext.log).toHaveBeenCalledWith(
			`representations cache cleared for caseRef ${mockMessage.caseRef}`
		);
	});

	it('does not clear representations cache if case reference is missing', async () => {
		mockFindFirst.mockResolvedValue({
			representationId: 1,
			attachmentIds: 'mock-document-id'
		});

		await sendMessage(mockContext, {
			documentId: 'mock-document-id',
			caseRef: null,
			description: 'Relevant representation attachment'
		});

		expect(mockContext.log).toHaveBeenCalledWith(
			'skipping representations cache clear as caseRef is required'
		);
	});
});
