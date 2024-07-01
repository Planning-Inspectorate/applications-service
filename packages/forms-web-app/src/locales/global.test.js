const enGlobalTranslations = require('./en/global.json');
const cyGlobalTranslations = require('./cy/global.json');

describe('locales/global', () => {
	it('should return the correct English global translations', () => {
		expect(enGlobalTranslations).toMatchSnapshot();
	});

	it('should return the correct Welsh global translations', () => {
		expect(cyGlobalTranslations).toMatchSnapshot();
	});

	it('should return the same keys for English and Welsh translations', () => {
		expect(enGlobalTranslations).toHaveSameKeys(cyGlobalTranslations);
	});
});
