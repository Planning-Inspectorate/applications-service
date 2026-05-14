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
	adviceId: 'mock-advice-id',
	caseReference: 'BC0110001',
	correlationId: 'id-1'
};

describe('nsip-advice-unpublish', () => {
	it('logs message', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockContext.log).toHaveBeenCalledWith(
			'invoking nsip-advice-unpublish function for caseReference: BC0110001 adviceId mock-advice-id'
		);
	});

	it('skips unpublish if adviceId is missing', async () => {
		await sendMessage(mockContext, { caseReference: 'BC0110001', correlationId: 'id-1' });
		expect(mockContext.log).toHaveBeenCalledWith(
			`skipping nsip-advice-unpublish function as adviceId is missing`,
			{
				correlationId: 'id-1'
			}
		);
	});

	it('unpublishes advice', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockDeleteMany).toHaveBeenCalledWith({
			where: {
				adviceId: mockMessage.adviceId
			}
		});
		expect(mockContext.log).toHaveBeenCalledWith(
			'nsip-advice-unpublish function published advice for caseReference BC0110001 with adviceId: mock-advice-id'
		);
	});
});
