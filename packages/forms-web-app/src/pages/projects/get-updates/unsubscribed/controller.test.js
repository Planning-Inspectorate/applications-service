const { getGetUpdatesUnsubscribedController } = require('./controller');

describe('projects/get-updates/unsubscribed/controller', () => {
	describe('#getGetUpdatesUnsubscribedController', () => {
		describe('When the get updates unsubscribed session value is true', () => {
			const req = {
				session: {
					getUpdates: {
						unsubscribed: true
					}
				}
			};
			const res = {
				render: jest.fn()
			};
			const next = jest.fn();

			beforeEach(() => {
				getGetUpdatesUnsubscribedController(req, res, next);
			});

			it('should render the unsubscribed page', () => {
				expect(res.render).toHaveBeenCalledWith('projects/get-updates/unsubscribed/view.njk', {
					pageHeading: 'Unsubscribe success',
					pageTitle: 'Successfully unsubscribed'
				});
			});
		});
		describe('When the get updates unsubscribed session value is false', () => {
			const req = {
				session: {
					getUpdates: {
						unsubscribed: false
					}
				}
			};
			const res = {
				render: jest.fn()
			};
			const next = jest.fn();

			beforeEach(() => {
				getGetUpdatesUnsubscribedController(req, res, next);
			});

			it('should throw an error', () => {
				expect(next).toHaveBeenCalledWith(new Error('Get updates is not unsubscribed'));
			});
		});
	});
});
