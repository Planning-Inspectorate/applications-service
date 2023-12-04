const sendMessage = require('../index');
const { prismaClient } = require('../../lib/prisma');
const {
	mockMessageWithInvalidServiceUserType,
	mockRepresentativeMessage,
	mockRepresentedMessage,
	mockApplicantMessage,
	mockRepresentativeServiceUser,
	mockRepresentedServiceUser,
	mockApplicantServiceUser
} = require('../../__data__/service-user');

const mockFindUnique = jest.fn();
const mockUpsert = jest.fn();

jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		$transaction: jest.fn().mockImplementation((callback) =>
			callback({
				serviceUser: {
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

const assertUpsert = (serviceUserType, message, serviceUser) => {
	expect(mockUpsert).toHaveBeenCalledWith({
		where: {
			serviceUserId: message.id
		},
		create: serviceUser,
		update: serviceUser
	});
	expect(mockContext.log).toHaveBeenCalledWith(
		`upserted service user of type ${serviceUserType} with serviceUserId: ${message.id}`
	);
};

describe('nsip-service-user', () => {
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
		await sendMessage(mockContext, mockRepresentativeMessage);
		expect(mockContext.log).toHaveBeenCalledWith('invoking nsip-service-user function');
	});
	it('skips update if serviceUserId is missing', async () => {
		await sendMessage(mockContext, {});
		expect(mockContext.log).toHaveBeenCalledWith('skipping update as serviceUserId is missing');
		expect(mockFindUnique).not.toHaveBeenCalled();
	});
	it('start transaction', async () => {
		await sendMessage(mockContext, mockRepresentativeMessage);
		expect(prismaClient.$transaction).toHaveBeenCalled();
	});
	it('finds existing service user to determine if it should update', async () => {
		await sendMessage(mockContext, mockRepresentativeMessage);
		expect(mockFindUnique).toHaveBeenCalledWith({
			where: {
				serviceUserId: mockRepresentativeMessage.id
			}
		});
	});

	it('throws error if serviceUserType is invalid', async () => {
		await expect(sendMessage(mockContext, mockMessageWithInvalidServiceUserType)).rejects.toThrow(
			`Invalid serviceUserType: ${mockMessageWithInvalidServiceUserType.serviceUserType}`
		);
	});

	describe('when no service user exists in database', () => {
		it.each([
			['Representative', mockRepresentativeMessage, mockRepresentativeServiceUser],
			['Represented', mockRepresentedMessage, mockRepresentedServiceUser],
			['Applicant', mockApplicantMessage, mockApplicantServiceUser]
		])('upserts service user of type %s', async (serviceUserType, message, serviceUser) => {
			mockFindUnique.mockResolvedValue(null);
			await sendMessage(mockContext, message);
			assertUpsert(serviceUserType, message, serviceUser);
		});
	});
	describe('when service user exists in database', () => {
		describe('and the message is older than existing service user', () => {
			it('skips update', async () => {
				const mockExistingServiceUser = {
					...mockRepresentativeServiceUser,
					modifiedAt: mockFutureTime
				};
				mockFindUnique.mockResolvedValue(mockExistingServiceUser);
				const mockContextWithOlderTime = {
					...mockContext,
					bindingData: {
						...mockContext.bindingData,
						enqueuedTimeUtc: mockPastTime.toUTCString()
					}
				};
				await sendMessage(mockContextWithOlderTime, mockRepresentativeMessage);
				expect(mockUpsert).not.toHaveBeenCalled();
				expect(mockContext.log).toHaveBeenCalledWith(
					`skipping update of service user with serviceUserId: ${mockRepresentativeMessage.id}`
				);
			});
		});
		describe('and the message is newer than existing service user', () => {
			it.each([
				['Representative', mockRepresentativeMessage, mockRepresentativeServiceUser],
				['Represented', mockRepresentedMessage, mockRepresentedServiceUser],
				['Applicant', mockApplicantMessage, mockApplicantServiceUser]
			])('updates service user of type %s', async (serviceUserType, message, serviceUser) => {
				const mockExistingServiceUser = {
					...serviceUser,
					modifiedAt: mockPastTime
				};
				mockFindUnique.mockResolvedValue(mockExistingServiceUser);
				const mockContextWithNewerTime = {
					...mockContext,
					bindingData: {
						...mockContext.bindingData,
						enqueuedTimeUtc: mockFutureTime.toUTCString()
					}
				};
				await sendMessage(mockContextWithNewerTime, message);
				assertUpsert(serviceUserType, message, serviceUser);
			});
		});
	});
});
