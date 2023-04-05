const {
	getSelectedTimetable,
	getAndAddSelectedTimetableToSession
} = require('./get-selected-timetable');

const { getTimetables } = require('../../lib/application-api-wrapper');

jest.mock('../../lib/application-api-wrapper', () => ({
	getTimetables: jest.fn()
}));

const { fixturesTimetableResponse } = require('../../services/__mocks__/timetable.fixtures');

jest.mock('../../lib/application-api-wrapper', () => ({
	getTimetables: jest.fn()
}));

describe('utils/timetables/get-selected-timetable', () => {
	describe('#getSelectedTimetable', () => {
		describe('When getting the selected timetable', () => {
			let result;
			const caseRef = 'mock case ref';
			const timetableId = 'mock id 2';
			beforeEach(async () => {
				getTimetables.mockResolvedValue(fixturesTimetableResponse);
				result = await getSelectedTimetable(caseRef, timetableId);
			});
			it('should return the selected timetable', () => {
				expect(result).toEqual({
					selectedTimetable: {
						dateOfEvent: '2023-01-01',
						dateTimeDeadlineStart: '2023-01-01',
						description:
							'* mock timetable item 1\n * mock timetable item 2\n * mock timetable item 3',
						title: 'mock title 2',
						typeOfEvent: 'Deadline',
						uniqueId: 'mock id 2'
					},
					selectedTimetableItems: [
						{ text: 'mock timetable item 1', value: '0' },
						{
							text: 'mock timetable item 2',
							value: '1'
						},
						{ text: 'mock timetable item 3', value: '2' }
					]
				});
			});
		});
	});

	describe('#getAndAddSelectedTimetableToSession', () => {
		describe('When getting and adding the selected timetable to the session', () => {
			const session = { examination: {} };
			const caseRef = 'mock case ref';
			const timetableId = 'mock id 2';
			beforeEach(async () => {
				getTimetables.mockResolvedValue(fixturesTimetableResponse);
				await getAndAddSelectedTimetableToSession(session, caseRef, timetableId);
			});
			it('should set the selected timetable to the session', () => {
				expect(session).toEqual({
					examination: {
						deadlineItems: [
							{ text: 'mock timetable item 1', value: '0' },
							{
								text: 'mock timetable item 2',
								value: '1'
							},
							{ text: 'mock timetable item 3', value: '2' }
						],
						examinationTimetableId: 'mock id 2',
						title: 'mock title 2'
					}
				});
			});
		});
	});
});
