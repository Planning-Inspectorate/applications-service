const { registerStartRedirectMiddleware } = require('./start-redirect-middleware');
const { getRegisterIndexURL } = require('../index/_utils/get-register-index-url');
const { buildQueryString } = require('../../../_utils/build-query-string');

describe('registerStartRedirectMiddleware', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('When the user has navigated from within the register journey', () => {
		describe('and there is no registerJourneyStarted property in the session', () => {
			it('should render the session expired error page', () => {
				const req = {
					get: jest.fn().mockReturnValue('/projects/ABC-123/register/who-registering-for'),
					session: {},
					params: { case_ref: 'ABC-123' },
					query: {}
				};

				const indexURL = getRegisterIndexURL('ABC-123');

				const res = {
					render: jest.fn(),
					status: jest.fn(() => res)
				};
				const next = jest.fn();

				registerStartRedirectMiddleware(req, res, next);

				expect(res.status).toHaveBeenCalledWith(440);
				expect(res.render).toHaveBeenCalledWith('error/have-your-say-session-expired', {
					indexURL
				});
			});
		});
	});

	describe('When the user has navigated from outside the register journey', () => {
		describe('and there is no registerJourneyStarted property in the session', () => {
			describe('and there is no query string', () => {
				it('should redirect to the register index URL', () => {
					const req = {
						get: jest.fn().mockReturnValue('/projects/ABC-123'),
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
						get: jest.fn().mockReturnValue('/projects/ABC-123'),
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
	});

	describe('When the user has started the register journey', () => {
		it('should call next()', () => {
			const req = {
				get: jest.fn().mockReturnValue('/projects/ABC-123/register/who-registering-for'),
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
