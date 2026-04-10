const enTranslations = require('./en.json');
const cyTranslations = require('./cy.json');

describe('pages/projects/get-updates/confirm-your-email/_translations', () => {
	it('should return the correct English translations', () => {
		expect(enTranslations).toMatchSnapshot();
	});

	it('should return the correct Welsh translations', () => {
		expect(cyTranslations).toMatchSnapshot();
	});

	it('should return the same keys for English and Welsh translations', () => {
		expect(enTranslations).toHaveSameKeys(cyTranslations);
	});
});
