const sendMessage = require('../index');

const mockRepresentationUpdate = jest.fn();

jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		representation: {
			update: (query) => mockRepresentationUpdate(query)
		}
	}
}));

const mockContext = {
	log: jest.fn(),
	bindingData: {
		enqueuedTimeUtc: new Date('2023-01-01T09:00:00.000Z'),
		deliveryCount: 1,
		messageId: 123
	}
};
const mockMessage = {
	representationId: 123,
	status: 'PUBLISHED'
};

describe('nsip-representation-update', () => {
	beforeEach(() => {
		mockRepresentationUpdate.mockReset();
	});

	it('logs message', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockContext.log).toHaveBeenCalledWith('invoking nsip-representation-update function');
	});
	it('skips update if representationId is missing', async () => {
		await sendMessage(mockContext, {
			...mockMessage,
			representationId: null
		});

		expect(mockContext.log).toHaveBeenCalledWith('skipping update as representationId is missing');
		expect(mockRepresentationUpdate).not.toHaveBeenCalled();
	});

	it('skips update if status is missing', async () => {
		await sendMessage(mockContext, {
			...mockMessage,
			status: null
		});

		expect(mockContext.log).toHaveBeenCalledWith('skipping update as status is missing');
		expect(mockRepresentationUpdate).not.toHaveBeenCalled();
	});

	it('updates representation status', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockRepresentationUpdate).toHaveBeenCalledWith({
			where: { representationId: mockMessage.representationId },
			data: { status: mockMessage.status }
		});
		expect(mockContext.log).toHaveBeenCalledWith(
			`updated representation ${mockMessage.representationId} to ${mockMessage.status}`
		);
	});
});
