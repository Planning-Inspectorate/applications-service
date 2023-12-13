const sendMessage = require('../index');

const mockDeleteMany = jest.fn();

jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		advice: {
			deleteMany: (query) => mockDeleteMany(query)
		}
	}
}));

const mockContext = {
	log: jest.fn(),
	bindingData: {
		enqueuedTimeUtc: '2023-01-01T09:00:00.000Z',
		deliveryCount: 1,
		messageId: 123
	}
};

const mockMessage = {
	adviceId: 'mock-advice-id'
};

describe('nsip-advice-unpublish', () => {
	it('logs message', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockContext.log).toHaveBeenCalledWith('invoking nsip-advice-unpublish function');
	});

	it('skips unpublish if adviceId is missing', async () => {
		await sendMessage(mockContext, {});
		expect(mockContext.log).toHaveBeenCalledWith('skipping unpublish as adviceId is missing');
	});

	it('unpublishes advice', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockDeleteMany).toHaveBeenCalledWith({
			where: {
				adviceId: mockMessage.adviceId
			}
		});
		expect(mockContext.log).toHaveBeenCalledWith(
			`unpublished advice with adviceId: ${mockMessage.adviceId}`
		);
	});
});
