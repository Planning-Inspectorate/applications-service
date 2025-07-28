const { applicantOptionValues, getApplicantOptions } = require('./config');

const { mockI18n } = require('../../_mocks/i18n');
const commonTranslationsEN = require('../../../locales/en/common.json');
const commonTranslationsCY = require('../../../locales/cy/common.json');

describe('pages/examination/applicant/config', () => {
	describe('#applicantOptionValues', () => {
		it('should return the applicant option values', () => {
			expect(applicantOptionValues).toEqual({ 1: 'yes', 2: 'no' });
		});
	});

	describe('#getApplicantOptions', () => {
		describe('and the selected locale is English', () => {
			const i18n = mockI18n({
				common: commonTranslationsEN
			});

			const addAnotherDeadlineOptions = getApplicantOptions(i18n);

			expect(addAnotherDeadlineOptions).toEqual({
				1: { text: 'Yes', value: 'yes' },
				2: { text: 'No', value: 'no' }
			});
		});

		describe('and the selected locale is Welsh', () => {
			const i18n = mockI18n({
				common: commonTranslationsCY
			});

			const addAnotherDeadlineOptions = getApplicantOptions(i18n);

			expect(addAnotherDeadlineOptions).toEqual({
				1: { text: 'Ydw', value: 'yes' },
				2: { text: 'Nac ydw', value: 'no' }
			});
		});
	});
});
