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
						pageTitle:
							'What is your telephone number? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning',
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
						pageTitle:
							'What is your telephone number? - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning',
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
						pageTitle:
							'What is your telephone number? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning',
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
			const res = {
				locals: { baseUrl: '/mock-base-url/mock-case-ref' },
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res),
				send: jest.fn()
			};
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
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/telephone-number',
					session: { mySelfRegdata: { ['telephone']: 'mock telephone number' } },
					body: {
						errors: { ['telephone']: 'an error' },
						errorSummary: [{ text: 'Error summary', href: '#' }]
					}
				};
				beforeEach(() => {
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
						pageTitle:
							'What is your telephone number? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning'
					});
				});
			});
			describe('and the user has submitted a telephone number for selected myself and is in edit mode', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/telephone-number',
					session: { mySelfRegdata: { ['telephone']: 'mock telephone number' } },
					body: {
						['telephone']: 'mock telephone number'
					},
					query: { mode: 'edit' }
				};
				beforeEach(() => {
					postRegisterNumberController(req, res);
				});
				it('should redirect to the next page for myself', () => {
					expect(res.redirect).toHaveBeenCalledWith(
						'/mock-base-url/mock-case-ref/register/myself/check-answers'
					);
				});
			});
			describe('and the user has submitted a telephone number for selected myself', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/telephone-number',
					session: { mySelfRegdata: { ['telephone-number']: 'mock telephone number' } },
					body: {
						['telephone-number']: 'mock telephone number'
					},
					query: {}
				};
				beforeEach(() => {
					postRegisterNumberController(req, res);
				});
				it('should redirect to the next page for myself', () => {
					expect(res.redirect).toHaveBeenCalledWith(
						'/mock-base-url/mock-case-ref/register/myself/tell-us-about-project'
					);
				});
			});
			describe('and the user has submitted a telephone number for selected organisation', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/organisation/telephone-number',
					session: { orgRegdata: { ['telephone-number']: 'mock telephone number' } },
					body: {
						['telephone-number']: 'mock telephone number'
					},
					query: {}
				};
				beforeEach(() => {
					postRegisterNumberController(req, res);
				});
				it('should redirect to the next page for organisation', () => {
					expect(res.redirect).toHaveBeenCalledWith(
						'/mock-base-url/mock-case-ref/register/organisation/tell-us-about-project'
					);
				});
			});
			describe('and the user has submitted a telephone number for selected agent', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/agent/telephone-number',
					session: {
						behalfRegdata: { representor: { ['telephone']: 'mock telephone number' } }
					},
					body: {
						['telephone-number']: 'mock telephone number'
					},
					query: {}
				};
				beforeEach(() => {
					postRegisterNumberController(req, res);
				});
				it('should redirect to the next page for organisation', () => {
					expect(res.redirect).toHaveBeenCalledWith(
						'/mock-base-url/mock-case-ref/register/agent/address'
					);
				});
			});
		});
	});
});
