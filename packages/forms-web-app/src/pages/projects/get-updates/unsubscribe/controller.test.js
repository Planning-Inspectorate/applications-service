const {
	getGetUpdatesUnsubscribeController,
	postGetUpdatesUnsubscribeController
} = require('./controller');

const { deleteGetUpdatesSubscription } = require('../../../../lib/application-api-wrapper');

jest.mock('../../../../lib/application-api-wrapper', () => ({
	deleteGetUpdatesSubscription: jest.fn()
}));

describe('projects/get-updates/unsubscribe/controller', () => {
	describe('#getGetUpdatesUnsubscribeController', () => {
		describe('When an email value is present in the query', () => {
			const req = {
				query: {
					email: 'mock@email.com'
				},
				session: {},
				i18n: {
					language: 'en'
				}
			};
			const res = {
				render: jest.fn()
			};
			const next = jest.fn();

			beforeEach(async () => {
				await getGetUpdatesUnsubscribeController(req, res, next);
			});

			it('it should call the correct view with the page data', async () => {
				expect(res.render).toHaveBeenCalledWith('projects/get-updates/unsubscribe/view.njk', {
					email: 'mock@email.com',
					isWelsh: false
				});
			});
		});

		describe('When an email value is NOT present in the query', () => {
			const req = {
				query: {}
			};
			const res = {
				render: jest.fn()
			};
			const next = jest.fn();

			beforeEach(() => {
				getGetUpdatesUnsubscribeController(req, res, next);
			});
			it('should render the error page', () => {
				expect(next).toHaveBeenCalledWith(Error('Email not found'));
			});
		});
	});

	describe('#postGetUpdatesUnsubscribeController', () => {
		describe('When the subscription is successfully unsubscribed', () => {
			const req = {
				body: {
					email: 'mock@email.com'
				},
				params: {
					case_ref: 'mock case ref'
				},
				session: {}
			};
			const res = {
				redirect: jest.fn()
			};
			const next = jest.fn();

			beforeEach(async () => {
				deleteGetUpdatesSubscription.mockImplementation(() => {
					return {
						resp_code: 200
					};
				});
				await postGetUpdatesUnsubscribeController(req, res, next);
			});

			it('should call the delete get updates function with the correct arguments', () => {
				expect(deleteGetUpdatesSubscription).toHaveBeenCalledWith(
					'mock case ref',
					'mock@email.com'
				);
			});

			it('should set the get updates unsubscribed session value to true', () => {
				expect(req.session).toEqual({ getUpdates: { unsubscribed: true } });
			});

			it('should redirect to the next page', () => {
				expect(res.redirect).toHaveBeenCalledWith(
					'/projects/mock case ref/get-updates/unsubscribed'
				);
			});
		});

		describe('When the subscription is NOT successfully unsubscribed', () => {
			const req = {
				body: {
					email: 'mock@email.com'
				},
				params: {
					case_ref: 'mock case ref'
				},
				session: {}
			};
			const res = {
				redirect: jest.fn()
			};
			const next = jest.fn();

			beforeEach(async () => {
				deleteGetUpdatesSubscription.mockImplementation(() => {
					throw new Error('subscription is not unsubscribed');
				});
				await postGetUpdatesUnsubscribeController(req, res, next);
			});

			it('should throw and error', () => {
				expect(next).toHaveBeenCalledWith(new Error('subscription is not unsubscribed'));
			});
		});
	});
});
