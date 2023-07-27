const { getProjectUpdatesUnsubscribe, postProjectUpdatesUnsubscribe } = require('./controller');

const { deleteProjectUpdatesSubscription } = require('../../../../lib/application-api-wrapper');

jest.mock('../../../../lib/application-api-wrapper', () => ({
	deleteProjectUpdatesSubscription: jest.fn()
}));

describe('projects/project-updates/unsubscribe/controller', () => {
	describe('#getProjectUpdatesUnsubscribe', () => {
		describe('When an email value is present in the query', () => {
			const req = {
				query: {
					email: 'mock@email.com'
				},
				session: {}
			};
			const res = {
				render: jest.fn()
			};
			const next = jest.fn();

			beforeEach(async () => {
				await getProjectUpdatesUnsubscribe(req, res, next);
			});

			it('it should call the correct with the page data', async () => {
				expect(res.render).toHaveBeenCalledWith('projects/project-updates/unsubscribe/view.njk', {
					email: 'mock@email.com',
					pageHeading: 'Are you sure you want to unsubscribe?',
					pageTitle: 'Unsubscribe confirmation'
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
				getProjectUpdatesUnsubscribe(req, res, next);
			});
			it('should render the error page', () => {
				expect(next).toHaveBeenCalledWith(Error('Email not found'));
			});
		});
	});

	describe('#postProjectUpdatesUnsubscribe', () => {
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
				deleteProjectUpdatesSubscription.mockImplementation(() => {
					return {
						resp_code: 200
					};
				});
				await postProjectUpdatesUnsubscribe(req, res, next);
			});

			it('should call the delete project updates function with the correct arguments', () => {
				expect(deleteProjectUpdatesSubscription).toHaveBeenCalledWith(
					'mock case ref',
					'mock@email.com'
				);
			});

			it('should set the project updates unsubscribed session value to true', () => {
				expect(req.session).toEqual({ projectUpdates: { unsubscribed: true } });
			});

			it('should redirect to the next page', () => {
				expect(res.redirect).toHaveBeenCalledWith('unsubscribed');
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
				deleteProjectUpdatesSubscription.mockImplementation(() => {
					throw new Error('subscription is not unsubscribed');
				});
				await postProjectUpdatesUnsubscribe(req, res, next);
			});

			it('should throw and error', () => {
				expect(next).toHaveBeenCalledWith(new Error('subscription is not unsubscribed'));
			});
		});
	});
});
