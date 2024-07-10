const { mapTimetableToAPI } = require('../../../src/utils/timetable.mapper');
const {
	TIMETABLES_BACKOFFICE_RESPONSE,
	TIMETABLES_BACKOFFICE_DATA,
	TIMETABLES_BACKOFFICE_DATA_WITH_WELSH,
	TIMETABLES_BACKOFFICE_RESPONSE_WITH_WELSH
} = require('../../__data__/timetables');
describe('timetable.mapper', () => {
	describe('mapTimetableToAPI', () => {
		describe('maps the timetable record to the API format', () => {
			it('with only english fields', () => {
				const result = mapTimetableToAPI(TIMETABLES_BACKOFFICE_DATA);
				expect(result).toEqual(TIMETABLES_BACKOFFICE_RESPONSE);
			});
			it('with welsh fields', () => {
				const result = mapTimetableToAPI(TIMETABLES_BACKOFFICE_DATA_WITH_WELSH);
				expect(result).toEqual(TIMETABLES_BACKOFFICE_RESPONSE_WITH_WELSH);
			});
		});
	});
});
