const { addAnotherDeadlineItemOptionValues, getAddAnotherDeadlineOptions } = require('./config');

const { mockI18n } = require('../../_mocks/i18n');
const commonTranslationsEN = require('../../../locales/en/common.json');
const commonTranslationsCY = require('../../../locales/cy/common.json');

describe('pages/examination/add-another-deadline-item/config', () => {
	describe('#addAnotherDeadlineItemOptionValues', () => {
		it('should return the add another deadline option values', () => {
			expect(addAnotherDeadlineItemOptionValues).toEqual({ 1: 'yes', 2: 'no' });
		});
	});

	describe('#getAddAnotherDeadlineOptions', () => {
		describe('and the selected locale is English', () => {
			const i18n = mockI18n({
				common: commonTranslationsEN
			});

			const addAnotherDeadlineOptions = getAddAnotherDeadlineOptions(i18n);

			expect(addAnotherDeadlineOptions).toEqual({
				1: { text: 'Yes', value: 'yes' },
				2: { text: 'No', value: 'no' }
			});
		});

		describe('and the selected locale is Welsh', () => {
			const i18n = mockI18n({
				common: commonTranslationsCY
			});

			const addAnotherDeadlineOptions = getAddAnotherDeadlineOptions(i18n);

			expect(addAnotherDeadlineOptions).toEqual({
				1: { text: 'Oes', value: 'yes' },
				2: { text: 'Nac oes', value: 'no' }
			});
		});
	});
});
