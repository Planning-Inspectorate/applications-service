const sendMessage = require('../index');
const { prismaClient } = require('../../lib/prisma');

const mockFindUnique = jest.fn();
const mockUpsert = jest.fn();

jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		$transaction: jest.fn().mockImplementation((callback) =>
			callback({
				projectUpdate: {
					findUnique: mockFindUnique,
					upsert: mockUpsert
				}
			})
		)
	}
}));

const mockCurrentTime = new Date('2023-01-01T09:00:00.000Z');
const mockPastTime = new Date('2023-01-01T08:00:00.000Z');
const mockFutureTime = new Date('2023-01-01T10:00:00.000Z');
const mockContext = {
	log: jest.fn(),
	bindingData: {
		enqueuedTimeUtc: mockCurrentTime.toUTCString(),
		deliveryCount: 1,
		messageId: 123
	}
};

const mockMessage = {
	id: 1,
	caseReference: 'BC0110001',
	updateDate: '2023-07-28',
	updateName: 'July Update',
	updateContentEnglish: 'this is an update',
	updateContentWelsh: 'diweddariad yw hwn',
	updateStatus: 'published'
};

const mockProjectUpdate = {
	projectUpdateId: 1,
	caseReference: 'BC0110001',
	updateDate: '2023-07-28',
	updateName: 'July Update',
	updateContentEnglish: 'this is an update',
	updateContentWelsh: 'diweddariad yw hwn',
	updateStatus: 'published',
	modifiedAt: mockCurrentTime
};

const assertProjectUpdateUpsert = () => {
	expect(mockUpsert).toHaveBeenCalledWith({
		where: {
			projectUpdateId: 1
		},
		update: mockProjectUpdate,
		create: mockProjectUpdate
	});
	expect(mockContext.log).toHaveBeenCalledWith(`upserted projectUpdate with projectUpdateId: 1`);
};

describe('nsip-project-update', () => {
	beforeEach(() => {
		mockFindUnique.mockReset();
		mockUpsert.mockReset();
	});
	beforeAll(() => {
		jest.useFakeTimers('modern');
		jest.setSystemTime(mockCurrentTime);
	});
	afterAll(() => {
		jest.useRealTimers();
	});

	it('logs message', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockContext.log).toHaveBeenCalledWith('invoking nsip-project-update function');
	});
	it('skips update if projectUpdateId is missing', async () => {
		await sendMessage(mockContext, {});
		expect(mockContext.log).toHaveBeenCalledWith('skipping update as projectUpdateId is missing');
	});
	it('start transaction', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(prismaClient.$transaction).toHaveBeenCalled();
	});
	it('finds existing projectUpdate to determine if it should update', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockFindUnique).toHaveBeenCalledWith({
			where: {
				projectUpdateId: mockMessage.id
			}
		});
	});
	describe('when no projectUpdate exists in database', () => {
		it('creates new projectUpdate for projectUpdateId', async () => {
			mockFindUnique.mockResolvedValue(null);
			await sendMessage(mockContext, mockMessage);
			assertProjectUpdateUpsert();
		});
	});

	describe('when projectUpdate exists in database', () => {
		describe('and the message is older than the existing projectUpdate', () => {
			it('does not update the projectUpdate', async () => {
				mockFindUnique.mockResolvedValue(mockProjectUpdate);
				const mockContextWithPastTime = {
					...mockContext,
					bindingData: {
						...mockContext.bindingData,
						enqueuedTimeUtc: mockPastTime.toUTCString()
					}
				};
				await sendMessage(mockContextWithPastTime, mockMessage);
				expect(mockUpsert).not.toHaveBeenCalled();
				expect(mockContext.log).toHaveBeenCalledWith(
					'skipping update of projectUpdate with projectUpdateId: 1 as it is not newer than existing'
				);
			});
		});
		describe('and the message is newer than the existing projectUpdate', () => {
			it('updates the projectUpdate', async () => {
				mockFindUnique.mockResolvedValue(mockProjectUpdate);
				const mockContextWithFutureTime = {
					...mockContext,
					bindingData: {
						...mockContext.bindingData,
						enqueuedTimeUtc: mockFutureTime.toUTCString()
					}
				};
				await sendMessage(mockContextWithFutureTime, mockMessage);
				assertProjectUpdateUpsert();
			});
		});
	});
});
