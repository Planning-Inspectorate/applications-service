const { addGlobalMiddleware } = require('./add-global-middleware');

const { mockI18n } = require('../_mocks/i18n');

const globalTranslation_EN = require('../../locales/en/global.json');

const globalMiddlewareTranslations = {
	global: globalTranslation_EN
};

jest.mock('../../config', () => {
	const originalConfig = jest.requireActual('../../config');
	return {
		...originalConfig,
		featureFlag: {
			allowHomepage: true
		},
		plannedServiceOutage: {
			globalBannerText: 'mock warning text'
		}
	};
});

describe('pages/_middleware/add-global-middleware', () => {
	describe('#addGlobalMiddleware', () => {
		const req = {
			cookies: {},
			i18n: mockI18n(globalMiddlewareTranslations),
			path: '/',
			query: {}
		};
		const res = {
			locals: {
				global: {}
			}
		};
		const next = jest.fn();

		beforeEach(() => {
			addGlobalMiddleware(req, res, next);
		});

		it('should add the global values to locals', () => {
			expect(res.locals.global).toStrictEqual({
				headerTitle: 'Find a National Infrastructure Project',
				footerLinks: [
					{
						text: 'Terms and conditions',
						href: '/terms-and-conditions',
						attrs: { 'data-cy': 'Terms and conditions' }
					},
					{
						text: 'Accessibility statement',
						href: '/accessibility-statement',
						attrs: { 'data-cy': 'Accessibility' }
					},
					{
						text: 'Privacy',
						href: 'https://www.gov.uk/government/publications/planning-inspectorate-privacy-notices/customer-privacy-notice',
						attrs: { 'data-cy': 'Privacy Notice (on GOV.UK)' }
					},
					{
						text: 'Cookies',
						href: '/cookies',
						attrs: { 'data-cy': 'Cookies' }
					},
					{
						text: 'Contact',
						href: '/contact',
						attrs: { 'data-cy': 'Contact' }
					}
				],
				localeSelectorLinks: {
					en: { active: true, name: 'English', url: '/?lang=en' },
					cy: { active: false, name: 'Cymraeg', url: '/?lang=cy' }
				},
				primaryNavigationLinks: [
					{ text: 'Home', href: '/', active: true },
					{ text: 'All projects', href: '/project-search', active: false },
					{
						text: 'Detailed information',
						href: '/detailed-information',
						active: false
					}
				],
				backLinkText: 'Back',
				globalBannerText: 'mock warning text'
			});
		});
	});
});
