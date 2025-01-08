const {
	getProjectUpdatesData,
	getProjectDecisionDocument,
	getRule8DocumentType,
	getRule6DocumentType,
	getExaminationLibraryDocument
} = require('./services');
const { getProjectUpdates, getDocumentByType } = require('../lib/application-api-wrapper');
const { documentTypes } = require('@pins/common/src/constants');

jest.mock('../lib/application-api-wrapper', () => ({
	getProjectUpdates: jest.fn(),
	getDocumentByType: jest.fn()
}));

describe('/services', () => {
	describe('#getProjectUpdatesData', () => {
		it('should return updates data array', async () => {
			//arrange
			const mockCaseRef = 'mock case ref';
			getProjectUpdates.mockResolvedValue({
				resp_code: 200,
				data: {
					updates: ['mock update']
				}
			});

			//act
			const response = await getProjectUpdatesData(mockCaseRef);

			//assert
			expect(response).toEqual(['mock update']);
		});

		it('should return throw and error if response is NOT 200', async () => {
			//arrange
			const mockCaseRef = 'mock case ref';
			getProjectUpdates.mockResolvedValue({
				resp_code: 400,
				data: {
					updates: 'john'
				}
			});

			//act
			//assert
			await expect(getProjectUpdatesData(mockCaseRef)).rejects.toThrow(
				'Project updates response status not 200'
			);
		});

		it('should return undefined if NO updates array', async () => {
			//arrange
			const mockCaseRef = 'mock case ref';
			getProjectUpdates.mockResolvedValue({
				resp_code: 200,
				data: {}
			});

			//act
			const response = await getProjectUpdatesData(mockCaseRef);

			//assert
			expect(response).toBeUndefined();
		});
	});

	describe('#getProjectDecisionDocument', () => {
		const caseRef = 'mock case ref';
		const documentType = 'mock document type';
		const approvalDocumentType = 'DECISION_LETTER_APPROVE';
		const refusalDocumentType = 'DECISION_LETTER_REFUSE';

		it('should attempt to return the approval document, if it exists', async () => {
			//arrange
			getDocumentByType.mockResolvedValue({
				resp_code: 200,
				data: {
					id: 'mock document id',
					type: 'DCO decision letter (SoS)(approve)'
				}
			});

			//act
			const response = await getProjectDecisionDocument(caseRef, documentType);

			//assert
			expect(response).toEqual({
				id: 'mock document id',
				type: 'DCO decision letter (SoS)(approve)'
			});
			expect(getDocumentByType).toBeCalledTimes(1);
			expect(getDocumentByType).toHaveBeenNthCalledWith(1, caseRef, approvalDocumentType);
		});

		it('should attempt return the refusal document, if it exists and no approval document found', async () => {
			//arrange
			getDocumentByType.mockReturnValueOnce({
				resp_code: 404
			});
			getDocumentByType.mockReturnValueOnce({
				resp_code: 200,
				data: {
					id: 'mock document id',
					type: 'DCO decision letter (SoS)(refuse)'
				}
			});

			//act
			const response = await getProjectDecisionDocument(caseRef, documentType);

			//assert
			expect(response).toEqual({
				id: 'mock document id',
				type: 'DCO decision letter (SoS)(refuse)'
			});
			expect(getDocumentByType).toHaveBeenNthCalledWith(1, caseRef, approvalDocumentType);
			expect(getDocumentByType).toHaveBeenNthCalledWith(2, caseRef, refusalDocumentType);
			expect(getDocumentByType).toBeCalledTimes(2);
		});

		it('should return NULL if NO decision documents were found', async () => {
			//arrange
			getDocumentByType.mockReturnValueOnce({
				resp_code: 404
			});
			getDocumentByType.mockReturnValueOnce({
				resp_code: 404
			});
			//act
			const response = await getProjectDecisionDocument(caseRef, documentType);

			//assert
			expect(response).toBeNull();
			expect(getDocumentByType).toBeCalledTimes(2);
		});

		it('should throw an error if the response is not 200 or 404', async () => {
			//arrange
			getDocumentByType.mockResolvedValue({
				resp_code: 500
			});
			//act
			//assert
			await expect(getProjectDecisionDocument).rejects.toThrow(
				'500: Error fetching project document'
			);
		});
	});

	describe('#getRuleDocumentType', () => {
		describe.each([
			['getRule6DocumentType', getRule6DocumentType, documentTypes.RULE_6_LETTER],
			['getRule8DocumentType', getRule8DocumentType, documentTypes.RULE_8_LETTER],
			[
				'getExaminationLibraryDocument',
				getExaminationLibraryDocument,
				documentTypes.EXAMINATION_LIBRARY
			]
		])('#%s', (ruleName, getRuleDocumentTypeFn, documentType) => {
			it(`should call getDocumentByType with ${documentType}`, async () => {
				//arrange
				const mockCaseRef = 'mock case ref';
				// act
				await getRuleDocumentTypeFn(mockCaseRef);
				// assert
				expect(getDocumentByType).toHaveBeenCalledWith(mockCaseRef, documentType);
			});
			describe('when getDocumentByType returns a resp_code 200', () => {
				it('should return the data', async () => {
					// arrange
					const mockResponse = {
						resp_code: 200,
						data: {
							mock: 'data'
						}
					};
					getDocumentByType.mockResolvedValue(mockResponse);
					// act
					const response = await getRuleDocumentTypeFn('mock case ref');
					// assert
					expect(response).toEqual(mockResponse.data);
				});
			});
			describe('when getDocumentByType does not return a resp_code 200', () => {
				it('should return undefined', async () => {
					// arrange
					const mockResponse = {
						resp_code: 404,
						data: {}
					};
					getDocumentByType.mockResolvedValue(mockResponse);
					// act
					const response = await getRuleDocumentTypeFn('mock case ref');
					// assert
					expect(response).toBeUndefined();
				});
			});
		});
	});
});
