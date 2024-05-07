const { getProcessGuideController } = require('./index/controller');
const { getPreApplicationController } = require('./pre-application/controller');
const { getAcceptanceController } = require('./acceptance/controller');
const { getPreExaminationController } = require('./pre-examination/controller');
const { getExaminationController } = require('./examination/controller');
const { getRecommendationController } = require('./recommendation/controller');
const { getDecisionController } = require('./decision/controller');
const { getPostDecisionController } = require('./post-decision/controller');
const { addSteps } = require('./_middleware/add-steps');
const {
	addIndexTranslationsMiddleware
} = require('./index/_middleware/add-index-translations-middleware');
const {
	addProcessGuideTranslationsMiddleware
} = require('./_middleware/add-process-guide-translations-middleware');
const {
	addCommonTranslationsMiddleware
} = require('../../../src/pages/_middleware/i18n/add-common-translations-middleware');

describe('pages/process-guide/router', () => {
	const get = jest.fn();
	const use = jest.fn();

	jest.doMock('express', () => ({
		Router: () => ({
			get,
			use
		})
	}));

	beforeEach(() => {
		require('./router');
	});

	it('should call the process guide routes and controllers', () => {
		expect(use).toHaveBeenCalledWith(
			addCommonTranslationsMiddleware,
			addIndexTranslationsMiddleware,
			addProcessGuideTranslationsMiddleware
		);
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
		expect(get).toBeCalledTimes(8);
	});
});
