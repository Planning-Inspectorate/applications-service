const { getIndexController } = require('./controller');

jest.mock('../../../src/config', () => {
	const originalConfig = jest.requireActual('../../../src/config');
	return {
		...originalConfig,
		featureFlag: {
			usePrivateBetaV1RoutesOnly: false
		}
	};
});

const defaultPageData = {
	headerTitle: 'National Infrastructure Projects',
	pageHeading: 'Welcome to National Infrastructure Planning',
	pageTitle: 'Welcome to National Infrastructure Planning',
	showProjectSearchUrl: true,
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
