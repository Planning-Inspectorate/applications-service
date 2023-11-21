const { mapBackOfficeAdviceToApi } = require('../../../src/utils/advice.mapper');
const { ADVICE_BACKOFFICE_RESPONSE, ADVICE_BACKOFFICE_DATA } = require('../../__data__/advice');
describe('advice.mapper', () => {
	describe('mapBackOfficeAdviceToApi', () => {
		it('maps the advice record to the API format', () => {
			const result = mapBackOfficeAdviceToApi(ADVICE_BACKOFFICE_DATA);
			expect(result).toEqual(ADVICE_BACKOFFICE_RESPONSE);
		});
	});
});
