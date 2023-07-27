const { getProjectUpdatesConfirmYourEmail } = require('./controller');

describe('projects/project-updates/confirm-your-email/controller', () => {
	describe('#getProjectUpdatesConfirmYourEmail', () => {
		describe('and there is an email address in the project updates session', () => {
			const req = {
				session: {
					projectUpdates: {
						email: 'mock@email.com',
						subscriptionLinkSent: true
					}
				}
			};
			const res = {
				render: jest.fn()
			};
			const next = jest.fn();

			beforeEach(() => {
				getProjectUpdatesConfirmYourEmail(req, res, next);
			});

			it('should call the confirm-your-email template with the correct page data', () => {
				expect(res.render).toHaveBeenCalledWith(
					'projects/project-updates/confirm-your-email/view.njk',
					{
						email: 'mock@email.com',
						pageHeading: 'Confirm you want to get emails',
						pageTitle: 'Get updates and confirm email'
					}
				);
			});
		});
		describe('and there is NOT an email address in the project updates session', () => {
			const req = {
				session: {
					projectUpdates: {
						subscriptionLinkSent: true
					}
				}
			};
			const res = {
				render: jest.fn(),
				locals: { caseRef: 'mock-case-ref' }
			};
			const next = jest.fn();

			beforeEach(() => {
				getProjectUpdatesConfirmYourEmail(req, res, next);
			});

			it('should render the error page', () => {
				expect(next).toHaveBeenCalledWith(
					new Error('Project updates email session value not true')
				);
			});
		});
		describe('and the project updates session value is not true', () => {
			const req = {
				session: {
					projectUpdates: {
						subscriptionLinkSent: false
					}
				}
			};
			const res = {
				render: jest.fn(),
				locals: { caseRef: 'mock-case-ref' }
			};
			const next = jest.fn();

			beforeEach(() => {
				getProjectUpdatesConfirmYourEmail(req, res, next);
			});

			it('should render the error page', () => {
				expect(next).toHaveBeenCalledWith(
					new Error('Project updates subscription link sent session value not true')
				);
			});
		});
	});
});
