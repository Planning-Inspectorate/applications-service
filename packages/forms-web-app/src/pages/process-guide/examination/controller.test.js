const { getExaminationController } = require('./controller');

describe('pages/process-guide/examination/controller', () => {
	describe('#getExaminationController', () => {
		const req = {};
		const res = { render: jest.fn() };

		beforeEach(() => {
			getExaminationController(req, res);
		});

		it('should render the page with the correct template', () => {
			expect(res.render).toHaveBeenCalledWith('process-guide/examination/view.njk', {
				haveYourSayGuideURL: '/having-your-say-guide'
			});
		});
	});
});
