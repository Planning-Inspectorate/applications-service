const { getRegisteringController } = require('./controller');

describe('pages/have-your-say-guide/registering/controller', () => {
	describe('#getRegisteringController', () => {
		const req = {};
		const res = { render: jest.fn() };

		beforeEach(() => {
			getRegisteringController(req, res);
		});

		it('should render the page with the correct template', () => {
			expect(res.render).toHaveBeenCalledWith('have-your-say-guide/registering/view.njk');
		});
	});
});
