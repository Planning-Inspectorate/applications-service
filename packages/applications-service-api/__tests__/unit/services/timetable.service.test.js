const { getTimetables } = require('../../../src/services/timetable.service');
const {
	TIMETABLES_BACKOFFICE_RESPONSE,
	TIMETABLES_BACKOFFICE_DATA
} = require('../../__data__/timetables');
const {
	getTimetablesByCaseReference: getTimeTableRepository
} = require('../../../src/repositories/timetable.repository');
const { mapTimetableToAPI } = require('../../../src/utils/timetable.mapper');

jest.mock('../../../src/repositories/timetable.repository');
jest.mock('../../../src/utils/timetable.mapper');
describe('timetable service', () => {
	describe('back office', () => {
		beforeAll(() => {
			getTimeTableRepository.mockResolvedValue(TIMETABLES_BACKOFFICE_DATA);
			mapTimetableToAPI.mockReturnValue(TIMETABLES_BACKOFFICE_RESPONSE);
		});
		it('calls back office getTimetablesByCaseReference repository', async () => {
			await getTimetables('BACKOFFICE-CASEID');
			expect(getTimeTableRepository).toHaveBeenCalledWith('BACKOFFICE-CASEID');
		});
		it('calls mapTimetableToAPI', async () => {
			await getTimetables('BACKOFFICE-CASEID');
			expect(mapTimetableToAPI).toHaveBeenCalledWith(TIMETABLES_BACKOFFICE_DATA);
		});
		it('returns mapped timetable', async () => {
			const result = await getTimetables('BACKOFFICE-CASEID');
			expect(result).toEqual(TIMETABLES_BACKOFFICE_RESPONSE);
		});
	});
});
