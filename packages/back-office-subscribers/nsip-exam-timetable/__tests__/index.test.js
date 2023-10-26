const sendMessage = require('../index');
const { prismaClient } = require('../../lib/prisma');

const mockFindMany = jest.fn();
const mockDeleteMany = jest.fn();
const mockCreate = jest.fn();

jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		$transaction: jest.fn().mockImplementation((callback) =>
			callback({
				examinationTimetable: {
					findMany: mockFindMany,
					deleteMany: mockDeleteMany,
					create: mockCreate
				}
			})
		)
	}
}));

const mockContext = {
	log: jest.fn(),
	bindingData: {
		enqueuedTimeUtc: new Date('2023-01-01T00:00:00.000Z').toUTCString(),
		deliveryCount: 1,
		messageId: 123
	}
};

const mockMessage = {
	examinationTimetableId: 1,
	caseReference: 'CASE-REF2',
	events: [
		{
			eventId: 1,
			type: 'Preliminary Meeting',
			eventTitle: 'Example Preliminary Meeting',
			description: 'A preliminary meeting will be held to discuss the examination process.',
			eventDeadlineStartDate: '2023-06-10',
			date: '2023-06-10',
			eventLineItems: [
				{
					eventLineItemId: 1,
					eventLineItemDescription: 'Item 1 Preliminary Description'
				},
				{
					eventLineItemId: 2,
					eventLineItemDescription: 'Item 2 Preliminary Description'
				}
			]
		},
		{
			eventId: 2,
			type: 'Deadline',
			eventTitle: 'Deadline Event',
			description: 'A deadline meeting description',
			eventDeadlineStartDate: '2023-05-10',

			date: '2023-05-10',
			eventLineItems: [
				{
					eventLineItemId: 3,
					eventLineItemDescription: 'Item 1 Deadline Description'
				},
				{
					eventLineItemId: 4,
					eventLineItemDescription: 'Item 2 Deadline Description'
				}
			]
		}
	]
};

const assertEventsCreated = (message) => {
	expect(mockCreate).toBeCalledTimes(message.events.length);
	message.events.forEach((event) => {
		expect(mockCreate).toBeCalledWith({
			data: {
				examinationTimetableId: message.examinationTimetableId,
				caseReference: message.caseReference,
				type: event.type,
				eventTitle: event.eventTitle,
				description: event.description,
				eventDeadlineStartDate: new Date(event.eventDeadlineStartDate),
				date: new Date(event.date),
				eventId: event.eventId,
				eventLineItems: {
					create: event.eventLineItems?.map((eventLineItem) => ({
						eventLineItemId: eventLineItem.eventLineItemId,
						eventLineItemDescription: eventLineItem.eventLineItemDescription
					}))
				},
				createdAt: new Date('2023-01-01T00:00:00.000Z'),
				modifiedAt: new Date('2023-01-01T00:00:00.000Z')
			}
		});
	});
};
describe('nsip-exam-timetable', () => {
	beforeEach(() => {
		mockFindMany.mockClear();
		mockDeleteMany.mockClear();
		mockCreate.mockClear();
	});
	beforeAll(() => {
		jest.useFakeTimers();
		jest.setSystemTime(new Date('2023-01-01T00:00:00.000Z'));
	});
	afterAll(() => {
		jest.useRealTimers();
	});

	it('logs message', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockContext.log).toBeCalledWith(`invoking nsip-exam-timetable function`);
	});

	it('start transaction', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(prismaClient.$transaction).toBeCalled();
	});

	it('finds existing events to determine if it should update', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockFindMany).toBeCalledWith({
			where: {
				examinationTimetableId: mockMessage.examinationTimetableId
			},
			rejectOnNotFound: false,
			take: 1
		});
	});

	describe('when no events exist in database', () => {
		beforeAll(() => {
			mockFindMany.mockResolvedValue([]);
		});
		it('creates new events for examinationTimetableId', async () => {
			await sendMessage(mockContext, mockMessage);
			assertEventsCreated(mockMessage);
		});
		it('logs message that it is updating events', async () => {
			await sendMessage(mockContext, mockMessage);
			expect(mockContext.log).toBeCalledWith(
				`created / updated events with examinationTimetableId: ${mockMessage.examinationTimetableId}`
			);
		});
	});

	describe('when message time is newer than existing events', () => {
		beforeAll(() => {
			mockFindMany.mockResolvedValue([
				{
					examinationTimetableId: mockMessage.examinationTimetableId,
					modifiedAt: new Date('2021-01-01T00:00:00.000Z')
				}
			]);
		});
		it('deletes existing events for examinationTimetableId', async () => {
			await sendMessage(mockContext, mockMessage);
			expect(mockDeleteMany).toBeCalledWith({
				where: {
					examinationTimetableId: mockMessage.examinationTimetableId
				}
			});
		});
		it('creates new events for examinationTimetableId', async () => {
			await sendMessage(mockContext, mockMessage);
			assertEventsCreated(mockMessage);
		});
		it('logs message that it is updating events', async () => {
			await sendMessage(mockContext, mockMessage);
			expect(mockContext.log).toBeCalledWith(
				`created / updated events with examinationTimetableId: ${mockMessage.examinationTimetableId}`
			);
		});
	});

	describe('when message time is older than existing events', () => {
		beforeAll(() => {
			mockFindMany.mockResolvedValue([
				{
					examinationTimetableId: mockMessage.examinationTimetableId,
					modifiedAt: new Date('2023-02-01T00:00:00.000Z')
				}
			]);
		});
		const mockContextWithOlderTime = {
			...mockContext,
			bindingData: {
				...mockContext.bindingData,
				enqueuedTimeUtc: new Date('2022-01-01T00:00:00.000Z').toUTCString()
			}
		};
		it('does not update events', async () => {
			await sendMessage(mockContextWithOlderTime, mockMessage);
			expect(mockDeleteMany).not.toBeCalled();
			expect(mockCreate).not.toBeCalled();
		});
		it('logs message that it is skipping update', async () => {
			await sendMessage(mockContextWithOlderTime, mockMessage);
			expect(mockContext.log).toBeCalledWith(
				`skipping update for examinationTimetableId: ${mockMessage.examinationTimetableId} as message is older than existing events`
			);
		});
	});
});
