const {
	selectIfWantToDeleteDataOptionValues,
	getSelectIfWantToDeleteDataOptions
} = require('./config');

const { mockI18n } = require('../../_mocks/i18n');
const commonTranslationsEN = require('../../../locales/en/common.json');
const commonTranslationsCY = require('../../../locales/cy/common.json');

describe('pages/examination/select-if-want-to-delete-data/config', () => {
	describe('#selectIfWantToDeleteDataOptionValues', () => {
		it('should return the select if want to delete data option values', () => {
			expect(selectIfWantToDeleteDataOptionValues).toEqual({ 1: 'yes', 2: 'no' });
		});
	});

	describe('#getSelectIfWantToDeleteDataOptions', () => {
		describe('and the selected locale is English', () => {
			const i18n = mockI18n({
				common: commonTranslationsEN
			});

			const addAnotherDeadlineOptions = getSelectIfWantToDeleteDataOptions(i18n);

			expect(addAnotherDeadlineOptions).toEqual({
				1: { text: 'Yes', value: 'yes' },
				2: { text: 'No', value: 'no' }
			});
		});

		describe('and the selected locale is Welsh', () => {
			const i18n = mockI18n({
				common: commonTranslationsCY
			});

			const addAnotherDeadlineOptions = getSelectIfWantToDeleteDataOptions(i18n);

			expect(addAnotherDeadlineOptions).toEqual({
				1: { text: 'Ydw', value: 'yes' },
				2: { text: 'Nac ydw', value: 'no' }
			});
		});
	});
});
