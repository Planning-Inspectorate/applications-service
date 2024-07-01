const enCommonTranslations = require('./en/common.json');
const cyCommonTranslations = require('./cy/common.json');

describe('locales/common', () => {
	it('should return the correct English common translations', () => {
		expect(enCommonTranslations).toMatchSnapshot();
	});

	it('should return the correct Welsh common translations', () => {
		expect(cyCommonTranslations).toMatchSnapshot();
	});

	it('should return the same keys for English and Welsh translations', () => {
		expect(enCommonTranslations).toHaveSameKeys(cyCommonTranslations);
	});
});
