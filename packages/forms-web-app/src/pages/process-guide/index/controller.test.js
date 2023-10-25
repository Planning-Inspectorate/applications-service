const { getProcessGuideController } = require('./controller');

describe('pages/process-guide/index/controller', () => {
	describe('#getProcessGuideController', () => {
		describe('When getting the process guide page', () => {
			const req = {
				get: jest.fn((id) => req[id]),
				Referrer: 'mock back link url',
				session: {}
			};
			const res = { render: jest.fn() };

			beforeEach(() => {
				getProcessGuideController(req, res);
			});

			it('should render the process guide page', () => {
				expect(res.render).toHaveBeenCalledWith('process-guide/index/view.njk', {
					backLinkUrl: 'mock back link url',
					haveYourSayGuideURL: '/having-your-say-guide'
				});
			});

			it('should set the mock Referrer value onto the session', () => {
				expect(req.session).toEqual({ referrerBackLink: 'mock back link url' });
			});
		});
	});
});
