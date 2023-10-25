const { getDuringExaminationController } = require('./controller');

describe('pages/have-your-say-guide/during-examination/controller', () => {
	describe('#getDuringExaminationController', () => {
		const req = {};
		const res = { render: jest.fn() };

		beforeEach(() => {
			getDuringExaminationController(req, res);
		});

		it('should render the page with the correct template', () => {
			expect(res.render).toHaveBeenCalledWith('have-your-say-guide/during-examination/view.njk');
		});
	});
});
