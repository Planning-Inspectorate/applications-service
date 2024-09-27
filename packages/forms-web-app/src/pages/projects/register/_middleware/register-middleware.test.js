const { registerMiddleware } = require('./register-middleware');

describe('#registerMiddleware', () => {
	describe('pages/projects/register/_middleware/register-middleware', () => {
		it('registerMiddleware - no errors', () => {
			const next = jest.fn();
			const req = {
				get: jest.fn().mockReturnValue('referrer-response'),
				session: {
					registerJourneyStarted: true,
					caseRef: 'a-case-ref'
				},
				params: {
					case_ref: 'a-case-ref'
				}
			};
			const res = {
				locals: {}
			};
			registerMiddleware(req, res, next);
			expect(next).toHaveBeenCalled();
		});
		it('registerMiddleware - no registerJourneyStarted in session', () => {
			const next = jest.fn();
			const req = {
				get: jest.fn().mockReturnValue('referrer-response'),
				session: {
					caseRef: 'a-case-ref'
				},
				params: {
					case_ref: 'a-case-ref'
				}
			};
			const res = {
				locals: {},
				render: jest.fn()
			};
			registerMiddleware(req, res, next);
			expect(res.render).toHaveBeenCalledWith('error/have-your-say-journey-error');
		});
		it('registerMiddleware - no case_ref in params', () => {
			const next = jest.fn();
			const req = {
				get: jest.fn().mockReturnValue('referrer-response'),
				session: {
					registerJourneyStarted: true,
					caseRef: 'a-case-ref'
				},
				params: {}
			};
			const res = {
				locals: {},
				render: jest.fn()
			};
			registerMiddleware(req, res, next);
			expect(res.render).toHaveBeenCalledWith('error/have-your-say-journey-error');
		});
		it('registerMiddleware - no caseRef in session', () => {
			const next = jest.fn();
			const req = {
				get: jest.fn().mockReturnValue('referrer-response'),
				session: {
					registerJourneyStarted: true
				},
				params: {
					case_ref: 'a-case-ref'
				}
			};
			const res = {
				locals: {},
				render: jest.fn()
			};
			registerMiddleware(req, res, next);
			expect(res.render).toHaveBeenCalledWith('error/have-your-say-journey-error');
		});
		it('registerMiddleware - no caseRef in session', () => {
			const next = jest.fn();
			const req = {
				get: jest.fn().mockReturnValue('referrer-response'),
				session: {
					registerJourneyStarted: true,
					caseRef: 'not-a-match-case-ref'
				},
				params: {
					case_ref: 'a-case-ref'
				}
			};
			const res = {
				locals: {},
				render: jest.fn()
			};
			registerMiddleware(req, res, next);
			expect(res.render).toHaveBeenCalledWith('error/have-your-say-journey-error');
		});
	});
});
