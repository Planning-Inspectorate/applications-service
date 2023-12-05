const { getRegisterAreYou18Controller, postRegisterAreYou18Controller } = require('./controller');

describe('packages/forms-web-app/src/pages/projects/register/_common/are-you-18/controller', () => {
	describe('#getRegisterAreYou18Controller', () => {
		describe('When getting the registration are you over 18 page', () => {
			const res = {
				locals: { baseUrl: '/mock-base-url/mock-case-ref' },
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};
			describe('and the user has selected myself', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/over18',
					session: { mySelfRegdata: { ['over-18']: 'mock are you over 18' } }
				};
				beforeEach(() => {
					getRegisterAreYou18Controller(req, res);
				});
				it('should render the registration are you over 18 page with the myself data', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/are-you-18/view.njk', {
						pageTitle:
							'Are you 18 or over? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning',
						over18: 'mock are you over 18'
					});
				});
			});
			describe('and the user has selected organisation', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/organisation/over18',
					session: { orgRegdata: { ['over-18']: 'mock are you over 18' } }
				};
				beforeEach(() => {
					getRegisterAreYou18Controller(req, res);
				});
				it('should render the registration are you over 18 page with the organisation data', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/are-you-18/view.njk', {
						pageTitle:
							'Are you 18 or over? - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning',
						over18: 'mock are you over 18'
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
				expect(() => getRegisterAreYou18Controller(req, res)).toThrowError(
					"Cannot read properties of undefined (reading 'split')"
				);
			});
		});
	});

	describe('#postRegisterAreYou18Controller', () => {
		describe('When posting the registration are you over 18', () => {
			const res = {
				locals: { baseUrl: '/mock-base-url/mock-case-ref' },
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res),
				send: jest.fn().mock
			};
			describe('and there is an unrecoverable error', () => {
				const req = {};
				beforeEach(() => {
					postRegisterAreYou18Controller(req, res);
				});

				it('should render the error page', () => {
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
			describe('and there is an error in the form', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/over18',
					session: { mySelfRegdata: { ['over-18']: 'mock are you over 18' } },
					body: {
						errors: { ['over-18']: 'an error' },
						errorSummary: [{ text: 'Error summary', href: '#' }]
					}
				};
				beforeEach(() => {
					postRegisterAreYou18Controller(req, res);
				});
				it('should render are you over 18 page with the error', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/are-you-18/view.njk', {
						errorSummary: [
							{
								href: '#',
								text: 'Error summary'
							}
						],
						errors: {
							'over-18': 'an error'
						},
						pageTitle:
							'Are you 18 or over? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning'
					});
				});
			});
			describe('and the user has submitted a are you over 18 for selected myself and is in edit mode', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/over18',
					session: { mySelfRegdata: { ['over-18']: 'mock are you over 18' } },
					body: {
						['over18']: 'mock are you over 18'
					},
					query: { mode: 'edit' }
				};
				beforeEach(() => {
					postRegisterAreYou18Controller(req, res);
				});
				it('should redirect to the next page for myself', () => {
					expect(res.redirect).toHaveBeenCalledWith(
						'/mock-base-url/mock-case-ref/register/myself/check-answers'
					);
				});
			});
			describe('and the user has submitted a are you over 18 for selected myself', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/over18',
					session: { mySelfRegdata: { ['over-18']: 'mock are you over 18' } },
					body: {
						['over18']: 'mock are you over 18'
					},
					query: {}
				};
				beforeEach(() => {
					postRegisterAreYou18Controller(req, res);
				});
				it('should redirect to the next page for myself', () => {
					expect(res.redirect).toHaveBeenCalledWith(
						'/mock-base-url/mock-case-ref/register/myself/email-address'
					);
				});
			});
			describe('and the user has submitted a are you over 18 for selected organisation', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/organisation/over18',
					session: { orgRegdata: { ['over-18']: 'mock are you over 18' } },
					body: {
						['over-18']: 'mock are you over 18'
					},
					query: {}
				};
				beforeEach(() => {
					postRegisterAreYou18Controller(req, res);
				});
				it('should redirect to the next page for organisation', () => {
					expect(res.redirect).toHaveBeenCalledWith(
						'/mock-base-url/mock-case-ref/register/organisation/name-of-organisation-or-charity'
					);
				});
			});
		});
	});
});
