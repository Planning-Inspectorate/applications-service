const { getRegisterOfAdviceSortByLinks } = require('./get-register-of-advice-sort-by-links');
const { mockI18n } = require('../../../_mocks/i18n');
const registerOfAdviceTranslations_EN = require('../_translations/en.json');
const i18n = mockI18n({
	registerOfAdvice: registerOfAdviceTranslations_EN
});

describe('register-of-advice/index/_utils/get-register-of-advice-sort-by-links', () => {
	describe('#getRegisterOfAdviceSortByLinks', () => {
		describe('When getting the register of advice sort by links', () => {
			describe('and there are no query parameters', () => {
				let registerOfAdviceSortByLinks;

				beforeEach(() => {
					registerOfAdviceSortByLinks = getRegisterOfAdviceSortByLinks(i18n, {});
				});

				it('should return the default register of advice sort by links', () => {
					expect(registerOfAdviceSortByLinks).toEqual([
						{ name: 'Enquiry' },
						{ name: 'Project name' },
						{ link: '?sortBy=%2BadviceDate&page=1', name: 'Date advice given', sort: 'none' }
					]);
				});
			});

			describe('and there are query parameters', () => {
				let registerOfAdviceSortByLinks;

				beforeEach(() => {
					registerOfAdviceSortByLinks = getRegisterOfAdviceSortByLinks(i18n, {
						sortBy: '+adviceDate'
					});
				});

				it('should return the register of advice sort by links with date advice given sorted by ascending', () => {
					expect(registerOfAdviceSortByLinks).toEqual([
						{ name: 'Enquiry' },
						{ name: 'Project name' },
						{ link: '?sortBy=-adviceDate&page=1', name: 'Date advice given', sort: 'ascending' }
					]);
				});
			});
		});
	});
});
