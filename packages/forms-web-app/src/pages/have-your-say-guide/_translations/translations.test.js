const enHaveYourSayGuideTranslations = require('./en.json');
const cyHaveYourSayGuideTranslations = require('./cy.json');

describe('pages/have-your-say-guide/_translations', () => {
	it('should return the correct English translations', () => {
		expect(enHaveYourSayGuideTranslations).toMatchSnapshot();
	});

	it('should return the correct Welsh translations', () => {
		expect(cyHaveYourSayGuideTranslations).toMatchSnapshot();
	});

	it('should return the same keys for English and Welsh translations', () => {
		expect(enHaveYourSayGuideTranslations).toHaveSameKeys(cyHaveYourSayGuideTranslations);
	});
});
