const { getHasOpenTimetables } = require('./get-has-open-timetables');
const { getTimetables } = require('../../../../services/timetable.service');
const { fixturesTimetableResponse } = require('../../../../services/__mocks__/timetable.fixtures');

jest.mock('../../../../services/timetable.service', () => ({
	getTimetables: jest.fn()
}));
describe('#getHasOpenTimetables', () => {
	describe('When there are open deadline for a timetable', () => {
		let response;
		beforeEach(async () => {
			jest.useFakeTimers().setSystemTime(new Date('2023-01-02'));
			getTimetables.mockReturnValue(fixturesTimetableResponse);
			response = await getHasOpenTimetables('mock case ref');
		});
		it('should return true', () => {
			expect(response).toBe(true);
		});

		describe('When there are NO open deadline for a timetable', () => {
			let response;
			beforeEach(async () => {
				jest.useFakeTimers().setSystemTime(new Date('2023-01-28'));
				getTimetables.mockReturnValue(fixturesTimetableResponse);
				response = await getHasOpenTimetables('mock case ref');
			});
			it('should return false', () => {
				expect(response).toBe(false);
			});
		});
	});
});
