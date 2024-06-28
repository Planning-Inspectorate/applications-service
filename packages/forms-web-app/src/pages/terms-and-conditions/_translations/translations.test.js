const enTermsAndConditionsTranslations = require('./en.json');
const cyTermsAndConditionsTranslations = require('./cy.json');

describe('pages/terms-and-conditions/_translations', () => {
	it('should return the correct English translations', () => {
		expect(enTermsAndConditionsTranslations).toMatchSnapshot();
	});

	it('should return the correct Welsh translations', () => {
		expect(cyTermsAndConditionsTranslations).toMatchSnapshot();
	});

	it('should return the same keys for English and Welsh translations', () => {
		expect(enTermsAndConditionsTranslations).toHaveSameKeys(cyTermsAndConditionsTranslations);
	});
});
