const enTranslations = require('./en.json');
const cyTranslations = require('./cy.json');

describe('pages/register-of-advice/_translations', () => {
	it('should return the correct English register-of-advice translations', () => {
		expect(enTranslations).toMatchSnapshot();
	});

	it('should return the correct Welsh register-of-advice translations', () => {
		expect(cyTranslations).toMatchSnapshot();
	});

	it('should returning matching keys for both English and Welsh translations', () => {
		expect(Object.keys(enTranslations).sort()).toStrictEqual(Object.keys(cyTranslations).sort());
	});
});
