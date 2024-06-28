const enDetailedInformationTranslations = require('./en.json');
const cyDetailedInformationTranslations = require('./cy.json');

describe('pages/detailed-information/_translations', () => {
	it('should return the correct English translations', () => {
		expect(enDetailedInformationTranslations).toMatchSnapshot();
	});

	it('should return the correct Welsh translations', () => {
		expect(cyDetailedInformationTranslations).toMatchSnapshot();
	});

	it('should return the same keys for English and Welsh translations', () => {
		expect(enDetailedInformationTranslations).toHaveSameKeys(cyDetailedInformationTranslations);
	});
});
