const {
	mapBackOfficeAdviceListToApi,
	mapBackOfficeAdviceToApi,
	mapNIAdviceToApi
} = require('../../../src/utils/advice.mapper');
const {
	ADVICE_BACKOFFICE_RESPONSE,
	ADVICE_BACKOFFICE_DATA,
	GENERAL_ADVICE_BACKOFFICE_RESPONSE,
	GENERAL_ADVICE_BACKOFFICE_DATA,
	ADVICE_NI_RESPONSE,
	ADVICE_NI_DATA
} = require('../../__data__/advice');
const { documentsHost } = require('../../../src/lib/config');

describe('advice.mapper', () => {
	describe('mapBackOfficeAdviceListToApi', () => {
		it('maps the project specific advice record to the API format', () => {
			const result = mapBackOfficeAdviceListToApi(ADVICE_BACKOFFICE_DATA);
			expect(result).toEqual(ADVICE_BACKOFFICE_RESPONSE);
		});
		it('maps the general advice record to the API format', () => {
			const result = mapBackOfficeAdviceListToApi(GENERAL_ADVICE_BACKOFFICE_DATA);
			expect(result).toEqual(GENERAL_ADVICE_BACKOFFICE_RESPONSE);
		});
	});
	describe('mapBackOfficeAdviceToApi', () => {
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
			const result = mapBackOfficeAdviceToApi(mockBOAdvice);
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
	describe('mapNIAdviceToApi', () => {
		it('maps the advice record to the API format', () => {
			const mockNIDocument = {
				dataID: '123',
				mime: 'application/pdf',
				size: 123,
				path: 'mock-uri'
			};
			const mockNIAdvice = {
				...ADVICE_NI_DATA[0],
				attachments: [mockNIDocument]
			};
			const result = mapNIAdviceToApi(mockNIAdvice);
			expect(result).toEqual({
				...ADVICE_NI_RESPONSE[0],
				attachments: [
					{
						documentDataID: '123',
						mime: 'application/pdf',
						size: 123,
						documentURI: `${documentsHost}mock-uri`
					}
				]
			});
		});
	});
});
