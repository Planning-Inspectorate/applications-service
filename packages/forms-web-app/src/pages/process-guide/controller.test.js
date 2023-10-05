const { getProcessGuideController } = require('./controller');

describe('pages/process-guide/controller', () => {
	describe('#getProcessGuideController', () => {
		describe('When getting the planning process page', () => {
			const req = {};
			const res = { render: jest.fn() };

			beforeEach(() => {
				getProcessGuideController(req, res);
			});

			it('should render the process guide page', () => {
				expect(res.render).toHaveBeenCalledWith('process-guide/view.njk', {
					pageHeading: 'The process for nationally significant infrastructure projects (NSIPs)',
					pageTitle: 'The process for nationally significant infrastructure projects (NSIPs)'
				});
			});
		});
	});
});
