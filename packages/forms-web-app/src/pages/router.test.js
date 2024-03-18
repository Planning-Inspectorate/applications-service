const { getIndexController } = require('./index/controller');
const { getContactController } = require('./contact/controller');
const { getCookiesController, postCookiesController } = require('./cookies/controller');
const { getTermsAndConditionsController } = require('./terms-and-conditions/controller');
const { getDetailedInformationController } = require('./detailed-information/controller');
const { getProjectSearchController } = require('./project-search/controller');
const { getRegisterOfApplicationsController } = require('./register-of-applications/controller');

const { projectsRouter } = require('./projects/router');
const { registerOfAdviceRouter } = require('./register-of-advice/router');

const { cookiesValidationRules } = require('./cookies/_validators/validate-cookies');
const { validationErrorHandler } = require('../validators/validation-error-handler');

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
			allowHomepage: true,
			usePrivateBetaV1RoutesOnly: false
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
			expect(get).toHaveBeenCalledWith('/', getIndexController);

			expect(get).toHaveBeenCalledWith('/contact', getContactController);

			expect(get).toHaveBeenCalledWith('/cookies', getCookiesController);
			expect(post).toHaveBeenCalledWith(
				'/cookies',
				cookiesValidationRules(),
				validationErrorHandler,
				postCookiesController
			);

			expect(get).toHaveBeenCalledWith('/terms-and-conditions', getTermsAndConditionsController);

			expect(get).toHaveBeenCalledWith('/detailed-information', getDetailedInformationController);

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
