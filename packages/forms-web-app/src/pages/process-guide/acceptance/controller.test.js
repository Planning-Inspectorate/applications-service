const { getAcceptanceController } = require('./controller');

describe('pages/process-guide/acceptance/controller', () => {
	describe('#getAcceptanceController', () => {
		const req = {};
		const res = { render: jest.fn() };

		beforeEach(() => {
			getAcceptanceController(req, res);
		});

		it('should render the page with the correct template', () => {
			expect(res.render).toHaveBeenCalledWith('process-guide/acceptance/view.njk');
		});
	});
});
