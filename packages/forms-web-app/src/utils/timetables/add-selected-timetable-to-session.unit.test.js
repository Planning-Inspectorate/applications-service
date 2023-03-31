const { addSelectedTimetableToSession } = require('./add-selected-timetable-to-session');
describe('#addSelectedTimetableToSession', () => {
	describe('When adding the selected timetable to the session', () => {
		const mockSession = {
			examination: {
				mock: 'examination session'
			}
		};
		const mockDeadlineItems = ['mock deadline item 1', 'mock deadline item 2'];
		const mockSelectedDeadline = {
			title: 'mock selected deadline title',
			uniqueId: 'mock selected deadline unique id'
		};

		beforeEach(() => {
			addSelectedTimetableToSession(mockSession, mockDeadlineItems, mockSelectedDeadline);
		});

		it('should add the selected timetable to the session', () => {
			expect(mockSession).toEqual({
				examination: {
					deadlineItems: ['mock deadline item 1', 'mock deadline item 2'],
					examinationTimetableId: 'mock selected deadline unique id',
					mock: 'examination session',
					title: 'mock selected deadline title'
				}
			});
		});
	});
});
