const { getTimetables } = require('../../../src/services/timetable.service');
const {
	TIMETABLES_NI_RESPONSE,
	TIMETABLES_NI_DATA,
	TIMETABLES_BACKOFFICE_RESPONSE,
	TIMETABLES_BACKOFFICE_DATA
} = require('../../__data__/timetables');
const {
	getTimetablesByCaseReference: getBackOfficeTimetable
} = require('../../../src/repositories/timetable.repository');
const {
	getTimetablesByCaseReference: getNITimetable
} = require('../../../src/repositories/timetable.ni.repository');
const {
	mapBackOfficeTimetableToApi,
	mapNITimetableToApi
} = require('../../../src/utils/timetable.mapper');
const { isBackOfficeCaseReference } = require('../../../src/utils/is-backoffice-case-reference');

jest.mock('../../../src/repositories/timetable.backoffice.repository');
jest.mock('../../../src/repositories/timetable.ni.repository');
jest.mock('../../../src/utils/timetable.mapper');
jest.mock('../../../src/utils/is-backoffice-case-reference');
describe('timetable service', () => {
	beforeAll(() => {
		isBackOfficeCaseReference.mockImplementation(
			(caseReference) => caseReference === 'BACKOFFICE-CASEID'
		);
	});
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
	describe('ni', () => {
		beforeAll(() => {
			getNITimetable.mockResolvedValue(TIMETABLES_NI_DATA);
			mapNITimetableToApi.mockReturnValue(TIMETABLES_NI_RESPONSE);
		});
		it('calls ni getTimetablesByCaseReference repository', async () => {
			await getTimetables('NI-CASEID');
			expect(getNITimetable).toHaveBeenCalledWith('NI-CASEID');
		});
		it('calls mapNITimetableToApi', async () => {
			await getTimetables('NI-CASEID');
			expect(mapNITimetableToApi).toHaveBeenCalledWith(TIMETABLES_NI_DATA);
		});
		it('returns mapped timetable', async () => {
			const result = await getTimetables('NI-CASEID');
			expect(result).toEqual(TIMETABLES_NI_RESPONSE);
		});
	});
});
