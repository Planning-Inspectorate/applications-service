const sendMessage = require('../index');

const mockDeleteMany = jest.fn();

jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		examinationTimetable: {
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
	caseReference: 'mock-case-ref'
};

describe('nsip-exam-timetable-unpublish', () => {
	it('logs message', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockContext.log).toHaveBeenCalledWith('invoking nsip-exam-timetable-unpublish');
	});

	it('throws an error if caseReference is missing', async () => {
		await expect(sendMessage(mockContext, {})).rejects.toThrow('caseReference is required');
	});

	it('unpublishes exam time table', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockDeleteMany).toHaveBeenCalledWith({
			where: {
				caseReference: mockMessage.caseReference
			}
		});
		expect(mockContext.log).toHaveBeenCalledWith(
			`unpublished ExaminationTimetable with caseReference: ${mockMessage.caseReference}`
		);
	});
});
