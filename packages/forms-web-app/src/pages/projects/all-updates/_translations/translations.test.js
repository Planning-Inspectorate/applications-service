const enTranslations = require('./en.json');
const cyTranslations = require('./cy.json');

describe('pages/projects/all-updates/_translations', () => {
	it('should return the correct English all project updates translations', () => {
		expect(enTranslations).toMatchSnapshot();
	});

	it('should return the correct Welsh all project updates translations', () => {
		expect(cyTranslations).toMatchSnapshot();
	});

	it('should return matching keys for both English and Welsh translations', () => {
		expect(Object.keys(enTranslations).sort()).toStrictEqual(Object.keys(cyTranslations).sort());
	});
});
