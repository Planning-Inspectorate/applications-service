const { getHaveYourSayGuideController } = require('./controller');

describe('pages/have-your-say-guide/index/controller', () => {
	describe('#getHaveYourSayGuideController', () => {
		describe('When getting the have your say guide page', () => {
			const req = {
				get: jest.fn((id) => req[id]),
				Referrer: 'mock back link url',
				session: {}
			};
			const res = { render: jest.fn() };

			beforeEach(() => {
				getHaveYourSayGuideController(req, res);
			});

			it('should render the process guide page', () => {
				expect(res.render).toHaveBeenCalledWith('have-your-say-guide/index/view.njk', {
					backLinkUrl: 'mock back link url'
				});
			});

			it('should set the mock Referrer value onto the session', () => {
				expect(req.session).toEqual({ referrerBackLink: 'mock back link url' });
			});
		});
	});
});
