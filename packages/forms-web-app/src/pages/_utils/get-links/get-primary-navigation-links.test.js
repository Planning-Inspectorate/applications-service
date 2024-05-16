const { getPrimaryNavigationLinks } = require('./get-primary-navigation-links');

const { mockI18n } = require('../../_mocks/i18n');

const globalTranslation_EN = require('../../../locales/en/global.json');

const primaryNavigationLinksTranslations = {
	global: globalTranslation_EN
};

jest.mock('../../../config', () => {
	const originalConfig = jest.requireActual('../../../config');

	return {
		...originalConfig,
		featureFlag: {
			allowHomepage: true
		}
	};
});

describe('pages/_utils/get-links/get-primary-navigation-links', () => {
	describe('#getPrimaryNavigationLinks', () => {
		let primaryNavigationLinks;
		const mockPath = '/';

		beforeEach(() => {
			primaryNavigationLinks = getPrimaryNavigationLinks(
				mockPath,
				mockI18n(primaryNavigationLinksTranslations)
			);
		});
		it('should return the primary navigation links', () => {
			expect(primaryNavigationLinks).toEqual([
				{ active: true, href: '/', text: 'Home' },
				{ active: false, href: '/project-search', text: 'All projects' },
				{ active: false, href: '/detailed-information', text: 'Detailed information' }
			]);
		});
	});
});
