const { handleEncodedSpacesInUrl } = require('../../../src/middleware/handle-encoded-spaces');

describe('#handleEncodedSpacesInUrl', () => {
	let req;
	let res;
	let next;

	beforeEach(() => {
		req = {
			url: ''
		};
		res = {
			redirect: jest.fn()
		};
		next = jest.fn();
	});

	it('should call next if the URL does not change', () => {
		req.url = '/mock/url';

		handleEncodedSpacesInUrl(req, res, next);

		expect(next).toHaveBeenCalled();
		expect(res.redirect).not.toHaveBeenCalled();
	});

	it('should trim all URL segments and redirect to new URL', () => {
		req.url = '/mock/%20url/%20test';

		handleEncodedSpacesInUrl(req, res, next);

		expect(res.redirect).toHaveBeenCalledWith(301, '/mock/url/test');
		expect(next).not.toHaveBeenCalled();
	});
});
