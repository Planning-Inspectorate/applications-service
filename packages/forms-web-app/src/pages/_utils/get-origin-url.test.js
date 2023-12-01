const { getOriginURL } = require('./get-origin-url');

describe('pages/_utils/get-origin-url', () => {
	describe('#getOriginURL', () => {
		const originURL = getOriginURL();
		it('should return the origin URL', () => {
			expect(originURL).toEqual('');
		});
	});
});
