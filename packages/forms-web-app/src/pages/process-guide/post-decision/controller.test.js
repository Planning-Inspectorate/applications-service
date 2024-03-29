const { getPostDecisionController } = require('./controller');

describe('pages/process-guide/post-decision/controller', () => {
	describe('#getPostDecisionController', () => {
		const req = {};
		const res = { render: jest.fn() };

		beforeEach(() => {
			getPostDecisionController(req, res);
		});

		it('should render the page with the correct template', () => {
			expect(res.render).toHaveBeenCalledWith('process-guide/post-decision/view.njk');
		});
	});
});
