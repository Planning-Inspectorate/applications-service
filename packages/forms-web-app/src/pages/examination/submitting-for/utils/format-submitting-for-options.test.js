const { formatSubmittingForOptions } = require('./format-submitting-for-options');

const { mockI18n } = require('../../../_mocks/i18n');

const examinationTranslations__EN = require('../../_translations/en.json');

const i18n = mockI18n({
	examination: examinationTranslations__EN
});

describe('pages/examination/submitting-for/utils/format-submitting-for-options', () => {
	describe('#formatSubmittingForOptions', () => {
		describe('When getting the options for the submitting for page', () => {
			describe('and the user has not previously selected an option', () => {
				let result;

				const mockSession = { examination: {} };

				beforeEach(() => {
					result = formatSubmittingForOptions(i18n, mockSession);
				});
				it('should return the options for the submitting for page', () => {
					expect(result).toEqual([
						{
							text: 'Myself',
							value: 'myself'
						},
						{
							text: 'An organisation I work for',
							value: 'organisation'
						},
						{
							text: 'On behalf of another person, a household or another organisation I do not work for',
							value: 'agent'
						}
					]);
				});
			});
			describe('and the user has previously selected an option', () => {
				let result;

				const mockSession = { examination: { submittingFor: 'myself' } };

				beforeEach(() => {
					result = formatSubmittingForOptions(i18n, mockSession);
				});
				it('should return the options for the submitting for page with the selected option checked', () => {
					expect(result).toEqual([
						{
							checked: 'checked',
							text: 'Myself',
							value: 'myself'
						},
						{
							text: 'An organisation I work for',
							value: 'organisation'
						},
						{
							text: 'On behalf of another person, a household or another organisation I do not work for',
							value: 'agent'
						}
					]);
				});
			});
		});
	});
});
