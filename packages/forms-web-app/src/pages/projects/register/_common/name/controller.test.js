const { getRegisterNameController, postRegisterNameController } = require('./controller');

describe('pages/projects/register/_common/name/controller', () => {
	describe('#getRegisterNameController', () => {
		describe('When getting the registration full name page', () => {
			const res = {
				locals: { baseUrl: '/mock-base-url/mock-case-ref' },
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};
			describe('and the user has selected myself', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/full-name',
					session: { mySelfRegdata: { ['full-name']: 'mock full name' } }
				};
				beforeEach(() => {
					getRegisterNameController(req, res);
				});
				it('should render the registration full name page with the myself data', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/name/view.njk', {
						key: 'myself',
						fullName: 'mock full name'
					});
				});
			});
			describe('and the user has selected organisation', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/organisation/full-name',
					session: { orgRegdata: { ['full-name']: 'mock full name' } }
				};
				beforeEach(() => {
					getRegisterNameController(req, res);
				});
				it('should render the registration full name page with the organisation data', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/name/view.njk', {
						key: 'organisation',
						fullName: 'mock full name'
					});
				});
			});
			describe('and the user has selected agent', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/agent/full-name',
					session: { behalfRegdata: { representor: { ['full-name']: 'mock full name' } } }
				};
				beforeEach(() => {
					getRegisterNameController(req, res);
				});
				it('should render the registration full name page with the agent data', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/name/view.njk', {
						key: 'agent',
						fullName: 'mock full name'
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
				expect(() => getRegisterNameController(req, res)).toThrowError(
					"Cannot read properties of undefined (reading 'split')"
				);
			});
		});
	});

	describe('#postRegisterNameController', () => {
		describe('When posting the registration full name', () => {
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
					postRegisterNameController(req, res);
				});

				it('should render the error page', () => {
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
			describe('and there is an error in the form', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/full-name',
					session: { mySelfRegdata: { ['full-name']: 'mock full name' } },
					body: {
						errors: { ['full-name']: 'an error' },
						errorSummary: [{ text: 'Error summary', href: '#' }]
					}
				};
				beforeEach(() => {
					postRegisterNameController(req, res);
				});
				it('should render full name page with the error', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/name/view.njk', {
						errorSummary: [
							{
								href: '#',
								text: 'Error summary'
							}
						],
						errors: {
							'full-name': 'an error'
						},
						key: 'myself'
					});
				});
			});
			describe('and there is an error in the form with sanitiseFormPostResponse', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/full-name',
					session: { mySelfRegdata: { ['full-name']: 'mock full name' } },
					body: {
						errors: { ['full-name']: 'an error' },
						errorSummary: [{ text: 'Error summary', href: '#' }]
					}
				};
				beforeEach(() => {
					postRegisterNameController(req, res);
				});
				it('should render full name page with the error', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/name/view.njk', {
						errors: { ['full-name']: 'an error' },
						errorSummary: [{ text: 'Error summary', href: '#' }],
						key: 'myself'
					});
				});
			});
			describe('and the user has submitted a full name for selected myself and is in edit mode', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/full-name',
					session: { mySelfRegdata: { ['full-name']: 'mock full name' } },
					body: {
						['full-name']: 'mock full name'
					},
					query: { mode: 'edit' }
				};
				beforeEach(() => {
					postRegisterNameController(req, res);
				});
				it('should redirect to the next page for myself', () => {
					expect(res.redirect).toHaveBeenCalledWith(
						'/mock-base-url/mock-case-ref/register/myself/check-answers'
					);
				});
			});
			describe('and the user has submitted a full name for selected myself', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/full-name',
					session: { mySelfRegdata: { ['full-name']: 'mock full name' } },
					body: {
						['full-name']: 'mock full name'
					},
					query: {}
				};
				beforeEach(() => {
					postRegisterNameController(req, res);
				});
				it('should redirect to the next page for myself', () => {
					expect(res.redirect).toHaveBeenCalledWith(
						'/mock-base-url/mock-case-ref/register/myself/are-you-18-over'
					);
				});
			});
			describe('and the user has submitted a full name for selected organisation', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/organisation/full-name',
					session: { orgRegdata: { ['full-name']: 'mock full name' } },
					body: {
						['full-name']: 'mock full name'
					},
					query: {}
				};
				beforeEach(() => {
					postRegisterNameController(req, res);
				});
				it('should redirect to the next page for organisation', () => {
					expect(res.redirect).toHaveBeenCalledWith(
						'/mock-base-url/mock-case-ref/register/organisation/are-you-18-over'
					);
				});
			});
			describe('and the user has submitted a full name for selected agent', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/agent/full-name',
					session: { behalfRegdata: { representor: { ['full-name']: 'mock full name' } } },
					body: {
						['full-name']: 'mock full name'
					},
					query: {}
				};
				beforeEach(() => {
					postRegisterNameController(req, res);
				});
				it('should redirect to the next page for organisation', () => {
					expect(res.redirect).toHaveBeenCalledWith(
						'/mock-base-url/mock-case-ref/register/agent/name-of-organisation'
					);
				});
			});
		});
	});
});
