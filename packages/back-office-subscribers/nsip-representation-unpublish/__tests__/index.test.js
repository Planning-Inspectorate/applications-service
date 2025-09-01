const sendMessage = require('../index');

const mockDeleteMany = jest.fn();

jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		representation: {
			deleteMany: (query) => mockDeleteMany(query)
		}
	}
}));

const mockContext = {
	log: jest.fn(),
	bindingData: {
		enqueuedTimeUtc: '2025-01-01T12:00:00.000Z',
		deliveryCount: 1,
		messageId: 123
	}
};

const mockMessage = {
	representationId: 1
};

describe('nsip-representation-unpublish', () => {
	it('logs message', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockContext.log).toHaveBeenCalledWith('invoking nsip-representation-unpublish function');
	});

	it('skips unpublish if representationId is missing', async () => {
		await sendMessage(mockContext, {});
		expect(mockContext.log).toHaveBeenCalledWith(
			'skipping unpublish as representationId is missing'
		);
	});

	it('unpublishes representation', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockDeleteMany).toHaveBeenCalledWith({
			where: {
				representationId: mockMessage.representationId
			}
		});
		expect(mockContext.log).toHaveBeenCalledWith(
			`unpublished representation with id: ${mockMessage.representationId}`
		);
	});
});
