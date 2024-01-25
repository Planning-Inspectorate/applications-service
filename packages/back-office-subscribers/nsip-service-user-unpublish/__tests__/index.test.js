const sendMessage = require('../index');

const mockDeleteMany = jest.fn();
const mockUpdateMany = jest.fn();
jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		serviceUser: {
			deleteMany: (query) => mockDeleteMany(query)
		},
		project: {
			updateMany: (query) => mockUpdateMany(query)
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
	id: '123'
};

describe('nsip-service-user-unpublish', () => {
	it('logs message', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockContext.log).toHaveBeenCalledWith('invoking nsip-service-user-unpublish function');
	});

	it('skips unpublish if serviceUserId is missing', async () => {
		await sendMessage(mockContext, {});
		expect(mockContext.log).toHaveBeenCalledWith('skipping unpublish as serviceUserId is missing');
	});

	it('disconnects service-user from project', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockUpdateMany).toHaveBeenCalledWith({
			where: {
				applicantId: mockMessage.id
			},
			data: {
				applicantId: null
			}
		});
	});

	it('unpublishes service-user', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockDeleteMany).toHaveBeenCalledWith({
			where: {
				serviceUserId: mockMessage.id
			}
		});
		expect(mockContext.log).toHaveBeenCalledWith(
			`unpublished service user with serviceUserId ${mockMessage.id}`
		);
	});
});
