const { getInvolvedController } = require('./controller');

describe('pages/have-your-say-guide/get-involved/controller', () => {
	describe('#getInvolvedController', () => {
		const req = {};
		const res = { render: jest.fn() };

		beforeEach(() => {
			getInvolvedController(req, res);
		});

		it('should render the page with the correct template', () => {
			expect(res.render).toHaveBeenCalledWith('have-your-say-guide/get-involved/view.njk');
		});
	});
});
