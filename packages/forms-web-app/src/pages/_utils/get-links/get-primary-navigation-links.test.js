const { getPrimaryNavigationLinks } = require('./get-primary-navigation-links');

jest.mock('../../../config', () => {
	const originalConfig = jest.requireActual('../../../config');

	return {
		...originalConfig,
		featureFlag: {
			allowHomepage: true,
			usePrivateBetaV1RoutesOnly: false
		}
	};
});

describe('pages/_utils/get-links/get-primary-navigation-links', () => {
	describe('#getPrimaryNavigationLinks', () => {
		let primaryNavigationLinks;
		const mockPageURL = '/';

		beforeEach(() => {
			primaryNavigationLinks = getPrimaryNavigationLinks(mockPageURL);
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
