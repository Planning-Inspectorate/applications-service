const { getGetUpdatesConfirmYourEmail } = require('./controller');

describe('projects/get-updates/confirm-your-email/controller', () => {
	describe('#getGetUpdatesConfirmYourEmail', () => {
		describe('and there is an email address in the get updates session', () => {
			const req = {
				session: {
					getUpdates: {
						email: 'mock@email.com',
						subscriptionLinkSent: true
					}
				},
				params: {
					case_ref: 'mock-case-ref'
				}
			};
			const res = {
				render: jest.fn()
			};
			const next = jest.fn();

			beforeEach(() => {
				getGetUpdatesConfirmYourEmail(req, res, next);
			});

			it('should call the confirm-your-email template with the correct page data', () => {
				expect(res.render).toHaveBeenCalledWith(
					'projects/get-updates/confirm-your-email/view.njk',
					{
						email: 'mock@email.com',
						pageHeading: 'Confirm you want to get emails',
						pageTitle: 'Get updates and confirm email'
					}
				);
			});
		});
		describe('and there is NOT an email address in the get updates session', () => {
			const req = {
				session: {
					getUpdates: {
						subscriptionLinkSent: true
					}
				},
				params: {
					case_ref: 'mock-case-ref'
				}
			};
			const res = {
				render: jest.fn(),
				locals: { caseRef: 'mock-case-ref' }
			};
			const next = jest.fn();

			beforeEach(() => {
				getGetUpdatesConfirmYourEmail(req, res, next);
			});

			it('should render the error page', () => {
				expect(next).toHaveBeenCalledWith(new Error('Get updates email session value not true'));
			});
		});
		describe('and the get updates session value is not true', () => {
			const req = {
				session: {
					getUpdates: {
						subscriptionLinkSent: false
					}
				},
				params: {
					case_ref: 'mock-case-ref'
				}
			};
			const res = {
				render: jest.fn(),
				locals: { caseRef: 'mock-case-ref' }
			};
			const next = jest.fn();

			beforeEach(() => {
				getGetUpdatesConfirmYourEmail(req, res, next);
			});

			it('should render the error page', () => {
				expect(next).toHaveBeenCalledWith(
					new Error('Get updates subscription link sent session value not true')
				);
			});
		});
	});
});
