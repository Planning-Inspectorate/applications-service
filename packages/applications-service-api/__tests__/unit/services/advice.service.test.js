const { getAllAdvice, getAdviceById } = require('../../../src/services/advice.service');
const { ADVICE_BACKOFFICE_RESPONSE, ADVICE_BACKOFFICE_DATA } = require('../../__data__/advice');
const {
	getAllAdviceByCaseReference: getAllBackOfficeAdviceBORepository,
	getAdviceById: getBackOfficeAdviceByIdRepository
} = require('../../../src/repositories/advice.repository');
const { mapAdviceListToApi, mapAdviceToApi } = require('../../../src/utils/advice.mapper');
jest.mock('../../../src/repositories/advice.repository');
jest.mock('../../../src/repositories/document.repository');
jest.mock('../../../src/utils/advice.mapper');

describe('Advice Service', () => {
	describe('getAllAdvice', () => {
		beforeAll(() => {
			getAllBackOfficeAdviceBORepository.mockResolvedValue({
				advice: ADVICE_BACKOFFICE_DATA,
				count: 1
			});
			mapAdviceListToApi.mockReturnValue(ADVICE_BACKOFFICE_RESPONSE);
		});
		it('should get advice from back office repository', async () => {
			await getAllAdvice({ caseReference: 'BACKOFFICE-CASEID' });
			expect(getAllBackOfficeAdviceBORepository).toHaveBeenCalledWith(
				'BACKOFFICE-CASEID',
				0,
				25,
				undefined
			);
		});
		it('should map advice to api', async () => {
			await getAllAdvice({ caseReference: 'BACKOFFICE-CASEID' });
			expect(mapAdviceListToApi).toHaveBeenCalledWith(ADVICE_BACKOFFICE_DATA);
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

	describe('getAdviceById', () => {
		beforeAll(() => {
			getBackOfficeAdviceByIdRepository.mockResolvedValue(ADVICE_BACKOFFICE_DATA[0]);
			mapAdviceToApi.mockReturnValue(ADVICE_BACKOFFICE_RESPONSE[0]);
		});
		it('should get advice from back office repository', async () => {
			await getAdviceById('123', 'BACKOFFICE-CASEID');
			expect(getBackOfficeAdviceByIdRepository).toHaveBeenCalledWith('123');
		});
		it('should map advice to api', async () => {
			await getAdviceById('123', 'BACKOFFICE-CASEID');
			expect(mapAdviceToApi).toHaveBeenCalledWith(ADVICE_BACKOFFICE_DATA[0]);
		});
		it('should return mapped advice', async () => {
			const result = await getAdviceById('123', 'BACKOFFICE-CASEID');
			expect(result).toEqual(ADVICE_BACKOFFICE_RESPONSE[0]);
		});
	});
});
