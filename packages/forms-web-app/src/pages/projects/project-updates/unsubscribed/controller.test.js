const { getProjectUpdatesUnsubscribed } = require('./controller');

describe('projects/project-updates/unsubscribed/controller', () => {
	describe('#getProjectUpdatesUnsubscribed', () => {
		describe('When the project updates unsubscribed session value is true', () => {
			const req = {
				session: {
					projectUpdates: {
						unsubscribed: true
					}
				}
			};
			const res = {
				render: jest.fn()
			};
			const next = jest.fn();

			beforeEach(() => {
				getProjectUpdatesUnsubscribed(req, res, next);
			});

			it('should render the unsubscribed page', () => {
				expect(res.render).toHaveBeenCalledWith('projects/project-updates/unsubscribed/view.njk', {
					pageHeading: 'Unsubscribe success',
					pageTitle: 'Successfully unsubscribed'
				});
			});
		});
		describe('When the project updates unsubscribed session value is false', () => {
			const req = {
				session: {
					projectUpdates: {
						unsubscribed: false
					}
				}
			};
			const res = {
				render: jest.fn()
			};
			const next = jest.fn();

			beforeEach(() => {
				getProjectUpdatesUnsubscribed(req, res, next);
			});

			it('should throw an error', () => {
				expect(next).toHaveBeenCalledWith(new Error('Project updates is not unsubscribed'));
			});
		});
	});
});
