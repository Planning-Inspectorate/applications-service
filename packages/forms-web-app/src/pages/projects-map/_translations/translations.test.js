const enProjectsMapTranslations = require('./en.json');
const cyProjectsMapTranslations = require('./cy.json');

describe('pages/projects-map/_translations', () => {
	it('should return the correct English translations', () => {
		expect(enProjectsMapTranslations).toMatchSnapshot();
	});

	it('should return the correct Welsh translations', () => {
		expect(cyProjectsMapTranslations).toMatchSnapshot();
	});

	it('should return the same keys for English and Welsh translations', () => {
		expect(enProjectsMapTranslations).toHaveSameKeys(cyProjectsMapTranslations);
	});
});
