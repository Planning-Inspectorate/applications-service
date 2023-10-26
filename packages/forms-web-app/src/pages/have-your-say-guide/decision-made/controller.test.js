const { getDecisionMadeController } = require('./controller');

describe('pages/have-your-say-guide/decision-made/controller', () => {
	describe('#getDecisionMadeController', () => {
		const req = {};
		const res = { render: jest.fn() };

		beforeEach(() => {
			getDecisionMadeController(req, res);
		});

		it('should render the page with the correct template', () => {
			expect(res.render).toHaveBeenCalledWith('have-your-say-guide/decision-made/view.njk');
		});
	});
});
