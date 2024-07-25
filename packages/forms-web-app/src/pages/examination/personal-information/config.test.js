const { personalInformationOptionValues, getPersonalInformationOptions } = require('./config');

const { mockI18n } = require('../../_mocks/i18n');
const commonTranslations_EN = require('../../../locales/en/common.json');

describe('pages/examination/personal-information/config', () => {
	describe('#personalInformationOptionValues', () => {
		it('should return the personal information option values', () => {
			expect(personalInformationOptionValues).toEqual({ 1: 'yes', 2: 'no' });
		});
	});

	describe('#getPersonalInformationOptions', () => {
		const i18n = mockI18n({ common: commonTranslations_EN }, 'en');
		const personalInformationOptions = getPersonalInformationOptions(i18n);

		it('should return the personal information options', () => {
			expect(personalInformationOptions).toEqual({
				1: { text: 'Yes', value: 'yes' },
				2: { text: 'No', value: 'no' }
			});
		});
	});
});
