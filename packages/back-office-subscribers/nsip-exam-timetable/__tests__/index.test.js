const sendMessage = require('../index');

jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		$transaction: jest.fn(),
		examinationTimetable: {
			findUnique: jest.fn()
		},
		examinationTimetableEventItem: {
			findUnique: jest.fn()
		}
	}
}));
describe('nsip-exam-timetable', () => {
	beforeAll(() => jest.useFakeTimers());
	afterAll(() => jest.useRealTimers());

	// todo message is logged
	// todo exam-timetable
	// todo when current exam-timetable doesnt exist -> create
	// todo when enqueuedTimeUtc is newer than current exam-timetable modifiedAt -> update
	// todo when enqueuedTimeUtc is older than current exam-timetable modifiedAt -> ignore
	// todo exam-timetable-event-item
	// todo when current exam-timetable-event-item doesnt exist -> create
	// todo when enqueuedTimeUtc is newer than current exam-timetable-event-item modifiedAt -> update
	// todo when enqueuedTimeUtc is older than current exam-timetable-event-item modifiedAt -> ignore

	const mockContext = {
		log: jest.fn(),
		bindingData: {
			enqueuedTimeUtc: 1,
			deliveryCount: 1,
			messageId: 123
		}
	};

	const mockMessage = {
		examinationTimetableId: 1,
		events: [
			{
				eventId: 1,
				type: 'Preliminary Meeting',
				eventTitle: 'Example Preliminary Meeting',
				description: 'A preliminary meeting will be held to discuss the examination process.',
				eventDeadlineStartDate: '2023-06-10',
				caseReference: 'CASE-REF1',
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
				caseReference: 'CASE-REF2',

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

	it('logs message', async () => {
		await sendMessage(mockContext, mockMessage);

		expect(mockContext.log).toBeCalledWith(
			`invoking nsip-exam-timetable function with message: ${JSON.stringify(mockMessage)}`
		);
	});

	describe('when current examinationTimetable with examinationTimetableId does not exist in database', () => {
		it('creates examinationTimetable', async () => {
			// mock prismaClient.examinationTimetable.findUnique to return null

			await sendMessage(mockContext, mockMessage);

			expect(mockContext.log).toBeCalledWith(
				`examinationTimetableId not present in message: ${JSON.stringify(mockContext)}`
			);
		});
	});
});
