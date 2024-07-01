const enErrorsTranslations = require('./en/errors.json');
const cyErrorsTranslations = require('./cy/errors.json');

describe('locales/errors', () => {
	it('should return the correct English errors translations', () => {
		expect(enErrorsTranslations).toMatchSnapshot();
	});

	it('should return the correct Welsh errors translations', () => {
		expect(cyErrorsTranslations).toMatchSnapshot();
	});

	it('should return the same keys for English and Welsh translations', () => {
		expect(enErrorsTranslations).toHaveSameKeys(cyErrorsTranslations);
	});
});
