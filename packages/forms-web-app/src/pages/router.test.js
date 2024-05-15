const { getIndexController } = require('./index/controller');
const { getContactController } = require('./contact/controller');
const { getCookiesController, postCookiesController } = require('./cookies/controller');
const { getTermsAndConditionsController } = require('./terms-and-conditions/controller');
const { getDetailedInformationController } = require('./detailed-information/controller');
const { getProjectSearchController } = require('./project-search/controller');
const { getRegisterOfApplicationsController } = require('./register-of-applications/controller');

const {
	addCommonTranslationsMiddleware
} = require('./_middleware/i18n/add-common-translations-middleware');
const {
	addIndexTranslationsMiddleware
} = require('./index/_middleware/add-index-translations-middleware');
const {
	addDetailedInformationTranslationsMiddleware
} = require('./detailed-information/_middleware/add-detailed-information-translations-middleware');

const { cookiesValidationRules } = require('./cookies/_validators/validate-cookies');
const { validationErrorHandler } = require('../validators/validation-error-handler');

const { projectsRouter } = require('./projects/router');
const { registerOfAdviceRouter } = require('./register-of-advice/router');

jest.mock('./_middleware/i18n/add-common-translations-middleware', () => {
	return {
		addCommonTranslationsMiddleware: jest.fn()
	};
});

jest.mock('./index/_middleware/add-index-translations-middleware', () => {
	return {
		addIndexTranslationsMiddleware: jest.fn()
	};
});

jest.mock(
	'./detailed-information/_middleware/add-detailed-information-translations-middleware',
	() => {
		return {
			addDetailedInformationTranslationsMiddleware: jest.fn()
		};
	}
);

jest.mock('./cookies/_validators/validate-cookies', () => {
	return {
		cookiesValidationRules: jest.fn()
	};
});

jest.mock('../config', () => {
	const originalConfig = jest.requireActual('../config');

	return {
		...originalConfig,
		featureFlag: {
			allowHomepage: true
		}
	};
});

describe('pages/router', () => {
	describe('#pagesRouter', () => {
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

		it('should call the pages routes and controllers', () => {
			expect(get).toHaveBeenCalledWith(
				'/',
				addCommonTranslationsMiddleware,
				addIndexTranslationsMiddleware,
				getIndexController
			);

			expect(get).toHaveBeenCalledWith('/contact', getContactController);

			expect(get).toHaveBeenCalledWith('/cookies', getCookiesController);
			expect(post).toHaveBeenCalledWith(
				'/cookies',
				cookiesValidationRules(),
				validationErrorHandler,
				postCookiesController
			);

			expect(get).toHaveBeenCalledWith('/terms-and-conditions', getTermsAndConditionsController);

			expect(get).toHaveBeenCalledWith(
				'/detailed-information',
				addDetailedInformationTranslationsMiddleware,
				getDetailedInformationController
			);

			expect(get).toHaveBeenCalledWith('/project-search', getProjectSearchController);

			expect(get).toHaveBeenCalledWith(
				'/register-of-applications',
				getRegisterOfApplicationsController
			);

			expect(use).toHaveBeenCalledWith(projectsRouter);

			expect(use).toHaveBeenCalledWith(registerOfAdviceRouter);

			expect(get).toBeCalledTimes(7);
			expect(post).toBeCalledTimes(1);
			expect(use).toBeCalledTimes(2);
		});
	});
});
