const sendMessage = require('../index');

const mockDeleteMany = jest.fn();

jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		projectUpdate: {
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
	id: 1
};

describe('nsip-project-update-unpublish', () => {
	it('logs message', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockContext.log).toHaveBeenCalledWith('invoking nsip-project-update-unpublish function');
	});

	it('skips unpublish if projectUpdateId is missing', async () => {
		await sendMessage(mockContext, {});
		expect(mockContext.log).toHaveBeenCalledWith(
			'skipping unpublish as projectUpdateId is missing'
		);
	});

	it('unpublishes project update', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockDeleteMany).toHaveBeenCalledWith({
			where: {
				projectUpdateId: mockMessage.id
			}
		});
		expect(mockContext.log).toHaveBeenCalledWith(
			`unpublished project update with id: ${mockMessage.id}`
		);
	});
});
