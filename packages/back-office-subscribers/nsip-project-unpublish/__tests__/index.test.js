const sendMessage = require('../index');

const mockDeleteMany = jest.fn();

jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		project: {
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
	caseReference: 'mock-case-reference'
};

describe('nsip-project-unpublish', () => {
	it('logs message', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockContext.log).toHaveBeenCalledWith('invoking nsip-project-unpublish function');
	});

	it('skips unpublish if caseReference is missing', async () => {
		await sendMessage(mockContext, {});
		expect(mockContext.log).toHaveBeenCalledWith('skipping unpublish as caseReference is missing');
	});

	it('unpublishes project', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockDeleteMany).toHaveBeenCalledWith({
			where: {
				caseReference: mockMessage.caseReference
			}
		});
		expect(mockContext.log).toHaveBeenCalledWith(
			`unpublished project with caseReference: ${mockMessage.caseReference}`
		);
	});
});
