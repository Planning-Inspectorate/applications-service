const { getTitles } = require('./get-titles');

const { mockI18n } = require('../../../_mocks/i18n');

const examinationTranslations__EN = require('../../_translations/en.json');

const i18n = mockI18n({
	examination: examinationTranslations__EN
});

describe('pages/examination/name/utils/get-titles', () => {
	describe('#getTitles', () => {
		describe('When on the name agent page', () => {
			const route = 'name-of-person-or-group';

			it('should return the name agent page titles', () => {
				expect(getTitles(i18n, route)).toEqual({
					pageTitle: `What's the full name of the person, household or organisation?`,
					title: `What's the full name of the person, household or organisation?`
				});
			});
		});

		describe('When on the name myself page', () => {
			const route = 'your-name';

			it('should return the name myself page titles', () => {
				expect(getTitles(i18n, route)).toEqual({
					pageTitle: 'What is your full name?',
					title: 'What is your full name?'
				});
			});
		});

		describe('When on the name organisation page', () => {
			const route = 'your-organisation-name';

			it('should return the name organisation page titles', () => {
				expect(getTitles(i18n, route)).toEqual({
					pageTitle: `What's your organisation's name?`,
					title: `What's your organisation's name?`
				});
			});
		});
	});
});
