const { getUpdatesSubscribedController } = require('./controller');
const { putGetUpdatesSubscription } = require('../../../../lib/application-api-wrapper');
const { mockI18n } = require('../../../_mocks/i18n');
const getUpdatesSubscribedTranslations_EN = require('./_translations/en.json');
const getUpdatesSubscribedTranslation = {
	getUpdatesSubscribed: getUpdatesSubscribedTranslations_EN
};
const i18n = mockI18n(getUpdatesSubscribedTranslation);

jest.mock('../../../../lib/application-api-wrapper', () => ({
	putGetUpdatesSubscription: jest.fn()
}));

describe('projects/get-updates/subscribed/controller', () => {
	describe('#getUpdatesSubscribedController', () => {
		const req = {
			params: {
				case_ref: 'mock-case-ref'
			},
			query: {
				subscriptionDetails: 'mock subscription details'
			},
			i18n
		};
		const res = {
			render: jest.fn(),
			status: jest.fn(() => res)
		};
		describe('When the get updates subscription is successful', () => {
			beforeEach(async () => {
				putGetUpdatesSubscription.mockImplementation(() => {
					return {
						resp_code: 204
					};
				});
				await getUpdatesSubscribedController(req, res);
			});

			it('should call the success template with the successful page data', () => {
				expect(res.render).toBeCalledWith('projects/get-updates/subscribed/view.njk', {
					pageHeading: 'Get updates success',
					pageTitle: 'Get updates success',
					getUpdatesStartRoute: '/projects/mock-case-ref/get-updates/start',
					subscriptionStatus: 'successful'
				});
			});
		});

		describe('When the get updates subscription is expired', () => {
			beforeEach(async () => {
				putGetUpdatesSubscription.mockImplementation(() => {
					throw new Error('Subscription details have expired');
				});
				await getUpdatesSubscribedController(req, res);
			});

			it('should call the success template with the expired page data', () => {
				expect(res.render).toBeCalledWith('projects/get-updates/subscribed/view.njk', {
					pageHeading: 'Your email verification link has expired',
					pageTitle: 'Verification link expired',
					getUpdatesStartRoute: '/projects/mock-case-ref/get-updates/start',
					subscriptionStatus: 'expired'
				});
			});
		});

		describe('When the get updates subscription is unsuccessful', () => {
			beforeEach(async () => {
				putGetUpdatesSubscription.mockImplementation(() => {
					throw new Error('There is an issue');
				});
				await getUpdatesSubscribedController(req, res);
			});

			it('should call the success template with the unsuccessful page data', () => {
				expect(res.render).toBeCalledWith('projects/get-updates/subscribed/view.njk', {
					pageHeading: 'There has been a problem with our system',
					pageTitle: 'Email system problem',
					getUpdatesStartRoute: '/projects/mock-case-ref/get-updates/start',
					subscriptionStatus: 'unsuccessful'
				});
			});
		});
	});
});
