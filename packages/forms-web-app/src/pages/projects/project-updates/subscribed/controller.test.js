const { getProjectUpdatesSubscribed } = require('./controller');

const { putProjectUpdatesSubscription } = require('../../../../lib/application-api-wrapper');

jest.mock('../../../../lib/application-api-wrapper', () => ({
	putProjectUpdatesSubscription: jest.fn()
}));

describe('projects/project-updates/subscribed/controller', () => {
	describe('#getProjectUpdatesSubscribed', () => {
		const req = {
			params: {
				case_ref: 'mock case ref'
			},
			query: {
				subscription: 'mock subscription'
			}
		};
		const res = {
			render: jest.fn(),
			status: jest.fn(() => res)
		};
		describe('When the project updates subscription is successful', () => {
			beforeEach(async () => {
				putProjectUpdatesSubscription.mockImplementation(() => {
					return {
						resp_code: 204
					};
				});
				await getProjectUpdatesSubscribed(req, res);
			});

			it('should call the success template with the successful page data', () => {
				expect(res.render).toBeCalledWith('projects/project-updates/subscribed/view.njk', {
					pageHeading: 'Get updates success',
					pageTitle: 'Get updates success',
					projectUpdatesStartRoute: 'start',
					subscriptionStatus: 'successful'
				});
			});
		});

		describe('When the project updates subscription is expired', () => {
			beforeEach(async () => {
				putProjectUpdatesSubscription.mockImplementation(() => {
					throw new Error('Subscription details have expired');
				});
				await getProjectUpdatesSubscribed(req, res);
			});

			it('should call the success template with the expired page data', () => {
				expect(res.render).toBeCalledWith('projects/project-updates/subscribed/view.njk', {
					pageHeading: 'Your email verification link has expired',
					pageTitle: 'Verification link expired',
					projectUpdatesStartRoute: 'start',
					subscriptionStatus: 'expired'
				});
			});
		});

		describe('When the project updates subscription is unsuccessful', () => {
			beforeEach(async () => {
				putProjectUpdatesSubscription.mockImplementation(() => {
					throw new Error('There is an issue');
				});
				await getProjectUpdatesSubscribed(req, res);
			});

			it('should call the success template with the unsuccessful page data', () => {
				expect(res.render).toBeCalledWith('projects/project-updates/subscribed/view.njk', {
					pageHeading: 'There has been a problem with our system',
					pageTitle: 'Email system problem',
					projectUpdatesStartRoute: 'start',
					subscriptionStatus: 'unsuccessful'
				});
			});
		});
	});
});
