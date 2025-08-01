const { getShortDocLinkURL } = require('./get-short-doc-link-url');

describe('pages/redirects/short-document-link/index/_utils', () => {
	describe('#getShortDocLinkURL', () => {
		describe('When getting the short -document link URL', () => {
			const shortDocLinkUrl = getShortDocLinkURL();
			it('should return the projects index URL with the route parameters', () => {
				expect(shortDocLinkUrl).toEqual('/document/:docRef');
			});
		});
	});
});
