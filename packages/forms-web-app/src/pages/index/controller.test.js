const { getIndexController } = require('./controller');
const { featureFlag } = require('../../config');
const { projectsMapRoute } = require('../projects-map/config');

featureFlag.allowWelshCases = true;
featureFlag.enableProjectsMap = true;

const defaultPageData = {
	homePageUrls: {
		contactURL: '/contact',
		detailedInformationURL: '/detailed-information',
		haveYourSayGuideURL: 'having-your-say-guide',
		processGuideURL: 'decision-making-process-guide',
		projectSearchURL: 'project-search',
		projectsMapURL: projectsMapRoute,
		nsipNewsURL:
			'https://www.gov.uk/search/news-and-communications?parent=planning-inspectorate&organisations%5B%5D=planning-inspectorate&order=updated-newest',
		developmentConsentURL:
			'https://www.gov.uk/government/collections/nationally-significant-infrastructure-projects-development-consent'
	}
};

describe('pages/index/controller', () => {
	describe('#getIndexController', () => {
		const req = {
			i18n: {
				language: 'en'
			}
		};
		const res = { render: jest.fn() };

		afterEach(() => {
			jest.resetAllMocks();
		});
		beforeEach(() => {
			getIndexController(req, res);
		});

		it('should render the page using correct template and data', () => {
			expect(res.render).toHaveBeenCalledWith('index/view.njk', {
				...defaultPageData,
				allowWelshCases: true,
				enableProjectsMap: true
			});
		});
	});
});
