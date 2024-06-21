const {
	mapBackOfficeTimetableToApi,
	mapNITimetableToApi
} = require('../../../src/utils/timetable.mapper');
const {
	TIMETABLES_NI_RESPONSE,
	TIMETABLES_NI_DATA,
	TIMETABLES_BACKOFFICE_RESPONSE,
	TIMETABLES_BACKOFFICE_DATA,
	TIMETABLES_BACKOFFICE_DATA_WITH_WELSH,
	TIMETABLES_BACKOFFICE_RESPONSE_WITH_WELSH
} = require('../../__data__/timetables');
describe('timetable.mapper', () => {
	describe('mapBackOfficeTimetableToApi', () => {
		describe('maps the back office timetable record to the API format', () => {
			it('with only english fields', () => {
				const result = mapBackOfficeTimetableToApi(TIMETABLES_BACKOFFICE_DATA);
				expect(result).toEqual(TIMETABLES_BACKOFFICE_RESPONSE);
			});
			it('with welsh fields', () => {
				const result = mapBackOfficeTimetableToApi(TIMETABLES_BACKOFFICE_DATA_WITH_WELSH);
				expect(result).toEqual(TIMETABLES_BACKOFFICE_RESPONSE_WITH_WELSH);
			});
		});
		describe('mapNITimetableToApi', () => {
			it('maps the NI timetable record to the API format', () => {
				const result = mapNITimetableToApi(TIMETABLES_NI_DATA);
				expect(result).toEqual(TIMETABLES_NI_RESPONSE);
			});
		});
	});
});
