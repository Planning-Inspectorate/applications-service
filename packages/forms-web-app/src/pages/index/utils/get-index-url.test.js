const { getIndexURL } = require('./get-index-url');

describe('pages/index/utils/get-index-url', () => {
	describe('#getIndexURL', () => {
		const indexURL = getIndexURL();
		it('should return the index URL', () => {
			expect(indexURL).toEqual('/');
		});
	});
});
