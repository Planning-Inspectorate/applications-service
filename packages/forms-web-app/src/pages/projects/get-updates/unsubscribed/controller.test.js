const { getUpdatesUnsubscribedController } = require('./controller');

describe('projects/get-updates/unsubscribed/controller', () => {
	describe('#getUpdatesUnsubscribedController', () => {
		describe('When the get updates unsubscribed session value is true', () => {
			const req = {
				session: {
					getUpdates: {
						unsubscribed: true
					}
				},
				i18n: {
					language: 'en'
				}
			};
			const res = {
				render: jest.fn()
			};
			const next = jest.fn();

			beforeEach(() => {
				getUpdatesUnsubscribedController(req, res, next);
			});

			it('should render the unsubscribed page', () => {
				expect(res.render).toHaveBeenCalledWith('projects/get-updates/unsubscribed/view.njk', {
					pageHeading: 'Unsubscribe success',
					pageTitle: 'Successfully unsubscribed',
					isWelsh: false
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
				getUpdatesUnsubscribedController(req, res, next);
			});

			it('should throw an error', () => {
				expect(next).toHaveBeenCalledWith(new Error('Get updates is not unsubscribed'));
			});
		});
	});
});
