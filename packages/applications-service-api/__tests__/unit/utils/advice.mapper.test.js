const { mapAdviceListToApi, mapAdviceToApi } = require('../../../src/utils/advice.mapper');
const { ADVICE_BACKOFFICE_RESPONSE, ADVICE_BACKOFFICE_DATA } = require('../../__data__/advice');

describe('advice.mapper', () => {
	describe('mapAdviceListToApi', () => {
		it('maps the advice record to the API format', () => {
			const result = mapAdviceListToApi(ADVICE_BACKOFFICE_DATA);
			expect(result).toEqual(ADVICE_BACKOFFICE_RESPONSE);
		});
	});
	describe('mapAdviceToApi', () => {
		it('maps the advice record to the API format', () => {
			const mockBODocument = {
				documentId: '123',
				mime: 'application/pdf',
				size: 123,
				publishedDocumentURI: 'mock-uri'
			};
			const mockBOAdvice = {
				...ADVICE_BACKOFFICE_DATA[0],
				attachments: [mockBODocument]
			};
			const result = mapAdviceToApi(mockBOAdvice);
			expect(result).toEqual({
				...ADVICE_BACKOFFICE_RESPONSE[0],
				attachments: [
					{
						documentDataID: '123',
						mime: 'application/pdf',
						size: 123,
						documentURI: 'mock-uri'
					}
				]
			});
		});
	});
});
