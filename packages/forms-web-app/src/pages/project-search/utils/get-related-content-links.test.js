const { getRelatedContentLinks } = require('./get-related-content-links');
const { mockI18n } = require('../../_mocks/i18n');
const translations_EN = require('../_translations/en.json');
const translations = { projectSearch: translations_EN };
const i18n = mockI18n(translations);

describe('pages/project-search/utils/get-related-content-links', () => {
	describe('#getRelatedContentLinks', () => {
		it('should return the related content links', () => {
			expect(getRelatedContentLinks(i18n)).toEqual([
				{ name: 'Register of applications', url: '/register-of-applications' }
			]);
		});
	});
});
