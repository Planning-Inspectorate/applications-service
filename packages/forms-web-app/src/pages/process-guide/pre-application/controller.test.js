const { getPreApplicationController } = require('./controller');

describe('pages/process-guide/pre-application/controller', () => {
	const req = {};
	const res = { render: jest.fn() };

	beforeEach(() => {
		getPreApplicationController(req, res);
	});

	it('should render the acceptance page with the correct template', () => {
		expect(res.render).toHaveBeenCalledWith('process-guide/pre-application/view.njk', {
			haveYourSayGuideURL: '/having-your-say-guide'
		});
	});
});
