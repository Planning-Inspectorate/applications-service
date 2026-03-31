jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		representation: { updateMany: jest.fn().mockResolvedValue({ count: 1 }) }
	}
}));

jest.mock('../../lib/build-prisma-update-query', () => jest.fn().mockResolvedValue({ count: 1 }));

const sendMessage = require('../index');
const mockPrismaUpdate = require('../../lib/build-prisma-update-query');
const { prismaClient } = require('../../lib/prisma');

const mockEnqueueDateTime = new Date('2023-01-01T09:00:00.000Z').toUTCString();
const mockContext = {
	log: jest.fn(),
	bindingData: {
		enqueuedTimeUtc: mockEnqueueDateTime,
		deliveryCount: 1,
		messageId: 123
	}
};

const mockMessage = {
	representationId: 123,
	status: 'PUBLISHED'
};

const mockRepresentation = {
	...mockMessage,
	modifiedAt: new Date()
};
describe('nsip-representation-update', () => {
	beforeEach(() => {
		mockPrismaUpdate.mockClear();
		mockContext.log.mockClear();
	});
	beforeAll(() => {
		jest.useFakeTimers('modern');
		jest.setSystemTime(new Date(mockRepresentation.modifiedAt));
	});
	afterAll(() => {
		jest.useRealTimers();
	});

	it('logs message', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockContext.log).toHaveBeenCalledWith('invoking nsip-representation-update function');
	});

	it('throws error if representationId is missing', async () => {
		await expect(async () => await sendMessage(mockContext, {})).rejects.toThrow(
			'representationId is required'
		);
		expect(mockPrismaUpdate).not.toHaveBeenCalled();
	});

	it('throws error if status is missing', async () => {
		await expect(
			async () => await sendMessage(mockContext, { representationId: 123 })
		).rejects.toThrow('status is required');
		expect(mockPrismaUpdate).not.toHaveBeenCalled();
	});

	it('calls buildPrismaUpdateQuery with correct parameters', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockPrismaUpdate).toHaveBeenCalledWith(
			prismaClient.representation,
			'representationId',
			mockRepresentation,
			mockEnqueueDateTime
		);
	});

	it('logs success after update', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockContext.log).toHaveBeenCalledWith(
			`updated representation with representationId ${mockMessage.representationId}`
		);
	});

	it('logs if no representation was updated', async () => {
		mockPrismaUpdate.mockReturnValueOnce({ count: 0 });
		await sendMessage(mockContext, mockMessage);

		expect(mockContext.log).toHaveBeenCalledWith(
			`no representation updated with representationId ${mockMessage.representationId} - update may be stale or no record exists`
		);
	});
});
