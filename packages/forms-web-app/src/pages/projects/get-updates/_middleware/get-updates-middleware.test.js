const { getUpdatesMiddleware } = require('./get-updates-middleware');

describe('pages/projects/get-updates/_middleware/get-updates-middleware.test.js', () => {
	describe('#getUpdatesMiddleware', () => {
		const res = {
			redirect: jest.fn()
		};
		const next = jest.fn();
		const getUpdatesIndexURL = jest.fn();

		const req = {
			originalUrl: '/projects/testCaseRef1/get-updates/test',
			params: { case_ref: 'testCaseRef1' },
			session: {
				getUpdates: {
					caseRef: 'testCaseRef2'
				}
			}
		};

		describe('When attempting to continue Get Updates journey', () => {
			describe('and the case ref does not match the case ref stored in the session', () => {
				describe('and the current URL does not match that of the get-updates index page', () => {
					it('redirects to the get-updates index page ', () => {
						getUpdatesIndexURL.mockReturnValue('/projects/testCaseRef1/get-updates/start');
						getUpdatesMiddleware(req, res, next);
						expect(res.redirect).toHaveBeenCalledWith('/projects/testCaseRef1/get-updates/start');
					});
				});

				describe('and the current URL matches that of the get-updates index page', () => {
					it('calls next()', () => {
						const req = {
							orginalUrl: '/projects/testCaseRef1/get-updates/start',
							params: { caseRef: 'testCaseRef1' },
							session: {
								getUpdates: {
									sessionCaseRef: 'testCaseRef2'
								}
							}
						};
						getUpdatesIndexURL.mockReturnValue('/projects/testCaseRef1/get-updates/start');
						getUpdatesMiddleware(req, res, next);
						expect(next).toHaveBeenCalledWith();
					});
				});
			});

			describe('and the case ref matches the case ref stored in the session', () => {
				it('calls next()', () => {
					const req = {
						params: { caseRef: 'testCaseRef1' },
						session: {
							getUpdates: {
								sessionCaseRef: 'testCaseRef1'
							}
						}
					};
					getUpdatesMiddleware(req, res, next);
					expect(next).toHaveBeenCalledWith();
				});
			});

			it('Should redirect to the project root when there is no get-updates session', () => {
				const req = {
					params: { case_ref: 'testCaseRef1' },
					session: {}
				};

				getUpdatesMiddleware(req, res, next);

				expect(res.redirect).toHaveBeenCalledWith('/projects/testCaseRef1');
				expect(next).not.toHaveBeenCalled();
			});
		});
	});
});
