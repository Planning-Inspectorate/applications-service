const sendMessage = require('../index');

const mockDeleteMany = jest.fn();

jest.mock('axios', () => ({
	delete: jest.fn().mockResolvedValue({ status: 200 })
}));

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
	projectUpdateId: 1,
	caseReference: 'BC010001',
	correlationId: 'id-1'
};

describe('nsip-project-update-unpublish', () => {
	it('logs message', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockContext.log).toHaveBeenCalledWith('invoking nsip-project-update-unpublish function');
	});

	it('aborts unpublish if projectUpdateId is missing', async () => {
		const messageWithoutUpdateId = {
			...mockMessage,
			projectUpdateId: undefined
		};
		await expect(sendMessage(mockContext, messageWithoutUpdateId)).rejects.toThrow(
			'projectUpdateId or caseReference is missing'
		);
		expect(mockContext.log).toHaveBeenCalledWith(
			'aborting nsip-project-update-unpublish function as projectUpdateId or caseReference is missing',
			{
				correlationId: 'id-1'
			}
		);
	});
	it('aborts unpublish if caseReference is missing', async () => {
		const messageWithoutCaseRef = {
			...mockMessage,
			caseReference: undefined
		};
		await expect(sendMessage(mockContext, messageWithoutCaseRef)).rejects.toThrow(
			'projectUpdateId or caseReference is missing'
		);
		expect(mockContext.log).toHaveBeenCalledWith(
			'aborting nsip-project-update-unpublish function as projectUpdateId or caseReference is missing',
			{
				correlationId: 'id-1'
			}
		);
	});

	it('unpublishes project update', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockDeleteMany).toHaveBeenCalledWith({
			where: {
				projectUpdateId: mockMessage.projectUpdateId
			}
		});
		expect(mockContext.log).toHaveBeenCalledWith(
			`unpublished project update with id: ${mockMessage.projectUpdateId}`
		);
		expect(mockContext.log).toHaveBeenCalledWith(
			'clearing project updates cache for caseRef BC010001...'
		);
		expect(mockContext.log).toHaveBeenCalledWith(
			'project updates cache cleared for caseRef BC010001'
		);
	});
});
