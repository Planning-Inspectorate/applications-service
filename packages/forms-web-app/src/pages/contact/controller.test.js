const { getContactController } = require('./controller');

describe('pages/contact/controller', () => {
	describe('#getContactController', () => {
		describe('and there is an issue', () => {
			const req = {};
			const res = {};
			const next = jest.fn();

			beforeEach(() => {
				getContactController(req, res, next);
			});

			it('should call next with an error', () => {
				expect(next).toHaveBeenCalledWith(new TypeError('res.render is not a function'));
			});
		});

		describe('and there are no issues', () => {
			const req = {};
			const res = {
				render: jest.fn()
			};
			const next = jest.fn();

			beforeEach(() => {
				getContactController(req, res, next);
			});

			it('should call the correct template with the page data', () => {
				expect(res.render).toHaveBeenCalledWith('contact/view.njk', {
					pageHeading: 'Contact us',
					pageTitle: 'Contact'
				});
			});
		});
	});
});
