const {
	getHasProjectTimetablesSession,
	setHasProjectTimetablesSession
} = require('./has-project-timetables-session');

describe('pages/projects/examination-timetable/_session/has-project-timetables-session', () => {
	describe('#getHasProjectTimetablesSession', () => {
		let hasProjectTimetablesSession;

		const mockCaseRef = 'mock case ref';
		const mockSession = {
			hasTimetables: {
				[mockCaseRef]: true
			}
		};

		beforeEach(() => {
			hasProjectTimetablesSession = getHasProjectTimetablesSession(mockSession, mockCaseRef);
		});

		it('should return the session value', () => {
			expect(hasProjectTimetablesSession).toEqual(true);
		});
	});

	describe('#setHasProjectTimetablesSession', () => {
		const mockSession = {};
		const mockCaseRef = 'mock case ref';
		const mockHasProjectTimetables = true;

		beforeEach(() => {
			setHasProjectTimetablesSession(mockSession, mockCaseRef, mockHasProjectTimetables);
		});

		it('should set the values to the session', () => {
			expect(mockSession).toEqual({ hasTimetables: { 'mock case ref': true } });
		});
	});
});
