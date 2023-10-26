const { getDecisionController } = require('./controller');

describe('pages/process-guide/decision/controller', () => {
	describe('#getDecisionController', () => {
		const req = {};
		const res = { render: jest.fn() };

		beforeEach(() => {
			getDecisionController(req, res);
		});

		it('should render the page with the correct template', () => {
			expect(res.render).toHaveBeenCalledWith('process-guide/decision/view.njk');
		});
	});
});
