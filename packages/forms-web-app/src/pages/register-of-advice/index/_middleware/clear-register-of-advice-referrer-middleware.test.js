const {
	clearRegisterOfAdviceReferrerMiddleware
} = require('./clear-register-of-advice-referrer-middleware');

describe('clearRegisterOfAdviceReferrerMiddleware', () => {
	let req, res, next;

	beforeEach(() => {
		req = { session: { registerOfAdviceBackLink: 'some-url' } };
		res = {};
		next = jest.fn();
	});

	it('should remove registerOfAdviceBackLink from session if present', () => {
		clearRegisterOfAdviceReferrerMiddleware(req, res, next);
		expect(req.session.registerOfAdviceBackLink).toBeUndefined();
		expect(next).toHaveBeenCalled();
	});

	it('should not fail if session is missing', () => {
		req = {};
		clearRegisterOfAdviceReferrerMiddleware(req, res, next);
		expect(next).toHaveBeenCalled();
	});
});
