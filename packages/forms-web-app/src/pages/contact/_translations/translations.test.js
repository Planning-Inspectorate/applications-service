const enContactTranslations = require('./en.json');
const cyContactTranslations = require('./cy.json');

describe('pages/contact/_translations', () => {
	it('should return the correct English translations', () => {
		expect(enContactTranslations).toMatchSnapshot();
	});

	it('should return the correct Welsh translations', () => {
		expect(cyContactTranslations).toMatchSnapshot();
	});

	it('should return the same keys for English and Welsh translations', () => {
		expect(enContactTranslations).toHaveSameKeys(cyContactTranslations);
	});
});
