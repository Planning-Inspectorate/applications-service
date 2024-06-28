const enIndexTranslations = require('./en.json');
const cyIndexTranslations = require('./cy.json');

describe('pages/index/_translations', () => {
	it('should return the correct English translations', () => {
		expect(enIndexTranslations).toMatchSnapshot();
	});

	it('should return the correct Welsh translations', () => {
		expect(cyIndexTranslations).toMatchSnapshot();
	});

	it('should return the same keys for English and Welsh translations', () => {
		expect(enIndexTranslations).toHaveSameKeys(cyIndexTranslations);
	});
});
