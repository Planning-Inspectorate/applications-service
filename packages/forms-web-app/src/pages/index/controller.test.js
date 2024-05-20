const { getIndexController } = require('./controller');

const defaultPageData = {
	homePageUrls: {
		contactURL: '/contact',
		detailedInformationURL: '/detailed-information',
		haveYourSayGuideURL: 'having-your-say-guide',
		processGuideURL: 'decision-making-process-guide',
		projectSearchURL: 'project-search',
		nsipNewsURL:
			'https://www.gov.uk/search/news-and-communications?parent=planning-inspectorate&organisations%5B%5D=planning-inspectorate&order=updated-newest'
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
