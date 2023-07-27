const { getProjectUpdatesEmail, postProjectUpdatesEmail } = require('./controller');

describe('projects/project-updates/email/controller', () => {
	describe('#getProjectUpdatesEmail', () => {
		describe('and there are no issues', () => {
			const res = {
				render: jest.fn(),
				locals: { caseRef: 'mock-case-ref' }
			};
			const req = {
				session: {
					projectUpdates: {}
				}
			};
			const next = jest.fn();

			beforeEach(() => {
				getProjectUpdatesEmail(req, res, next);
			});

			it('should render the page', () => {
				expect(res.render).toHaveBeenCalledWith('projects/project-updates/email/view.njk', {
					pageTitle: 'What is your email address?',
					backLinkUrl: 'start'
				});
			});
		});

		describe('and there is an issue', () => {
			const res = {
				render: jest.fn(),
				locals: { caseRef: 'mock-case-ref' }
			};
			const req = {
				session: {}
			};
			const next = jest.fn();

			beforeEach(() => {
				getProjectUpdatesEmail(req, res, next);
			});

			it('should throw and error', () => {
				expect(next).toHaveBeenCalledWith(
					new TypeError(`Cannot read properties of undefined (reading 'email')`)
				);
			});
		});
	});

	describe('#postProjectUpdatesEmail', () => {
		describe('When posting the email', () => {
			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				locals: { caseRef: 'mock-case-ref' }
			};
			const req = {
				body: {
					email: '',
					errors: {
						email: {
							value: '',
							msg: 'Enter your email address',
							param: 'email',
							location: 'body'
						}
					},
					errorSummary: [{ text: 'Enter your email address', href: '#email' }]
				},
				session: {
					projectUpdates: {}
				}
			};
			const next = jest.fn();

			describe('and there is an error on the page', () => {
				beforeEach(async () => {
					await postProjectUpdatesEmail(req, res, next);
				});

				it('should show error if no email entered', async () => {
					expect(res.render).toHaveBeenCalledWith('projects/project-updates/email/view.njk', {
						pageTitle: 'What is your email address?',
						backLinkUrl: 'start',
						email: '',
						errors: {
							email: {
								location: 'body',
								msg: 'Enter your email address',
								param: 'email',
								value: ''
							}
						},
						errorSummary: [{ text: 'Enter your email address', href: '#email' }]
					});
				});
			});

			describe('and there is no error on the page', () => {
				const res = {
					render: jest.fn(),
					redirect: jest.fn(),
					locals: { caseRef: 'mock-case-ref' }
				};
				const req = {
					body: { email: 'test@email.com' },
					session: {
						projectUpdates: {}
					}
				};
				const next = jest.fn();

				beforeEach(async () => {
					await postProjectUpdatesEmail(req, res, next);
				});

				it('should save the email to the project updates session', async () => {
					expect(req.session.projectUpdates.email).toEqual('test@email.com');
				});

				it('should redirect to next page', async () => {
					expect(res.redirect).toHaveBeenCalledWith('how-often');
				});
			});

			describe('and there is an issue', () => {
				const res = {
					render: jest.fn(),
					redirect: jest.fn(),
					locals: { caseRef: 'mock-case-ref' }
				};
				const req = {
					body: { email: 'test@email.com' },
					session: {}
				};
				const next = jest.fn();

				beforeEach(() => {
					postProjectUpdatesEmail(req, res, next);
				});

				it('should throw and error', () => {
					expect(next).toHaveBeenCalledWith(
						new TypeError(`Cannot set properties of undefined (setting 'email')`)
					);
				});
			});
		});
	});
});
