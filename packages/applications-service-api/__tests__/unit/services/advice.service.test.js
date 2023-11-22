const { getAllAdvice } = require('../../../src/services/advice.service');
const {
	ADVICE_BACKOFFICE_RESPONSE,
	ADVICE_BACKOFFICE_DATA,
	ADVICE_NI_RESPONSE,
	ADVICE_NI_DATA
} = require('../../__data__/advice');
const {
	getAllAdviceByCaseReference: getAllBackOfficeAdviceBORepository
} = require('../../../src/repositories/advice.backoffice.repository');
const {
	getAllAdviceByCaseReference: getAllBackOfficeAdviceNIRepository
} = require('../../../src/repositories/advice.ni.repository');
const { mapBackOfficeAdviceToApi } = require('../../../src/utils/advice.mapper');
const config = require('../../../src/lib/config');

jest.mock('../../../src/repositories/advice.backoffice.repository');
jest.mock('../../../src/repositories/advice.ni.repository');
jest.mock('../../../src/utils/advice.mapper');

config.backOfficeIntegration.advice.getAdvice.caseReferences = ['BACKOFFICE-CASEID'];
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
			mapBackOfficeAdviceToApi.mockReturnValue(ADVICE_BACKOFFICE_RESPONSE);
		});
		describe('when case reference is back office', () => {
			it('should get advice from back office repository', async () => {
				await getAllAdvice({ caseRef: 'BACKOFFICE-CASEID' });
				expect(getAllBackOfficeAdviceBORepository).toHaveBeenCalledWith(
					'BACKOFFICE-CASEID',
					0,
					25,
					undefined
				);
			});
			it('should map advice to api', async () => {
				await getAllAdvice({ caseRef: 'BACKOFFICE-CASEID' });
				expect(mapBackOfficeAdviceToApi).toHaveBeenCalledWith(ADVICE_BACKOFFICE_DATA);
			});
			it('should return mapped advice', async () => {
				const result = await getAllAdvice({ caseRef: 'BACKOFFICE-CASEID' });
				expect(result).toEqual({
					advice: ADVICE_BACKOFFICE_RESPONSE,
					totalItems: 1,
					itemsPerPage: 25,
					totalPages: 1,
					currentPage: 1
				});
			});
		});
		describe('when case reference is ni', () => {
			it('should get advice from ni repository', async () => {
				await getAllAdvice({ caseRef: 'NI-CASEID' });
				expect(getAllBackOfficeAdviceNIRepository).toHaveBeenCalledWith(
					'NI-CASEID',
					0,
					25,
					undefined
				);
			});
			it('should return advice', async () => {
				const result = await getAllAdvice({ caseRef: 'NI-CASEID' });
				expect(result).toEqual({
					advice: ADVICE_NI_RESPONSE,
					totalItems: 1,
					itemsPerPage: 25,
					totalPages: 1,
					currentPage: 1
				});
			});
		});
	});

	/**
	 * Will be updated in ASB-2025 where this endpoint will be extended for BO integration
	 * and this service will use service repository pattern
	 * it will call to the repository instead of the model directly (like above)
	 */
	// describe('getAdviceById', () => {
	// 	it('should get advice from mock model', async () => {
	// 		mockFindOne.mockResolvedValueOnce(Advice.build({ ...mockAdvice }));
	// 		mockFindAllAttachmentsWithCase.mockResolvedValueOnce([
	// 			Attachment.build({ ...mockAttachment })
	// 		]);
	//
	// 		const advice = await getAdviceById('adviceid123');
	// 		delete advice.id;
	// 		delete advice.createdAt;
	// 		delete advice.updatedAt;
	// 		const attachment = advice.attachments[0];
	// 		delete attachment.id;
	// 		delete attachment.createdAt;
	// 		delete attachment.updatedAt;
	//
	// 		expect(advice).toEqual({
	// 			...mockAdvice,
	// 			attachments: [{ ...mockAttachment }]
	// 		});
	// 	});
	// });
});
