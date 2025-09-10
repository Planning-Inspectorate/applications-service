const {
	storeRegisterOfAdviceReferrerMiddleware
} = require('./store-register-of-advice-referrer-middleware');

jest.mock('../../../register-of-advice/index/_utils/get-register-of-advice-index-url', () => ({
	getRegisterOfAdviceIndexURL: jest.fn(() => 'http://localhost:9004/register-of-advice')
}));

describe('storeRegisterOfAdviceReferrerMiddleware', () => {
	let req, res, next;

	beforeEach(() => {
		req = {
			get: jest.fn(),
			session: {},
			query: {}
		};
		res = {};
		next = jest.fn();
	});

	it('should store referrer in session if coming from index page', () => {
		req.get.mockReturnValue('http://localhost:9004/register-of-advice?search=abc');
		storeRegisterOfAdviceReferrerMiddleware(req, res, next);
		expect(req.session.registerOfAdviceBackLink).toBe(
			'http://localhost:9004/register-of-advice?search=abc'
		);
		expect(next).toHaveBeenCalled();
	});

	it('should not fail if no referrer', () => {
		req.get.mockReturnValue(undefined);
		storeRegisterOfAdviceReferrerMiddleware(req, res, next);
		expect(req.session.registerOfAdviceBackLink).toBeUndefined();
		expect(next).toHaveBeenCalled();
	});

	it('should update session with correct language param when coming from detail page and language is selected', () => {
		req.get.mockReturnValue('http://localhost:9004/register-of-advice/General-Advice-00820');
		req.session.registerOfAdviceBackLink = 'http://localhost:9004/register-of-advice?search=abc';
		req.query.lang = 'cy';
		storeRegisterOfAdviceReferrerMiddleware(req, res, next);
		expect(req.session.registerOfAdviceBackLink).toBe(
			'http://localhost:9004/register-of-advice?search=abc&lang=cy'
		);
		expect(next).toHaveBeenCalled();
	});
});
