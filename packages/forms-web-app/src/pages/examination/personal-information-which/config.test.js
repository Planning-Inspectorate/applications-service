const {
	personalInformationWhichOptionValues,
	getPersonalInformationWhichOptions
} = require('./config');
const { mockI18n } = require('../../_mocks/i18n');
const examinationTranslations_EN = require('../_translations/en.json');

describe('pages/examination/personal-information-which/config', () => {
	describe('#personalInformationWhichOptionValues', () => {
		it('should return the personal information which option values', () => {
			expect(personalInformationWhichOptionValues).toEqual({ 1: 'comment' });
		});
	});

	describe('#getPersonalInformationWhichOptions', () => {
		const i18n = mockI18n({ examination: examinationTranslations_EN });
		const personalInformationWhichOptions = getPersonalInformationWhichOptions(i18n);
		it('should return the personal information which options', () => {
			expect(personalInformationWhichOptions).toEqual({
				1: { text: 'My comment', value: 'comment' }
			});
		});
	});
});
