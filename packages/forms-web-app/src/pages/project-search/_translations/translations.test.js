const enProjectSearchTranslations = require('./en.json');
const cyProjectSearchTranslations = require('./cy.json');

describe('pages/project-search/_translations', () => {
	it('should return the correct English translations', () => {
		expect(enProjectSearchTranslations).toMatchSnapshot();
	});

	it('should return the correct Welsh translations', () => {
		expect(cyProjectSearchTranslations).toMatchSnapshot();
	});

	it('should return the same keys for English and Welsh translations', () => {
		expect(enProjectSearchTranslations).toHaveSameKeys(cyProjectSearchTranslations);
	});
});
