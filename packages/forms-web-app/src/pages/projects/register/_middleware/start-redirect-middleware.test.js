const { registerStartRedirectMiddleware } = require('./start-redirect-middleware');
const { getRegisterIndexURL } = require('../index/_utils/get-register-index-url');
const { buildQueryString } = require('../../../_utils/build-query-string');

describe('registerStartRedirectMiddleware', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('When the user has not started the register journey', () => {
		describe('and there is no query string', () => {
			it('should redirect to the register index URL', () => {
				const req = {
					session: {},
					query: {},
					params: { case_ref: 'ABC-123' }
				};

				const expectedIndexUrl = getRegisterIndexURL('ABC-123');

				const res = {
					redirect: jest.fn()
				};

				const next = jest.fn();

				registerStartRedirectMiddleware(req, res, next);

				expect(res.redirect).toHaveBeenCalledWith(expectedIndexUrl);
				expect(next).not.toHaveBeenCalled();
			});
		});

		describe('and there is a query string', () => {
			it('should redirect and preserve the query string', () => {
				const req = {
					session: {},
					query: { lang: 'cy' },
					params: { case_ref: 'ABC-123' }
				};

				const expectedIndexUrl = getRegisterIndexURL('ABC-123');
				const expectedQuery = buildQueryString({ lang: 'cy' });

				const res = {
					redirect: jest.fn()
				};
				const next = jest.fn();

				registerStartRedirectMiddleware(req, res, next);

				expect(res.redirect).toHaveBeenCalledWith(`${expectedIndexUrl}${expectedQuery}`);
				expect(next).not.toHaveBeenCalled();
			});
		});
	});

	describe('When the user has started the register journey', () => {
		it('should call next()', () => {
			const req = {
				session: { registerJourneyStarted: true },
				query: {},
				params: { case_ref: 'ABC-123' }
			};

			const res = {
				redirect: jest.fn()
			};
			const next = jest.fn();

			registerStartRedirectMiddleware(req, res, next);

			expect(next).toHaveBeenCalled();
			expect(res.redirect).not.toHaveBeenCalled();
		});
	});
});
