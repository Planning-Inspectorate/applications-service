const {
	getRegisterAiDeclarationController,
	postRegisterAiDeclarationController
} = require('./controller');

describe('pages/projects/register/_common/ai-declaration/controller', () => {
	describe('#getRegisterAiDeclarationController', () => {
		describe('When getting the registration AI declaration page', () => {
			const res = {
				locals: { baseUrl: '/mock-base-url/mock-case-ref' },
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};

			describe('and the user has selected myself', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/ai-declaration',
					session: { 'ai-declaration': 'no' }
				};

				beforeEach(() => {
					getRegisterAiDeclarationController(req, res);
				});

				it('should render the registration AI declaration page with the myself data', () => {
					expect(res.render).toHaveBeenCalledWith(
						'projects/register/_common/ai-declaration/view.njk',
						{
							key: 'myself',
							aiDeclaration: 'no'
						}
					);
				});
			});

			describe('and the user has selected agent', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/agent/ai-declaration',
					session: { 'ai-declaration': 'no' }
				};

				beforeEach(() => {
					getRegisterAiDeclarationController(req, res);
				});

				it('should render the registration AI declaration page with the agent data', () => {
					expect(res.render).toHaveBeenCalledWith(
						'projects/register/_common/ai-declaration/view.njk',
						{
							key: 'agent',
							aiDeclaration: 'no'
						}
					);
				});
			});

			describe('and the user has selected organisation', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/organisation/ai-declaration',
					session: { 'ai-declaration': 'no' }
				};

				beforeEach(() => {
					getRegisterAiDeclarationController(req, res);
				});

				it('should render the registration AI declaration page with the organisation data', () => {
					expect(res.render).toHaveBeenCalledWith(
						'projects/register/_common/ai-declaration/view.njk',
						{
							key: 'organisation',
							aiDeclaration: 'no'
						}
					);
				});
			});
		});

		describe('and there is an error', () => {
			const res = {
				locals: { baseUrl: '/mock-base-url/mock-case-ref' },
				render: jest.fn(),
				status: jest.fn(() => res)
			};

			const req = { session: {} };

			it('should throw an error', () => {
				expect(() => getRegisterAiDeclarationController(req, res)).toThrowError(
					"Cannot read properties of undefined (reading 'split')"
				);
			});
		});
	});

	describe('#postRegisterAiDeclarationController', () => {
		describe('When posting the AI declaration value', () => {
			let req;

			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res),
				send: jest.fn()
			};

			beforeEach(() => {
				req = {
					body: { 'ai-declaration': 'no' },
					params: {
						case_ref: 'mock-case-ref'
					}
				};
			});

			describe('and there is an unrecoverable error', () => {
				beforeEach(() => {
					req = {};
					postRegisterAiDeclarationController(req, res);
				});

				it('should render the error page', () => {
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});

			describe('and there is a form validation error', () => {
				beforeEach(() => {
					req = {
						...req,
						originalUrl: '/mock-base-url/mock-case-ref/register/myself/ai-declaration',
						session: { typeOfParty: 'myself' },
						body: {
							...req.body,
							errors: { 'ai-declaration': 'an error' },
							errorSummary: [{ text: 'Error summary', href: '#' }]
						}
					};
					postRegisterAiDeclarationController(req, res);
				});

				it('should render AI declaration page with the error', () => {
					expect(res.render).toHaveBeenCalledWith(
						'projects/register/_common/ai-declaration/view.njk',
						{
							errors: { 'ai-declaration': 'an error' },
							errorSummary: [{ text: 'Error summary', href: '#' }],
							key: 'myself'
						}
					);
				});
			});

			describe('When the user is in edit mode', () => {
				beforeEach(() => {
					req = {
						...req,
						query: { mode: 'edit' }
					};
				});

				describe('and the user has previously selected agent and submitted an AI declaration', () => {
					beforeEach(() => {
						req = {
							...req,
							originalUrl: '/mock-base-url/mock-case-ref/register/agent/ai-declaration',
							session: {
								typeOfParty: 'behalf',
								'ai-declaration': 'yes'
							}
						};

						postRegisterAiDeclarationController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							typeOfParty: 'behalf',
							'ai-declaration': 'no'
						});
					});

					it('should redirect to the register agent check answers page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/agent/check-answers'
						);
					});
				});

				describe('and the user has previously selected myself and submitted an AI declaration', () => {
					beforeEach(() => {
						req = {
							...req,
							originalUrl: '/mock-base-url/mock-case-ref/register/myself/ai-declaration',
							session: {
								typeOfParty: 'myself',
								'ai-declaration': 'yes'
							}
						};

						postRegisterAiDeclarationController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							typeOfParty: 'myself',
							'ai-declaration': 'no'
						});
					});

					it('should redirect to the register myself check answers page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/myself/check-answers'
						);
					});
				});

				describe('and the user has previously selected organisation and submitted an AI declaration', () => {
					beforeEach(() => {
						req = {
							...req,
							originalUrl: '/mock-base-url/mock-case-ref/register/organisation/ai-declaration',
							session: {
								typeOfParty: 'organisation',
								'ai-declaration': 'yes'
							}
						};

						postRegisterAiDeclarationController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							typeOfParty: 'organisation',
							'ai-declaration': 'no'
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
				describe('and the user has previously selected agent and submitted an AI declaration', () => {
					beforeEach(() => {
						req = {
							...req,
							originalUrl: '/mock-base-url/mock-case-ref/register/agent/ai-declaration',
							session: {
								typeOfParty: 'behalf',
								'ai-declaration': 'yes'
							}
						};

						postRegisterAiDeclarationController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							typeOfParty: 'behalf',
							'ai-declaration': 'no'
						});
					});

					it('should redirect to the register agent check answers page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/agent/check-answers'
						);
					});
				});

				describe('and the user has previously selected myself and submitted an AI declaration', () => {
					beforeEach(() => {
						req = {
							...req,
							originalUrl: '/mock-base-url/mock-case-ref/register/myself/ai-declaration',
							session: {
								typeOfParty: 'myself',
								'ai-declaration': 'yes'
							}
						};

						postRegisterAiDeclarationController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							typeOfParty: 'myself',
							'ai-declaration': 'no'
						});
					});

					it('should redirect to the register myself check answers page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/myself/check-answers'
						);
					});
				});

				describe('and the user has previously selected organisation and submitted an AI declaration', () => {
					beforeEach(() => {
						req = {
							...req,
							originalUrl: '/mock-base-url/mock-case-ref/register/organisation/ai-declaration',
							session: {
								typeOfParty: 'organisation',
								'ai-declaration': 'yes'
							}
						};

						postRegisterAiDeclarationController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							typeOfParty: 'organisation',
							'ai-declaration': 'no'
						});
					});

					it('should redirect to the register organisation check answers page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/organisation/check-answers'
						);
					});
				});
			});
		});
	});
});
