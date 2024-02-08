const sendMessage = require('../index');
const { prismaClient } = require('../../lib/prisma');

const mockFindUnique = jest.fn();
const mockUpsert = jest.fn();

jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		$transaction: jest.fn().mockImplementation((callback) =>
			callback({
				advice: {
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
	adviceId: 1,
	adviceReference: 'TR0200007-0005',
	caseReference: 'BC0110001',
	caseId: 130,
	title: 'Advice title',
	from: 'Advice from',
	agent: 'Advice agent',
	method: 'Advice method',
	enquiryDate: new Date('2021-06-01'),
	enquiryDetails: 'Advice enquiry details',
	adviceGivenBy: 'Advice given by',
	adviceDate: new Date('2021-08-01'),
	adviceDetails: 'Advice details',
	status: 'published',
	redactionStatus: 'unredacted',
	attachmentIds: ['1', '2', '3']
};

const mockAdvice = {
	...mockMessage,
	attachmentIds: mockMessage.attachmentIds.join(','),
	modifiedAt: mockCurrentTime
};
const assertUpsert = () => {
	expect(mockUpsert).toHaveBeenCalledWith({
		where: {
			adviceId: mockMessage.adviceId
		},
		create: mockAdvice,
		update: mockAdvice
	});
	expect(mockContext.log).toHaveBeenCalledWith(
		`upserted advice with adviceId: ${mockMessage.adviceId}`
	);
};

describe('nsip-advice', () => {
	beforeEach(() => {
		mockFindUnique.mockClear();
		mockUpsert.mockClear();
		prismaClient.$transaction.mockClear();
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
		expect(mockContext.log).toHaveBeenCalledWith('invoking nsip-advice function');
	});
	it('throws error if adviceId is missing', async () => {
		await expect(async () => await sendMessage(mockContext, {})).rejects.toThrow(
			'adviceId is required'
		);
		expect(mockFindUnique).not.toHaveBeenCalled();
		expect(prismaClient.$transaction).not.toHaveBeenCalled();
	});
	it('start transaction', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(prismaClient.$transaction).toHaveBeenCalled();
	});
	it('finds existing advice to determine if it should update', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockFindUnique).toHaveBeenCalledWith({
			where: {
				adviceId: mockMessage.adviceId
			}
		});
	});
	describe('when no advice exists in database', () => {
		it('creates new advice for adviceId', async () => {
			mockFindUnique.mockResolvedValue(null);
			await sendMessage(mockContext, mockMessage);
			assertUpsert();
		});
	});
	describe('when advice exists in database', () => {
		describe('and the message is older than existing advice', () => {
			it('skips update', async () => {
				mockFindUnique.mockResolvedValue(mockAdvice);
				const mockContextWithOlderTime = {
					...mockContext,
					bindingData: {
						...mockContext.bindingData,
						enqueuedTimeUtc: mockPastTime.toUTCString()
					}
				};
				await sendMessage(mockContextWithOlderTime, mockMessage);
				expect(mockUpsert).not.toHaveBeenCalled();
				expect(mockContext.log).toHaveBeenCalledWith(
					`skipping update of advice with adviceId: ${mockMessage.adviceId}`
				);
			});
		});
		describe('and the message is newer than existing advice', () => {
			it('updates advice', async () => {
				mockFindUnique.mockResolvedValue(mockAdvice);
				const mockContextWithNewerTime = {
					...mockContext,
					bindingData: {
						...mockContext.bindingData,
						enqueuedTimeUtc: mockFutureTime.toUTCString()
					}
				};
				await sendMessage(mockContextWithNewerTime, mockMessage);
				assertUpsert();
			});
		});
	});
});
