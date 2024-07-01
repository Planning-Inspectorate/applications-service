const { getRegisterNumberController, postRegisterNumberController } = require('./controller');

describe('pages/projects/register/_common/number/controller', () => {
	describe('#getRegisterNumberController', () => {
		describe('When getting the registration telephone number page', () => {
			const res = {
				locals: { baseUrl: '/mock-base-url/mock-case-ref' },
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};
			describe('and the user has selected myself', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/telephone-number',
					session: { mySelfRegdata: { ['telephone']: 'mock telephone number' } }
				};
				beforeEach(() => {
					getRegisterNumberController(req, res);
				});
				it('should render the registration telephone number page with the myself data', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/number/view.njk', {
						key: 'myself',
						telephone: 'mock telephone number'
					});
				});
			});
			describe('and the user has selected organisation', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/organisation/telephone-number',
					session: { orgRegdata: { ['telephone']: 'mock telephone number' } }
				};
				beforeEach(() => {
					getRegisterNumberController(req, res);
				});
				it('should render the registration telephone number page with the organisation data', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/number/view.njk', {
						key: 'organisation',
						telephone: 'mock telephone number'
					});
				});
			});
			describe('and the user has selected agent', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/agent/telephone-number',
					session: {
						behalfRegdata: { representor: { ['telephone']: 'mock telephone number' } }
					}
				};
				beforeEach(() => {
					getRegisterNumberController(req, res);
				});
				it('should render the registration telephone number page with the agent data', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/number/view.njk', {
						key: 'agent',
						telephone: 'mock telephone number'
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
				expect(() => getRegisterNumberController(req, res)).toThrowError(
					"Cannot read properties of undefined (reading 'split')"
				);
			});
		});
	});

	describe('#postRegisterNumberController', () => {
		describe('When posting the registration telephone number', () => {
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
						telephone: 'mock body telephone number'
					},
					params: {
						case_ref: 'mock-case-ref'
					}
				};
			});

			describe('and there is an unrecoverable error', () => {
				const req = {};
				beforeEach(() => {
					postRegisterNumberController(req, res);
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
						session: {
							mySelfRegdata: { telephone: 'mock telephone number' },
							typeOfParty: 'myself'
						},
						body: {
							errors: { telephone: 'an error' },
							errorSummary: [{ text: 'Error summary', href: '#' }]
						}
					};

					postRegisterNumberController(req, res);
				});

				it('should render telephone number page with the error', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/number/view.njk', {
						errorSummary: [
							{
								href: '#',
								text: 'Error summary'
							}
						],
						errors: {
							telephone: 'an error'
						},
						key: 'myself'
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
				describe('and the user has previously selected agent and submitted a number', () => {
					beforeEach(() => {
						req = {
							...req,
							originalUrl: '/mock-base-url/mock-case-ref/register/agent/telephone-number',
							session: {
								behalfRegdata: { representor: { telephone: 'mock session telephone number' } },
								typeOfParty: 'behalf'
							}
						};

						postRegisterNumberController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							behalfRegdata: { representor: { telephone: 'mock body telephone number' } },
							typeOfParty: 'behalf'
						});
					});

					it('should redirect to the register agent check answers page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/agent/check-answers'
						);
					});
				});

				describe('and the user has previously selected myself and submitted a number', () => {
					beforeEach(() => {
						req = {
							...req,
							originalUrl: '/mock-base-url/mock-case-ref/register/myself/telephone-number',
							session: {
								mySelfRegdata: { telephone: 'mock session telephone number' },
								typeOfParty: 'myself'
							}
						};

						postRegisterNumberController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							mySelfRegdata: { telephone: 'mock body telephone number' },
							typeOfParty: 'myself'
						});
					});

					it('should redirect to the register myself check answers page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/myself/check-answers'
						);
					});
				});

				describe('and the user has previously selected organisation and submitted a number', () => {
					beforeEach(() => {
						req = {
							...req,
							originalUrl: '/mock-base-url/mock-case-ref/register/organisation/telephone-number',
							session: {
								orgRegdata: { telephone: 'mock telephone number' },
								typeOfParty: 'organisation'
							}
						};

						postRegisterNumberController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							orgRegdata: { telephone: 'mock body telephone number' },
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
				describe('and the user has previously selected agent and submitted a number', () => {
					beforeEach(() => {
						req = {
							...req,
							originalUrl: '/mock-base-url/mock-case-ref/register/agent/telephone-number',
							session: {
								behalfRegdata: { representor: { telephone: 'mock session telephone number' } },
								typeOfParty: 'behalf'
							}
						};

						postRegisterNumberController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							behalfRegdata: { representor: { telephone: 'mock body telephone number' } },
							typeOfParty: 'behalf'
						});
					});

					it('should redirect to the register agent representing who page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/agent/who-representing'
						);
					});
				});

				describe('and the user has previously selected myself and submitted a number', () => {
					beforeEach(() => {
						req = {
							...req,
							originalUrl: '/mock-base-url/mock-case-ref/register/myself/telephone-number',
							session: {
								mySelfRegdata: { telephone: 'mock session telephone number' },
								typeOfParty: 'myself'
							}
						};

						postRegisterNumberController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							mySelfRegdata: { telephone: 'mock body telephone number' },
							typeOfParty: 'myself'
						});
					});

					it('should redirect to the register myself about project page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/myself/tell-us-about-project'
						);
					});
				});

				describe('and the user has previously selected organisation and submitted a number', () => {
					beforeEach(() => {
						req = {
							...req,
							originalUrl: '/mock-base-url/mock-case-ref/register/organisation/telephone-number',
							session: {
								orgRegdata: { telephone: 'mock telephone number' },
								typeOfParty: 'organisation'
							}
						};

						postRegisterNumberController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							orgRegdata: { telephone: 'mock body telephone number' },
							typeOfParty: 'organisation'
						});
					});

					it('should redirect to the register organisation about project page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/organisation/tell-us-about-project'
						);
					});
				});
			});
		});
	});
});
