const { getPreExaminationController } = require('./controller');

describe('pages/process-guide/pre-examination/controller', () => {
	describe('#getPreExaminationController', () => {
		const req = {};
		const res = { render: jest.fn() };

		beforeEach(() => {
			getPreExaminationController(req, res);
		});

		it('should render the page with the correct template', () => {
			expect(res.render).toHaveBeenCalledWith('process-guide/pre-examination/view.njk', {
				haveYourSayGuideURL: '/having-your-say-guide'
			});
		});
	});
});
