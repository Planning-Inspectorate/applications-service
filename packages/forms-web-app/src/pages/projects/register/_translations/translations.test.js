const enCookiesTranslations = require('./en.json');
const cyCookiesTranslations = require('./cy.json');

describe('pages/cookies/_translations', () => {
	it('should return the correct English translations', () => {
		expect(enCookiesTranslations).toMatchSnapshot();
	});

	it('should return the correct Welsh translations', () => {
		expect(cyCookiesTranslations).toMatchSnapshot();
	});

	it('should return the same keys for English and Welsh translations', () => {
		expect(enCookiesTranslations).toHaveSameKeys(cyCookiesTranslations);
	});
});
