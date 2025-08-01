const { shortDocRoute, shortDocParam } = require('./config');

describe('pages/redirects/short-document-link/config', () => {
	describe('#shortDocRoute', () => {
		it('should return the document route', () => {
			expect(shortDocRoute).toEqual('document');
		});
	});
	describe('#shortDocParam', () => {
		it('should return the document route param', () => {
			expect(shortDocParam).toEqual('docRef');
		});
	});
});
