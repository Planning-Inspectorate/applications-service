const { getTakingPartController } = require('./controller');

describe('pages/have-your-say-guide/taking-part/controller', () => {
	describe('#getTakingPartController', () => {
		const req = {};
		const res = { render: jest.fn() };

		beforeEach(() => {
			getTakingPartController(req, res);
		});

		it('should render the page with the correct template', () => {
			expect(res.render).toHaveBeenCalledWith('have-your-say-guide/taking-part/view.njk');
		});
	});
});
