const enProcessGuideTranslations = require('./en.json');
const cyProcessGuideTranslations = require('./cy.json');

describe('pages/process-guide/_translations', () => {
	it('should return the correct English translations', () => {
		expect(enProcessGuideTranslations).toMatchSnapshot();
	});

	it('should return the correct Welsh translations', () => {
		expect(cyProcessGuideTranslations).toMatchSnapshot();
	});

	it('should return the same keys for English and Welsh translations', () => {
		expect(enProcessGuideTranslations).toHaveSameKeys(cyProcessGuideTranslations);
	});
});
