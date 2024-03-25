const { getRegisterEmailController, postRegisterEmailController } = require('./controller');

describe('pages/projects/register/_common/email/controller', () => {
	describe('#getRegisterEmailController', () => {
		describe('When getting the registration email page', () => {
			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};

			describe('and the user has selected myself', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/email',
					session: { mySelfRegdata: { ['email']: 'mock email' } }
				};

				beforeEach(() => {
					getRegisterEmailController(req, res);
				});

				it('should render the registration email page with the myself data', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/email/view.njk', {
						pageTitle:
							'What is your email address? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning',
						email: 'mock email'
					});
				});
			});

			describe('and the user has selected organisation', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/organisation/email',
					session: { orgRegdata: { ['email']: 'mock email' } }
				};
				beforeEach(() => {
					getRegisterEmailController(req, res);
				});
				it('should render the registration email page with the organisation data', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/email/view.njk', {
						pageTitle:
							'What is your email address? - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning',
						email: 'mock email'
					});
				});
			});

			describe('and the user has selected agent', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/agent/email',
					session: { behalfRegdata: { representor: { ['email']: 'mock email' } } }
				};
				beforeEach(() => {
					getRegisterEmailController(req, res);
				});
				it('should render the registration email page with the agent data', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/email/view.njk', {
						pageTitle:
							'What is your email address? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning',
						email: 'mock email'
					});
				});
			});
		});

		describe('and there is an error', () => {
			const res = {
				locals: { baseUrl: '/mock-base-url/mock-case-ref' },
				render: jest.fn(),
				status: jest.fn(() => res)
			};
			const req = { session: 'mock session' };
			it('should throw an error', () => {
				expect(() => getRegisterEmailController(req, res)).toThrowError(
					"Cannot read properties of undefined (reading 'split')"
				);
			});
		});
	});

	describe('#postRegisterEmailController', () => {
		describe('When posting the registration email address', () => {
			let req;

			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res),
				send: jest.fn()
			};

			beforeEach(() => {
				req = {
					body: {
						email: 'mock body email address'
					},
					params: {
						case_ref: 'mock-case-ref'
					}
				};
			});

			describe('and there is an unrecoverable error', () => {
				beforeEach(() => {
					req = {};

					postRegisterEmailController(req, res);
				});

				it('should render the error page', () => {
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});

			describe('and there is an error in the form', () => {
				beforeEach(() => {
					req = {
						...req,
						originalUrl: '/mock-base-url/mock-case-ref/register/myself/email',
						session: { mySelfRegdata: { email: 'mock email address' }, typeOfParty: 'myself' },
						body: {
							errors: { email: 'an error' },
							errorSummary: [{ text: 'Error summary', href: '#' }]
						}
					};

					postRegisterEmailController(req, res);
				});

				it('should render email address page with the error', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/email/view.njk', {
						errorSummary: [{ href: '#', text: 'Error summary' }],
						errors: { email: 'an error' },
						pageTitle:
							'What is your email address? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning'
					});
				});
			});

			describe('When the user is in edit mode', () => {
				beforeEach(() => {
					req = {
						...req,
						query: { mode: 'edit' }
					};
				});

				describe('and the user has previously selected agent and submitted an email address', () => {
					beforeEach(() => {
						req = {
							...req,
							originalUrl: '/mock-base-url/mock-case-ref/register/agent/email',
							session: {
								behalfRegdata: { representor: { email: 'mock session email address' } },
								typeOfParty: 'behalf'
							}
						};

						postRegisterEmailController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							behalfRegdata: { representor: { email: 'mock body email address' } },
							typeOfParty: 'behalf'
						});
					});

					it('should redirect to the register agent check answers page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/agent/check-answers'
						);
					});
				});

				describe('and the user has previously selected myself and submitted an email address', () => {
					beforeEach(() => {
						req = {
							...req,
							originalUrl: '/mock-base-url/mock-case-ref/register/myself/email',
							session: {
								mySelfRegdata: { email: 'mock session email address' },
								typeOfParty: 'myself'
							}
						};

						postRegisterEmailController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							mySelfRegdata: { email: 'mock body email address' },
							typeOfParty: 'myself'
						});
					});

					it('should redirect to the register myself check answers page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/myself/check-answers'
						);
					});
				});

				describe('and the user has previously selected organisation and submitted an email address', () => {
					beforeEach(() => {
						req = {
							...req,
							originalUrl: '/mock-base-url/mock-case-ref/register/organisation/email',
							session: { orgRegdata: { email: 'mock email address' }, typeOfParty: 'organisation' }
						};

						postRegisterEmailController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							orgRegdata: { email: 'mock body email address' },
							typeOfParty: 'organisation'
						});
					});

					it('should redirect to the register organisation check answers page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/organisation/check-answers'
						);
					});
				});
			});

			describe('When the user is NOT in edit mode', () => {
				describe('and the user has previously selected agent and submitted an email address', () => {
					beforeEach(() => {
						req = {
							...req,
							originalUrl: '/mock-base-url/mock-case-ref/register/agent/email',
							session: {
								behalfRegdata: { representor: {} },
								typeOfParty: 'behalf'
							}
						};

						postRegisterEmailController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							behalfRegdata: { representor: { email: 'mock body email address' } },
							typeOfParty: 'behalf'
						});
					});

					it('should redirect to the register agent address page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/agent/address'
						);
					});
				});

				describe('and the user has previously selected myself and submitted an email address', () => {
					beforeEach(() => {
						req = {
							...req,
							originalUrl: '/mock-base-url/mock-case-ref/register/myself/email',
							session: {
								mySelfRegdata: {},
								typeOfParty: 'myself'
							}
						};

						postRegisterEmailController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							mySelfRegdata: { email: 'mock body email address' },
							typeOfParty: 'myself'
						});
					});

					it('should redirect to the register myself address page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/myself/address'
						);
					});
				});

				describe('and the user has previously selected organisation and submitted an email address', () => {
					beforeEach(() => {
						req = {
							...req,
							originalUrl: '/mock-base-url/mock-case-ref/register/organisation/email',
							session: { orgRegdata: {}, typeOfParty: 'organisation' }
						};

						postRegisterEmailController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							orgRegdata: { email: 'mock body email address' },
							typeOfParty: 'organisation'
						});
					});

					it('should redirect to the register organisation address page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/organisation/address'
						);
					});
				});
			});
		});
	});
});
