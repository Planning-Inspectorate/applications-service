const { get } = require('./router-mock');
const {
	getDecisionMakingProcessGuide,
	getPreApplication,
	getExaminationOfTheApplication,
	getReviewOfTheApplication,
	getPreExamination,
	getRecommendationAndDecision,
	getWhatHappensAfterTheDecisionIsMade
} = require('../../../src/controllers/decision-making-process-guide');

describe('routes/decision-making-process-guide', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('../../../src/routes/decision-making-process-guide');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(get).toHaveBeenCalledWith('/', getDecisionMakingProcessGuide);
		expect(get).toHaveBeenCalledWith('/pre-application', getPreApplication);
		expect(get).toHaveBeenCalledWith(
			'/examination-of-the-application',
			getExaminationOfTheApplication
		);
		expect(get).toHaveBeenCalledWith('/review-of-the-application', getReviewOfTheApplication);
		expect(get).toHaveBeenCalledWith('/pre-examination', getPreExamination);
		expect(get).toHaveBeenCalledWith('/recommendation-and-decision', getRecommendationAndDecision);
		expect(get).toHaveBeenCalledWith(
			'/what-happens-after-the-decision-is-made',
			getWhatHappensAfterTheDecisionIsMade
		);
	});
});
