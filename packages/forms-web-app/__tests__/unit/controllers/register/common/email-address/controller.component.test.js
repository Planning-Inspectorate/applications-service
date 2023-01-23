const {
	getEmailAddress,
	postEmailAddress
} = require('../../../../../../src/controllers/register/common/email-address/controller');

describe('controllers/register/common/email-address/controller', () => {
	describe('#getEmailAddress', () => {
		describe('When getting the registration email page', () => {
			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};
			describe('and the user has selected myself', () => {
				const req = {
					originalUrl: '/register/myself/email',
					session: { mySelfRegdata: { ['email']: 'mock email' } }
				};
				beforeEach(() => {
					getEmailAddress(req, res);
				});
				it('should render the registration email page with the myself data', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/email-address', {
						titleTag:
							'What is your email address? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning',
						email: 'mock email'
					});
				});
			});
			describe('and the user has selected organisation', () => {
				const req = {
					originalUrl: '/register/organisation/email',
					session: { orgRegdata: { ['email']: 'mock email' } }
				};
				beforeEach(() => {
					getEmailAddress(req, res);
				});
				it('should render the registration email page with the organisation data', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/email-address', {
						titleTag:
							'What is your email address? - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning',
						email: 'mock email'
					});
				});
			});
			describe('and the user has selected agent', () => {
				const req = {
					originalUrl: '/register/agent/email',
					session: { behalfRegdata: { representor: { ['email']: 'mock email' } } }
				};
				beforeEach(() => {
					getEmailAddress(req, res);
				});
				it('should render the registration email page with the agent data', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/email-address', {
						titleTag:
							'What is your email address? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning',
						email: 'mock email'
					});
				});
			});
		});
	});

	describe('#postEmailAddress', () => {
		describe('When posting the registration email address', () => {
			const res = {
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
					originalUrl: '/register/myself/email',
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
						titleTag:
							'What is your email address? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning'
					});
				});
			});
			describe('and the user has submitted a email address for selected myself', () => {
				const req = {
					originalUrl: '/register/myself/email',
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
					expect(res.redirect).toHaveBeenCalledWith('/register/myself/address');
				});
			});
			describe('and the user has submitted a email address for selected organisation', () => {
				const req = {
					originalUrl: '/register/organisation/email',
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
					expect(res.redirect).toHaveBeenCalledWith('/register/organisation/address');
				});
			});
			describe('and the user has submitted a email address for selected agent', () => {
				const req = {
					originalUrl: '/register/agent/email',
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
					expect(res.redirect).toHaveBeenCalledWith('/register/agent/telephone-number');
				});
			});
		});
	});
});
