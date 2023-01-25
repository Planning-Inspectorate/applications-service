const {
	getTelephoneNumber,
	postTelephoneNumber
} = require('../../../../../../src/controllers/register/common/telephone-number/controller');

describe('controllers/register/common/telephone-number/controller', () => {
	describe('#getTelephoneNumber', () => {
		describe('When getting the registration telephone number page', () => {
			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};
			describe('and the user has selected myself', () => {
				const req = {
					originalUrl: '/register/myself/telephone-number',
					session: { mySelfRegdata: { ['telephone']: 'mock telephone number' } }
				};
				beforeEach(() => {
					getTelephoneNumber(req, res);
				});
				it('should render the registration telephone number page with the myself data', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/telephone', {
						pageTitle:
							'What is your telephone number? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning',
						telephone: 'mock telephone number'
					});
				});
			});
			describe('and the user has selected organisation', () => {
				const req = {
					originalUrl: '/register/organisation/telephone-number',
					session: { orgRegdata: { ['telephone']: 'mock telephone number' } }
				};
				beforeEach(() => {
					getTelephoneNumber(req, res);
				});
				it('should render the registration telephone number page with the organisation data', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/telephone', {
						pageTitle:
							'What is your telephone number? - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning',
						telephone: 'mock telephone number'
					});
				});
			});
			describe('and the user has selected agent', () => {
				const req = {
					originalUrl: '/register/agent/telephone-number',
					session: {
						behalfRegdata: { representor: { ['telephone']: 'mock telephone number' } }
					}
				};
				beforeEach(() => {
					getTelephoneNumber(req, res);
				});
				it('should render the registration telephone number page with the agent data', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/telephone', {
						pageTitle:
							'What is your telephone number? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning',
						telephone: 'mock telephone number'
					});
				});
			});
		});
		describe('and there is an error', () => {
			const res = { render: jest.fn(), status: jest.fn(() => res) };
			const req = { session: 'mock session' };
			it('should throw an error', () => {
				expect(() => getTelephoneNumber(req, res)).toThrowError(
					"Cannot read properties of undefined (reading 'split')"
				);
			});
		});
	});

	describe('#postTelephoneNumber', () => {
		describe('When posting the registration telephone number', () => {
			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res),
				send: jest.fn()
			};
			describe('and there is an unrecoverable error', () => {
				const req = {};
				beforeEach(() => {
					postTelephoneNumber(req, res);
				});

				it('should render the error page', () => {
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
			describe('and there is an error in the form', () => {
				const req = {
					originalUrl: '/register/myself/telephone-number',
					session: { mySelfRegdata: { ['telephone']: 'mock telephone number' } },
					body: {
						errors: { ['telephone']: 'an error' },
						errorSummary: [{ text: 'Error summary', href: '#' }]
					}
				};
				beforeEach(() => {
					postTelephoneNumber(req, res);
				});
				it('should render telephone number page with the error', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/telephone', {
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
					originalUrl: '/register/myself/telephone-number',
					session: { mySelfRegdata: { ['telephone']: 'mock telephone number' } },
					body: {
						['telephone']: 'mock telephone number'
					},
					query: { mode: 'edit' }
				};
				beforeEach(() => {
					postTelephoneNumber(req, res);
				});
				it('should redirect to the next page for myself', () => {
					expect(res.redirect).toHaveBeenCalledWith('/register/myself/check-answers');
				});
			});
			describe('and the user has submitted a telephone number for selected myself', () => {
				const req = {
					originalUrl: '/register/myself/telephone-number',
					session: { mySelfRegdata: { ['telephone-number']: 'mock telephone number' } },
					body: {
						['telephone-number']: 'mock telephone number'
					},
					query: {}
				};
				beforeEach(() => {
					postTelephoneNumber(req, res);
				});
				it('should redirect to the next page for myself', () => {
					expect(res.redirect).toHaveBeenCalledWith('/register/myself/tell-us-about-project');
				});
			});
			describe('and the user has submitted a telephone number for selected organisation', () => {
				const req = {
					originalUrl: '/register/organisation/telephone-number',
					session: { orgRegdata: { ['telephone-number']: 'mock telephone number' } },
					body: {
						['telephone-number']: 'mock telephone number'
					},
					query: {}
				};
				beforeEach(() => {
					postTelephoneNumber(req, res);
				});
				it('should redirect to the next page for organisation', () => {
					expect(res.redirect).toHaveBeenCalledWith('/register/organisation/tell-us-about-project');
				});
			});
			describe('and the user has submitted a telephone number for selected agent', () => {
				const req = {
					originalUrl: '/register/agent/telephone-number',
					session: {
						behalfRegdata: { representor: { ['telephone']: 'mock telephone number' } }
					},
					body: {
						['telephone-number']: 'mock telephone number'
					},
					query: {}
				};
				beforeEach(() => {
					postTelephoneNumber(req, res);
				});
				it('should redirect to the next page for organisation', () => {
					expect(res.redirect).toHaveBeenCalledWith('/register/agent/address');
				});
			});
		});
	});
});
