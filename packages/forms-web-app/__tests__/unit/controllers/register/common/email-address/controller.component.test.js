const {
	getEmailAddress,
	postEmailAddress
} = require('../../../../../../src/controllers/register/common/email-address/controller');

describe('controllers/register/common/email-address/controller', () => {
	describe('#getEmailAddress', () => {
		describe('When getting the registration email page', () => {
			const res = {
				locals: { baseUrl: '/mock-base-url/mock-case-ref' },
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
					getEmailAddress(req, res);
				});
				it('should render the registration email page with the myself data', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/email-address', {
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
					getEmailAddress(req, res);
				});
				it('should render the registration email page with the organisation data', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/email-address', {
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
					getEmailAddress(req, res);
				});
				it('should render the registration email page with the agent data', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/email-address', {
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
				expect(() => getEmailAddress(req, res)).toThrowError(
					"Cannot read properties of undefined (reading 'split')"
				);
			});
		});
	});

	describe('#postEmailAddress', () => {
		describe('When posting the registration email address', () => {
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
					postEmailAddress(req, res);
				});

				it('should render the error page', () => {
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
			describe('and there is an error in the form', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/email',
					session: { mySelfRegdata: { ['email']: 'mock email address' } },
					body: {
						errors: { ['email']: 'an error' },
						errorSummary: [{ text: 'Error summary', href: '#' }]
					}
				};
				beforeEach(() => {
					postEmailAddress(req, res);
				});
				it('should render email address page with the error', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/email-address', {
						errorSummary: [
							{
								href: '#',
								text: 'Error summary'
							}
						],
						errors: {
							email: 'an error'
						},
						pageTitle:
							'What is your email address? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning'
					});
				});
			});
			describe('and the user has submitted a email address for selected myself and is in edit mode', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/email',
					session: { mySelfRegdata: { ['email']: 'mock email address' } },
					body: {
						['email']: 'mock email address'
					},
					query: { mode: 'edit' }
				};
				beforeEach(() => {
					postEmailAddress(req, res);
				});
				it('should redirect to the next page for myself', () => {
					expect(res.redirect).toHaveBeenCalledWith(
						'/mock-base-url/mock-case-ref/register/myself/check-answers'
					);
				});
			});
			describe('and the user has submitted a email address for selected myself', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/email',
					session: { mySelfRegdata: { ['email']: 'mock email address' } },
					body: {
						['email']: 'mock email address'
					},
					query: {}
				};
				beforeEach(() => {
					postEmailAddress(req, res);
				});
				it('should redirect to the next page for myself', () => {
					expect(res.redirect).toHaveBeenCalledWith(
						'/mock-base-url/mock-case-ref/register/myself/address'
					);
				});
			});
			describe('and the user has submitted a email address for selected organisation', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/organisation/email',
					session: { orgRegdata: { ['email']: 'mock email address' } },
					body: {
						['email']: 'mock email address'
					},
					query: {}
				};
				beforeEach(() => {
					postEmailAddress(req, res);
				});
				it('should redirect to the next page for organisation', () => {
					expect(res.redirect).toHaveBeenCalledWith(
						'/mock-base-url/mock-case-ref/register/organisation/address'
					);
				});
			});
			describe('and the user has submitted a email address for selected agent', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/agent/email',
					session: { behalfRegdata: { representor: { ['email']: 'mock email address' } } },
					body: {
						['email']: 'mock email address'
					},
					query: {}
				};
				beforeEach(() => {
					postEmailAddress(req, res);
				});
				it('should redirect to the next page for organisation', () => {
					expect(res.redirect).toHaveBeenCalledWith(
						'/mock-base-url/mock-case-ref/register/agent/telephone-number'
					);
				});
			});
		});
	});
});
