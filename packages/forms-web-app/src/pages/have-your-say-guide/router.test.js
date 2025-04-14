const { getDecisionMadeController } = require('./decision-made/controller');
const { getDuringExaminationController } = require('./during-examination/controller');
const { getInvolvedController } = require('./get-involved/controller');
const { getHaveYourSayGuideController } = require('./index/controller');
const { getRegisteringController } = require('./registering/controller');
const { getTakingPartController } = require('./taking-part/controller');

const {
	addCommonTranslationsMiddleware
} = require('../_middleware/i18n/add-common-translations-middleware');
const {
	addHaveYourSayGuideTranslationsMiddleware
} = require('./_middleware/add-have-your-say-guide-translations-middleware');
const {
	addHaveYourSayGuideStepsMiddleware
} = require('./_middleware/add-have-your-say-guide-steps-middleware');
const {
	addIndexTranslationsMiddleware
} = require('./index/_middleware/add-index-translations-middleware');
const {
	addTakingPartTranslationsMiddleware
} = require('./taking-part/_middleware/add-taking-part-translations-middleware');
const {
	addRegisteringTranslationsMiddleware
} = require('./registering/_middleware/add-registering-translations-middleware');
const {
	addGetInvolvedTranslationsMiddleware
} = require('./get-involved/_middleware/add-get-involved-translations-middleware');
const {
	addDuringExaminationTranslationsMiddleware
} = require('./during-examination/_middleware/add-during-examination-translations-middleware');
const {
	addDecisionMadeTranslationsMiddleware
} = require('./decision-made/_middleware/add-decision-made-translations-middleware');

describe('pages/have-your-say-guide/router', () => {
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
			addHaveYourSayGuideTranslationsMiddleware
		);
		expect(get).toHaveBeenCalledWith(
			'/having-your-say-guide',
			addIndexTranslationsMiddleware,
			addHaveYourSayGuideStepsMiddleware,
			getHaveYourSayGuideController
		);
		expect(get).toHaveBeenCalledWith(
			'/having-your-say-guide/index',
			addIndexTranslationsMiddleware,
			addHaveYourSayGuideStepsMiddleware,
			getHaveYourSayGuideController
		);
		expect(get).toHaveBeenCalledWith(
			'/having-your-say-guide/taking-part-pre-application',
			addTakingPartTranslationsMiddleware,
			addHaveYourSayGuideStepsMiddleware,
			getTakingPartController
		);
		expect(get).toHaveBeenCalledWith(
			'/having-your-say-guide/registering-have-your-say',
			addRegisteringTranslationsMiddleware,
			addHaveYourSayGuideStepsMiddleware,
			getRegisteringController
		);
		expect(get).toHaveBeenCalledWith(
			'/having-your-say-guide/get-involved-preliminary-meeting',
			addGetInvolvedTranslationsMiddleware,
			addHaveYourSayGuideStepsMiddleware,
			getInvolvedController
		);
		expect(get).toHaveBeenCalledWith(
			'/having-your-say-guide/have-your-say-examination',
			addDuringExaminationTranslationsMiddleware,
			addHaveYourSayGuideStepsMiddleware,
			getDuringExaminationController
		);
		expect(get).toHaveBeenCalledWith(
			'/having-your-say-guide/what-happens-after-decision',
			addDecisionMadeTranslationsMiddleware,
			addHaveYourSayGuideStepsMiddleware,
			getDecisionMadeController
		);
		expect(get).toHaveBeenCalledTimes(7);
		expect(post).toBeCalledTimes(0);
		expect(use).toBeCalledTimes(2);
	});
});
