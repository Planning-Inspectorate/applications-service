const {
	getFullName,
	postFullName
} = require('../../../../../../src/controllers/register/common/full-name/controller');

describe('controllers/register/common/full-name/controller', () => {
	describe('#getFullname', () => {
		describe('When getting the registration full name page', () => {
			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};
			describe('and the user has selected myself', () => {
				const req = {
					originalUrl: '/register/myself/full-name',
					session: { mySelfRegdata: { ['full-name']: 'mock full name' } }
				};
				beforeEach(() => {
					getFullName(req, res);
				});
				it('should render the registration full name page with the myself data', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/full-name', {
						pageTitle:
							'What is your full name? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning',
						hint: `<p>We will publish this on the website along with your comments about the project.</p>
                <p>You must register as an individual. If your partner wants to register, they will have to fill in a separate form with their details.</p>`,
						fullName: 'mock full name'
					});
				});
			});
			describe('and the user has selected organisation', () => {
				const req = {
					originalUrl: '/register/organisation/full-name',
					session: { orgRegdata: { ['full-name']: 'mock full name' } }
				};
				beforeEach(() => {
					getFullName(req, res);
				});
				it('should render the registration full name page with the organisation data', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/full-name', {
						pageTitle:
							'What is your full name? - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning',
						fullName: 'mock full name'
					});
				});
			});
			describe('and the user has selected agent', () => {
				const req = {
					originalUrl: '/register/agent/full-name',
					session: { behalfRegdata: { representor: { ['full-name']: 'mock full name' } } }
				};
				beforeEach(() => {
					getFullName(req, res);
				});
				it('should render the registration full name page with the agent data', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/full-name', {
						pageTitle:
							'What is your full name? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning',
						fullName: 'mock full name'
					});
				});
			});
		});
		describe('and there is an error', () => {
			const res = { render: jest.fn(), status: jest.fn(() => res) };
			const req = { session: 'mock session' };
			it('should throw an error', () => {
				expect(() => getFullName(req, res)).toThrowError(
					"Cannot read properties of undefined (reading 'split')"
				);
			});
		});
	});

	describe('#postFullName', () => {
		describe('When posting the registration full name', () => {
			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res),
				send: jest.fn()
			};
			describe('and there is an unrecoverable error', () => {
				const req = {};
				beforeEach(() => {
					postFullName(req, res);
				});

				it('should render the error page', () => {
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
			describe('and there is an error in the form', () => {
				const req = {
					originalUrl: '/register/myself/full-name',
					session: { mySelfRegdata: { ['full-name']: 'mock full name' } },
					body: {
						errors: { ['full-name']: 'an error' },
						errorSummary: [{ text: 'Error summary', href: '#' }]
					}
				};
				beforeEach(() => {
					postFullName(req, res);
				});
				it('should render full name page with the error', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/full-name', {
						errorSummary: [
							{
								href: '#',
								text: 'Error summary'
							}
						],
						errors: {
							'full-name': 'an error'
						},
						pageTitle:
							'What is your full name? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning',
						hint: `<p>We will publish this on the website along with your comments about the project.</p>
                <p>You must register as an individual. If your partner wants to register, they will have to fill in a separate form with their details.</p>`
					});
				});
			});
			describe('and there is an error in the form with sanitiseFormPostResponse', () => {
				const req = {
					originalUrl: '/register/myself/full-name',
					session: { mySelfRegdata: { ['full-name']: 'mock full name' } },
					body: {
						errors: { ['full-name']: 'an error' },
						errorSummary: [{ text: 'Error summary', href: '#' }]
					}
				};
				beforeEach(() => {
					postFullName(req, res);
				});
				it('should render full name page with the error', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/full-name', {
						errors: { ['full-name']: 'an error' },
						errorSummary: [{ text: 'Error summary', href: '#' }],
						pageTitle:
							'What is your full name? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning',
						hint: `<p>We will publish this on the website along with your comments about the project.</p>
                <p>You must register as an individual. If your partner wants to register, they will have to fill in a separate form with their details.</p>`
					});
				});
			});
			describe('and the user has submitted a full name for selected myself and is in edit mode', () => {
				const req = {
					originalUrl: '/register/myself/full-name',
					session: { mySelfRegdata: { ['full-name']: 'mock full name' } },
					body: {
						['full-name']: 'mock full name'
					},
					query: { mode: 'edit' }
				};
				beforeEach(() => {
					postFullName(req, res);
				});
				it('should redirect to the next page for myself', () => {
					expect(res.redirect).toHaveBeenCalledWith('/register/myself/check-answers');
				});
			});
			describe('and the user has submitted a full name for selected myself', () => {
				const req = {
					originalUrl: '/register/myself/full-name',
					session: { mySelfRegdata: { ['full-name']: 'mock full name' } },
					body: {
						['full-name']: 'mock full name'
					},
					query: {}
				};
				beforeEach(() => {
					postFullName(req, res);
				});
				it('should redirect to the next page for myself', () => {
					expect(res.redirect).toHaveBeenCalledWith('/register/myself/are-you-18-over');
				});
			});
			describe('and the user has submitted a full name for selected organisation', () => {
				const req = {
					originalUrl: '/register/organisation/full-name',
					session: { orgRegdata: { ['full-name']: 'mock full name' } },
					body: {
						['full-name']: 'mock full name'
					},
					query: {}
				};
				beforeEach(() => {
					postFullName(req, res);
				});
				it('should redirect to the next page for organisation', () => {
					expect(res.redirect).toHaveBeenCalledWith('/register/organisation/are-you-18-over');
				});
			});
			describe('and the user has submitted a full name for selected agent', () => {
				const req = {
					originalUrl: '/register/agent/full-name',
					session: { behalfRegdata: { representor: { ['full-name']: 'mock full name' } } },
					body: {
						['full-name']: 'mock full name'
					},
					query: {}
				};
				beforeEach(() => {
					postFullName(req, res);
				});
				it('should redirect to the next page for organisation', () => {
					expect(res.redirect).toHaveBeenCalledWith('/register/agent/name-of-organisation');
				});
			});
		});
	});
});
