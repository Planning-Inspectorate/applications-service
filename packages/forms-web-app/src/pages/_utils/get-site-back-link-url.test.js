const { getSiteBackLinkURL } = require('./get-site-back-link-url');

jest.mock('../../config', () => {
	return { server: { host: 'from-site' } };
});

describe('pages/_utils/get-site-back-link-url', () => {
	describe('#getSiteBackLinkURL', () => {
		describe('When getting the site back link URL', () => {
			describe('and the previous URL is from another site', () => {
				let siteBackLinkURL;
				const mockPreviousURL = 'another-site/page';

				beforeEach(() => {
					siteBackLinkURL = getSiteBackLinkURL(mockPreviousURL);
				});

				it('should return null', () => {
					expect(siteBackLinkURL).toEqual(null);
				});
			});

			describe('and the previous URL is from the site', () => {
				let siteBackLinkURL;
				const mockPreviousURL = 'from-site/page';

				beforeEach(() => {
					siteBackLinkURL = getSiteBackLinkURL(mockPreviousURL);
				});

				it('should return the previous site URL', () => {
					expect(siteBackLinkURL).toEqual('from-site/page');
				});
			});
		});
	});
});
