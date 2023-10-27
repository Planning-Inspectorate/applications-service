const { getRecommendationController } = require('./controller');

describe('pages/process-guide/recommendation/controller', () => {
	describe('#getRecommendationController', () => {
		const req = {};
		const res = { render: jest.fn() };

		beforeEach(() => {
			getRecommendationController(req, res);
		});

		it('should render the page with the correct template', () => {
			expect(res.render).toHaveBeenCalledWith('process-guide/recommendation/view.njk');
		});
	});
});
