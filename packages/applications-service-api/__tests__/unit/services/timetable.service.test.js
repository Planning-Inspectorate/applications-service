const { getTimetables } = require('../../../src/services/timetable.service');
const {
	TIMETABLES_BACKOFFICE_RESPONSE,
	TIMETABLES_BACKOFFICE_DATA
} = require('../../__data__/timetables');
const {
	getTimetablesByCaseReference: getBackOfficeTimetable
} = require('../../../src/repositories/timetable.backoffice.repository');
const { mapBackOfficeTimetableToApi } = require('../../../src/utils/timetable.mapper');

jest.mock('../../../src/repositories/timetable.backoffice.repository');
jest.mock('../../../src/repositories/timetable.ni.repository');
jest.mock('../../../src/utils/timetable.mapper');
describe('timetable service', () => {
	describe('back office', () => {
		beforeAll(() => {
			getBackOfficeTimetable.mockResolvedValue(TIMETABLES_BACKOFFICE_DATA);
			mapBackOfficeTimetableToApi.mockReturnValue(TIMETABLES_BACKOFFICE_RESPONSE);
		});
		it('calls back office getTimetablesByCaseReference repository', async () => {
			await getTimetables('BACKOFFICE-CASEID');
			expect(getBackOfficeTimetable).toHaveBeenCalledWith('BACKOFFICE-CASEID');
		});
		it('calls mapBackOfficeTimetableToApi', async () => {
			await getTimetables('BACKOFFICE-CASEID');
			expect(mapBackOfficeTimetableToApi).toHaveBeenCalledWith(TIMETABLES_BACKOFFICE_DATA);
		});
		it('returns mapped timetable', async () => {
			const result = await getTimetables('BACKOFFICE-CASEID');
			expect(result).toEqual(TIMETABLES_BACKOFFICE_RESPONSE);
		});
	});
});
