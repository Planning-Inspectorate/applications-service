const { getProcessGuideController } = require('./index/controller');
const { getPreApplicationController } = require('./pre-application/controller');
const { getAcceptanceController } = require('./acceptance/controller');
const { getPreExaminationController } = require('./pre-examination/controller');
const { getExaminationController } = require('./examination/controller');
const { getRecommendationController } = require('./recommendation/controller');
const { getDecisionController } = require('./decision/controller');
const { getPostDecisionController } = require('./post-decision/controller');

const { addSteps } = require('./_middleware/add-steps');

describe('pages/process-guide/router', () => {
	const get = jest.fn();

	jest.doMock('express', () => ({
		Router: () => ({
			get
		})
	}));

	beforeEach(() => {
		require('./router');
	});

	it('should call the process guide routes and controllers', () => {
		expect(get).toHaveBeenCalledWith(
			'/decision-making-process-guide',
			addSteps,
			getProcessGuideController
		);
		expect(get).toHaveBeenCalledWith(
			'/decision-making-process-guide/pre-application',
			addSteps,
			getPreApplicationController
		);
		expect(get).toHaveBeenCalledWith(
			'/decision-making-process-guide/review-of-the-application',
			addSteps,
			getAcceptanceController
		);
		expect(get).toHaveBeenCalledWith(
			'/decision-making-process-guide/pre-examination',
			addSteps,
			getPreExaminationController
		);
		expect(get).toHaveBeenCalledWith(
			'/decision-making-process-guide/examination-of-the-application',
			addSteps,
			getExaminationController
		);
		expect(get).toHaveBeenCalledWith(
			'/decision-making-process-guide/recommendation',
			addSteps,
			getRecommendationController
		);
		expect(get).toHaveBeenCalledWith(
			'/decision-making-process-guide/decision',
			addSteps,
			getDecisionController
		);
		expect(get).toHaveBeenCalledWith(
			'/decision-making-process-guide/what-happens-after-the-decision-is-made',
			addSteps,
			getPostDecisionController
		);
	});
});
