const enProjectTranslations = require('./en.json');
const cyProjectTranslations = require('./cy.json');

describe('pages/projects/representations/index/translations', () => {
	it('should return the correct English translations', () => {
		expect(enProjectTranslations).toMatchSnapshot();
	});

	it('should return the correct Welsh translations', () => {
		expect(cyProjectTranslations).toMatchSnapshot();
	});

	it('should return the same keys for English and Welsh translations', () => {
		expect(enProjectTranslations).toHaveSameKeys(cyProjectTranslations);
	});
});
