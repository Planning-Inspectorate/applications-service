const { getFooterLinks } = require('./get-footer-links');
const { mockI18n } = require('../../_mocks/i18n');

const globalTranslation_EN = require('../../../locales/en/global.json');

const footerLinksTranslations = { global: globalTranslation_EN };

describe('pages/_utils/get-links/get-footer-links', () => {
	describe('#getFooterLinks', () => {
		const i18n = mockI18n(footerLinksTranslations);

		const footerLinks = getFooterLinks(i18n);
		it('should return the footer links', () => {
			expect(footerLinks).toEqual([
				{
					attrs: { 'data-cy': 'Terms and conditions' },
					href: '/terms-and-conditions',
					text: 'Terms and conditions'
				},
				{
					attrs: { 'data-cy': 'Accessibility' },
					href: '/accessibility-statement',
					text: 'Accessibility statement'
				},
				{
					attrs: { 'data-cy': 'Privacy Notice (on GOV.UK)' },
					href: 'https://www.gov.uk/government/publications/planning-inspectorate-privacy-notices/customer-privacy-notice',
					text: 'Privacy'
				},
				{ attrs: { 'data-cy': 'Cookies' }, href: '/cookies', text: 'Cookies' },
				{ attrs: { 'data-cy': 'Contact' }, href: '/contact', text: 'Contact' }
			]);
		});
	});
});
