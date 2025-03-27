const { addGlobalMiddleware } = require('./add-global-middleware');

const { mockI18n } = require('../_mocks/i18n');

const globalTranslation_EN = require('../../locales/en/global.json');

const globalMiddlewareTranslations = {
	global: globalTranslation_EN
};

jest.mock('../../config', () => {
	const originalConfig = jest.requireActual('../config');

	return {
		...originalConfig,
		featureFlag: {
			allowHomepage: true
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
			locals: {}
		};
		const next = jest.fn();

		beforeEach(() => {
			addGlobalMiddleware(req, res, next);
		});

		it('should add the global values to locals', () => {
			expect(res.locals).toMatchObject({
				global: {
					headerTitle: 'Find a National Infrastructure Project',
					localeSelectorLinks: {
						en: {
							active: true,
							name: 'English',
							url: '/?lang=en'
						},
						cy: {
							active: false,
							name: 'Cymraeg',
							url: '/?lang=cy'
						}
					},
					primaryNavigationLinks: [
						{ active: true, href: '/', text: 'Home' },
						{
							active: false,
							href: '/project-search',
							text: 'All projects'
						},
						{
							active: false,
							href: '/detailed-information',
							text: 'Detailed information'
						}
					]
				}
			});
		});
	});
});
