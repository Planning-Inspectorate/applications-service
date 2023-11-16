const { documentTypes, documentTypeDictionary } = require('@pins/common/src/constants');
const { getApplicationDecision } = require('./get-application-decision');

describe('/get-application-decision', () => {
	describe('#getApplicationDecision', () => {
		it('should return "granted" if approval document provided', async () => {
			//arrange
			const document = { type: 'DCO decision letter (SoS)(approve)' };

			//act
			const result = getApplicationDecision(document, documentTypes, documentTypeDictionary);

			//assert
			expect(result).toBe('granted');
		});

		it('should return "refused" if refusal document provided', async () => {
			//arrange
			const document = { type: 'DCO decision letter (SoS)(refuse)' };

			//act
			const result = getApplicationDecision(document, documentTypes, documentTypeDictionary);

			//assert
			expect(result).toBe('refused');
		});

		it('should return "NULL if no document provided', async () => {
			//arrange
			const document = {};

			//act
			const result = getApplicationDecision(document, documentTypes, documentTypeDictionary);

			//assert
			expect(result).toBeNull();
		});
	});
});
