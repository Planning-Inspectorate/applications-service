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
				locals: {},
				get: jest.fn().mockReturnValue('app-insights-correlation-id'),
				status: jest.fn()
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
				render: jest.fn(),
				get: jest.fn().mockReturnValue('app-insights-correlation-id'),
				status: jest.fn()
			};
			//mock the express method chaining of res.status().render()
			res.status.mockReturnValue(res);
			registerMiddleware(req, res, next);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.render).toHaveBeenCalledWith('error/have-your-say-journey-error', {
				correlationId: 'app-insights-correlation-id'
			});
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
				render: jest.fn(),
				get: jest.fn().mockReturnValue('app-insights-correlation-id'),
				status: jest.fn()
			};

			//mock the express method chaining of res.status().render()
			res.status.mockReturnValue(res);

			registerMiddleware(req, res, next);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.render).toHaveBeenCalledWith('error/have-your-say-journey-error', {
				correlationId: 'app-insights-correlation-id'
			});
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
				render: jest.fn(),
				get: jest.fn().mockReturnValue('app-insights-correlation-id'),
				status: jest.fn()
			};

			//mock the express method chaining of res.status().render()
			res.status.mockReturnValue(res);

			registerMiddleware(req, res, next);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.render).toHaveBeenCalledWith('error/have-your-say-journey-error', {
				correlationId: 'app-insights-correlation-id'
			});
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
				render: jest.fn(),
				get: jest.fn().mockReturnValue('app-insights-correlation-id'),
				status: jest.fn()
			};
			//mock the express method chaining of res.status().render()
			res.status.mockReturnValue(res);

			registerMiddleware(req, res, next);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.render).toHaveBeenCalledWith('error/have-your-say-journey-error', {
				correlationId: 'app-insights-correlation-id'
			});
		});
	});
});
