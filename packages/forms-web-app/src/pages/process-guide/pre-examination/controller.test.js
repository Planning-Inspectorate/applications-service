const { getPreExaminationController } = require('./controller');

describe('pages/process-guide/pre-examination/controller', () => {
	const req = {};
	const res = { render: jest.fn() };

	beforeEach(() => {
		getPreExaminationController(req, res);
	});

	it('should render the acceptance page with the correct template', () => {
		expect(res.render).toHaveBeenCalledWith('process-guide/pre-examination/view.njk', {
			haveYourSayGuideURL: '/having-your-say-guide'
		});
	});
});
