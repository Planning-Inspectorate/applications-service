const { getProcessGuideController } = require('./index/controller');
const { getPreApplicationController } = require('./pre-application/controller');
const { getAcceptanceController } = require('./acceptance/controller');
const { getPreExaminationController } = require('./pre-examination/controller');
const { getExaminationController } = require('./examination/controller');
const { getRecommendationController } = require('./recommendation/controller');
const { getDecisionController } = require('./decision/controller');
const { getPostDecisionController } = require('./post-decision/controller');

const {
	addCommonTranslationsMiddleware
} = require('../_middleware/i18n/add-common-translations-middleware');
const {
	addProcessGuideTranslationsMiddleware
} = require('./_middleware/add-process-guide-translations-middleware');
const {
	addProcessGuideStepsMiddleware
} = require('./_middleware/add-process-guide-steps-middleware');
const {
	addIndexTranslationsMiddleware
} = require('./index/_middleware/add-index-translations-middleware');
const {
	addPreApplicationTranslationsMiddleware
} = require('./pre-application/_middleware/add-pre-application-translations-middleware');
const {
	addAcceptanceTranslationsMiddleware
} = require('./acceptance/_middleware/add-acceptance-translations-middleware');
const {
	addPreExaminationTranslationsMiddleware
} = require('./pre-examination/_middleware/add-pre-examination-translations-middleware');
const {
	addExaminationTranslationsMiddleware
} = require('./examination/_middleware/add-examination-translations-middleware');
const {
	addRecommendationTranslationsMiddleware
} = require('./recommendation/_middleware/add-recommendation-translations-middleware');
const {
	addDecisionTranslationsMiddleware
} = require('./decision/_middleware/add-decision-translations-middleware');
const {
	addPostDecisionTranslationsMiddleware
} = require('./post-decision/_middleware/add-post-decision-translations-middleware');
const { cacheNoCacheMiddleware } = require('../../middleware/cache-control');

jest.mock('../_middleware/i18n/add-common-translations-middleware', () => ({
	addCommonTranslationsMiddleware: jest.fn()
}));
jest.mock('./_middleware/add-process-guide-translations-middleware', () => ({
	addProcessGuideTranslationsMiddleware: jest.fn()
}));
jest.mock('./_middleware/add-process-guide-steps-middleware', () => ({
	addProcessGuideStepsMiddleware: jest.fn()
}));
jest.mock('./index/_middleware/add-index-translations-middleware', () => ({
	addIndexTranslationsMiddleware: jest.fn()
}));
jest.mock('./pre-application/_middleware/add-pre-application-translations-middleware', () => ({
	addDetailedInformationTranslationsMiddleware: jest.fn()
}));
jest.mock('./acceptance/_middleware/add-acceptance-translations-middleware', () => ({
	addAcceptanceTranslationsMiddleware: jest.fn()
}));
jest.mock('./pre-examination/_middleware/add-pre-examination-translations-middleware', () => ({
	addPreExaminationTranslationsMiddleware: jest.fn()
}));
jest.mock('./examination/_middleware/add-examination-translations-middleware', () => ({
	addExaminationTranslationsMiddleware: jest.fn()
}));
jest.mock('./recommendation/_middleware/add-recommendation-translations-middleware', () => ({
	addRecommendationTranslationsMiddleware: jest.fn()
}));
jest.mock('./decision/_middleware/add-decision-translations-middleware', () => ({
	addDecisionTranslationsMiddleware: jest.fn()
}));
jest.mock('./post-decision/_middleware/add-post-decision-translations-middleware', () => ({
	addPostDecisionTranslationsMiddleware: jest.fn()
}));

describe('pages/process-guide/router', () => {
	const get = jest.fn();
	const post = jest.fn();
	const use = jest.fn();

	jest.doMock('express', () => ({
		Router: () => ({
			get,
			post,
			use
		})
	}));

	beforeEach(() => {
		require('./router');
	});

	it('should call the process guide routes and controllers', () => {
		expect(use).toHaveBeenCalledWith(
			addCommonTranslationsMiddleware,
			addProcessGuideTranslationsMiddleware,
			cacheNoCacheMiddleware
		);

		expect(get).toHaveBeenCalledWith(
			'/decision-making-process-guide',
			addIndexTranslationsMiddleware,
			addProcessGuideStepsMiddleware,
			getProcessGuideController
		);
		expect(get).toHaveBeenCalledWith(
			'/decision-making-process-guide/pre-application',
			addPreApplicationTranslationsMiddleware,
			addProcessGuideStepsMiddleware,
			getPreApplicationController
		);
		expect(get).toHaveBeenCalledWith(
			'/decision-making-process-guide/review-of-the-application',
			addAcceptanceTranslationsMiddleware,
			addProcessGuideStepsMiddleware,
			getAcceptanceController
		);
		expect(get).toHaveBeenCalledWith(
			'/decision-making-process-guide/pre-examination',
			addPreExaminationTranslationsMiddleware,
			addProcessGuideStepsMiddleware,
			getPreExaminationController
		);
		expect(get).toHaveBeenCalledWith(
			'/decision-making-process-guide/examination-of-the-application',
			addExaminationTranslationsMiddleware,
			addProcessGuideStepsMiddleware,
			getExaminationController
		);
		expect(get).toHaveBeenCalledWith(
			'/decision-making-process-guide/recommendation',
			addRecommendationTranslationsMiddleware,
			addProcessGuideStepsMiddleware,
			getRecommendationController
		);
		expect(get).toHaveBeenCalledWith(
			'/decision-making-process-guide/decision',
			addDecisionTranslationsMiddleware,
			addProcessGuideStepsMiddleware,
			getDecisionController
		);
		expect(get).toHaveBeenCalledWith(
			'/decision-making-process-guide/what-happens-after-the-decision-is-made',
			addPostDecisionTranslationsMiddleware,
			addProcessGuideStepsMiddleware,
			getPostDecisionController
		);

		expect(get).toBeCalledTimes(8);
		expect(post).toBeCalledTimes(0);
		expect(use).toBeCalledTimes(1);
	});
});
