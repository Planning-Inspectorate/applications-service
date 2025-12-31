const { getIndexController } = require('./index/controller');
const { getContactController } = require('./contact/controller');
const { getCookiesController, postCookiesController } = require('./cookies/controller');
const { getTermsAndConditionsController } = require('./terms-and-conditions/controller');
const { getDetailedInformationController } = require('./detailed-information/controller');
const { getProjectSearchController } = require('./project-search/controller');
const { getRegisterOfApplicationsController } = require('./register-of-applications/controller');
const { getProjectsMapController } = require('./projects-map/controller');

const {
	addCheckboxAccordionTranslationsMiddleware
} = require('./_translations/components/checkbox-accordion/add-checkbox-accordion-translations-middleware');
const {
	addCommonTranslationsMiddleware
} = require('./_middleware/i18n/add-common-translations-middleware');
const {
	addIndexTranslationsMiddleware
} = require('./index/_middleware/add-index-translations-middleware');
const {
	addDetailedInformationTranslationsMiddleware
} = require('./detailed-information/_middleware/add-detailed-information-translations-middleware');
const {
	addTermsAndConditionsTranslationsMiddleware
} = require('./terms-and-conditions/_middleware/add-terms-and-conditions-translations-middleware');
const {
	addContactTranslationsMiddleware
} = require('./contact/_middleware/add-contact-translations-middleware');
const {
	addCookiesTranslationsMiddleware
} = require('./cookies/_middleware/add-cookies-translations-middleware');
const {
	addRegisterOfApplicationsTranslationsMiddleware
} = require('./register-of-applications/_middleware/add-register-of-applications-translations-middleware');
const {
	addProjectSearchTranslationsMiddleware
} = require('./project-search/_middleware/add-project-search-translations-middleware');
const {
	addProjectsMapTranslationsMiddleware
} = require('./projects-map/_middleware/add-projects-map-translations-middleware');

const { cookiesValidationRules } = require('./cookies/_validators/validate-cookies');
const { validationErrorHandler } = require('../validators/validation-error-handler');

const { projectsRouter } = require('./projects/router');
const { registerOfAdviceRouter } = require('./register-of-advice/router');

jest.mock(
	'./_translations/components/checkbox-accordion/add-checkbox-accordion-translations-middleware',
	() => {
		return {
			addCheckboxAccordionTranslationsMiddleware: jest.fn()
		};
	}
);
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
jest.mock('./contact/_middleware/add-contact-translations-middleware', () => {
	return {
		addContactTranslationsMiddleware: jest.fn()
	};
});
jest.mock('./project-search/_middleware/add-project-search-translations-middleware', () => {
	return {
		addProjectSearchTranslationsMiddleware: jest.fn()
	};
});
jest.mock('./projects-map/_middleware/add-projects-map-translations-middleware', () => {
	return {
		addProjectsMapTranslationsMiddleware: jest.fn()
	};
});
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

			expect(get).toHaveBeenCalledWith(
				'/contact',
				addCommonTranslationsMiddleware,
				addContactTranslationsMiddleware,
				getContactController
			);

			expect(get).toHaveBeenCalledWith(
				'/cookies',
				addCommonTranslationsMiddleware,
				addCookiesTranslationsMiddleware,
				getCookiesController
			);

			expect(post).toHaveBeenCalledWith(
				'/cookies',
				cookiesValidationRules(),
				validationErrorHandler,
				addCookiesTranslationsMiddleware,
				postCookiesController
			);

			expect(get).toHaveBeenCalledWith(
				'/terms-and-conditions',
				addTermsAndConditionsTranslationsMiddleware,
				getTermsAndConditionsController
			);

			expect(get).toHaveBeenCalledWith(
				'/detailed-information',
				addDetailedInformationTranslationsMiddleware,
				getDetailedInformationController
			);

			expect(get).toHaveBeenCalledWith(
				'/project-search',
				addCheckboxAccordionTranslationsMiddleware,
				addCommonTranslationsMiddleware,
				addProjectSearchTranslationsMiddleware,
				getProjectSearchController
			);

			expect(get).toHaveBeenCalledWith(
				'/register-of-applications',
				addCommonTranslationsMiddleware,
				addRegisterOfApplicationsTranslationsMiddleware,
				getRegisterOfApplicationsController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects-map',
				addCommonTranslationsMiddleware,
				addProjectsMapTranslationsMiddleware,
				getProjectsMapController
			);

			expect(use).toHaveBeenCalledWith(projectsRouter);

			expect(use).toHaveBeenCalledWith(registerOfAdviceRouter);

			expect(get).toBeCalledTimes(8);
			expect(post).toBeCalledTimes(2);
			expect(use).toBeCalledTimes(2);
		});
	});
});
