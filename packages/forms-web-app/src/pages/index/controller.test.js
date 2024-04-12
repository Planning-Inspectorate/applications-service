const { getIndexController } = require('./controller');

const defaultPageData = {
	pageHeading: 'Welcome to Find a National Infrastructure Project',
	pageTitle: 'Welcome to Find a National Infrastructure Project',
	homePageUrls: {
		contactURL: '/contact',
		detailedInformationURL: '/detailed-information',
		haveYourSayGuide: 'having-your-say-guide',
		processGuide: 'decision-making-process-guide',
		projectSearch: 'project-search'
	}
};

describe('pages/index/controller', () => {
	describe('#getIndexController', () => {
		const req = {};
		const res = { render: jest.fn() };

		afterEach(() => {
			jest.resetAllMocks();
		});
		beforeEach(() => {
			getIndexController(req, res);
		});

		it('should render the page using correct template and data', () => {
			expect(res.render).toHaveBeenCalledWith('index/view.njk', defaultPageData);
		});
	});
});
