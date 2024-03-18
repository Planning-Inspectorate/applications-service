const { getTermsAndConditionsController } = require('./controller');

describe('pages/terms-and-conditions/controller', () => {
	describe('#getTermsAndConditionsController', () => {
		const req = {};
		const res = {};
		const next = jest.fn();

		describe('and there is an issue', () => {
			beforeEach(() => {
				getTermsAndConditionsController(req, res, next);
			});

			it('should call next with an error', () => {
				expect(next).toHaveBeenCalledWith(new TypeError('res.render is not a function'));
			});
		});

		describe('and there are no issues', () => {
			const res = {
				render: jest.fn()
			};

			beforeEach(() => {
				getTermsAndConditionsController(req, res, next);
			});

			it('should call the correct template with the page data', () => {
				expect(res.render).toHaveBeenCalledWith('terms-and-conditions/view.njk', {
					pageHeading: 'Terms and conditions',
					pageTitle: 'Terms and conditions',
					termsPageUrls: {
						contact: '/contact',
						cookies: '/cookies'
					}
				});
			});
		});
	});
});
