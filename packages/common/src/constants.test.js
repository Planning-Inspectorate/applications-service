const { documentTypes, documentTypeDictionary } = require('./constants');

describe('constants', () => {
	for (const docType of Object.keys(documentTypes)) {
		it('should use the correct type for ' + docType, () => {
			expect(typeof documentTypes[docType]).toBe('string');
		});
		it('should have dictionary entry for ' + docType, () => {
			expect(docType in documentTypeDictionary).toBe(true);
		});
		it('should have dictionary entry for ' + docType, () => {
			const entry = documentTypeDictionary[docType];
			expect(entry).toMatchObject(
				expect.objectContaining({
					bo: expect.any(String),
					ni: expect.any(String)
				})
			);
		});
	}
});
