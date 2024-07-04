const enTranslations = require('./en.json');
const cyTranslations = require('./cy.json');

describe('pages/projects/documents/_translations', () => {
	it('should return the correct English projects documents translations', () => {
		expect(enTranslations).toMatchSnapshot();
	});

	it('should return the correct Welsh projects documents translations', () => {
		expect(cyTranslations).toMatchSnapshot();
	});

	it('should returning matching keys for both English and Welsh translations', () => {
		expect(Object.keys(enTranslations).sort()).toStrictEqual(Object.keys(cyTranslations).sort());
	});
});
