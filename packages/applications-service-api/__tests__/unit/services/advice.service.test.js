const { getAllAdvice, getAdviceById } = require('../../../src/services/advice.service');
const {
	ADVICE_BACKOFFICE_RESPONSE,
	ADVICE_BACKOFFICE_DATA,
	ADVICE_NI_RESPONSE,
	ADVICE_NI_DATA
} = require('../../__data__/advice');
const {
	getAllAdviceByCaseReference: getAllBackOfficeAdviceBORepository,
	getAdviceById: getBackOfficeAdviceByIdRepository
} = require('../../../src/repositories/advice.backoffice.repository');
const {
	getAllAdviceByCaseReference: getAllBackOfficeAdviceNIRepository,
	getAdviceById: getNIAdviceByIdRepository
} = require('../../../src/repositories/advice.ni.repository');
const {
	mapBackOfficeAdviceListToApi,
	mapBackOfficeAdviceToApi,
	mapNIAdviceToApi
} = require('../../../src/utils/advice.mapper');

jest.mock('../../../src/repositories/advice.backoffice.repository');
jest.mock('../../../src/repositories/advice.ni.repository');
jest.mock('../../../src/repositories/document.backoffice.repository');
jest.mock('../../../src/repositories/document.ni.repository');
jest.mock('../../../src/utils/advice.mapper');

describe('Advice Service', () => {
	describe('getAllAdvice', () => {
		beforeAll(() => {
			getAllBackOfficeAdviceBORepository.mockResolvedValue({
				advice: ADVICE_BACKOFFICE_DATA,
				count: 1
			});
			getAllBackOfficeAdviceNIRepository.mockResolvedValue({
				advice: ADVICE_NI_DATA,
				count: 1
			});
			mapBackOfficeAdviceListToApi.mockReturnValue(ADVICE_BACKOFFICE_RESPONSE);
		});
		describe('when case reference is back office', () => {
			it('should get advice from back office repository', async () => {
				await getAllAdvice({ caseReference: 'BACKOFFICE-CASEID' });
				expect(getAllBackOfficeAdviceBORepository).toHaveBeenCalledWith(
					'BACKOFFICE-CASEID',
					0,
					25,
					undefined,
					[{ adviceDate: 'asc' }, { adviceId: 'asc' }]
				);
			});
			it('should map advice to api', async () => {
				await getAllAdvice({ caseReference: 'BACKOFFICE-CASEID' });
				expect(mapBackOfficeAdviceListToApi).toHaveBeenCalledWith(ADVICE_BACKOFFICE_DATA);
			});
			it('should return mapped advice', async () => {
				const result = await getAllAdvice({ caseReference: 'BACKOFFICE-CASEID' });
				expect(result).toEqual({
					advice: ADVICE_BACKOFFICE_RESPONSE,
					totalItems: 1,
					itemsPerPage: 25,
					totalPages: 1,
					currentPage: 1
				});
			});
		});
	});

	describe('getAdviceById', () => {
		beforeAll(() => {
			getBackOfficeAdviceByIdRepository.mockResolvedValue(ADVICE_BACKOFFICE_DATA[0]);
			getNIAdviceByIdRepository.mockResolvedValue(ADVICE_NI_DATA[0]);
			mapBackOfficeAdviceToApi.mockReturnValue(ADVICE_BACKOFFICE_RESPONSE[0]);
			mapNIAdviceToApi.mockReturnValue(ADVICE_NI_RESPONSE[0]);
		});
		describe('when case reference is back office', () => {
			it('should get advice from back office repository', async () => {
				await getAdviceById('123', 'BACKOFFICE-CASEID');
				expect(getBackOfficeAdviceByIdRepository).toHaveBeenCalledWith('123');
			});
			it('should map advice to api', async () => {
				await getAdviceById('123', 'BACKOFFICE-CASEID');
				expect(mapBackOfficeAdviceToApi).toHaveBeenCalledWith(ADVICE_BACKOFFICE_DATA[0]);
			});
			it('should return mapped advice', async () => {
				const result = await getAdviceById('123', 'BACKOFFICE-CASEID');
				expect(result).toEqual(ADVICE_BACKOFFICE_RESPONSE[0]);
			});
		});
	});
});
