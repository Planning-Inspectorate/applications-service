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
	pageHeading: 'Welcome to Find a National Infrastructure Project',
	pageTitle: 'Welcome to Find a National Infrastructure Project',
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
