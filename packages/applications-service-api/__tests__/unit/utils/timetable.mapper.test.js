const {
	mapBackOfficeTimetableToApi,
	mapNITimetableToApi
} = require('../../../src/utils/timetable.mapper');
const {
	TIMETABLES_NI_RESPONSE,
	TIMETABLES_NI_DATA,
	TIMETABLES_BACKOFFICE_RESPONSE,
	TIMETABLES_BACKOFFICE_DATA
} = require('../../__data__/timetables');
describe('timetable.mapper', () => {
	describe('mapBackOfficeTimetableToApi', () => {
		it('maps the back office timetable record to the API format', () => {
			const result = mapBackOfficeTimetableToApi(TIMETABLES_BACKOFFICE_DATA);
			expect(result).toEqual(TIMETABLES_BACKOFFICE_RESPONSE);
		});
	});
	describe('mapNITimetableToApi', () => {
		it('maps the NI timetable record to the API format', () => {
			const result = mapNITimetableToApi(TIMETABLES_NI_DATA);
			expect(result).toEqual(TIMETABLES_NI_RESPONSE);
		});
	});
});
