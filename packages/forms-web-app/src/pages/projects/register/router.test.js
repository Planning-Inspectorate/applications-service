const { getRegisterIndexController } = require('./index/controller');
const {
	getRegisteringForController,
	postRegisteringForController
} = require('./registering-for/controller');

const { projectsMiddleware } = require('../_middleware/middleware');
const { registerMiddleware } = require('./_middleware/register-middleware');
const { registerStartRedirectMiddleware } = require('./_middleware/start-redirect-middleware');
const {
	addRegisterTranslationsMiddleware
} = require('./_middleware/add-register-translations-middleware');
const {
	addCommonTranslationsMiddleware
} = require('../../_middleware/i18n/add-common-translations-middleware');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');

const {
	validateRegisteringForOptions
} = require('./registering-for/_validators/validate-registering-for-options');

const { registerAgentRouter } = require('./agent/router');
const { registerMyselfRouter } = require('./myself/router');
const { registerOrganisationRouter } = require('./organisation/router');

jest.mock('./registering-for/_validators/validate-registering-for-options', () => ({
	validateRegisteringForOptions: jest.fn()
}));

describe('pages/projects/register/router', () => {
	describe('#registerRouter', () => {
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

		it('should call the register routes and controllers', () => {
			expect(use).toHaveBeenCalledWith(
				addCommonTranslationsMiddleware,
				addRegisterTranslationsMiddleware
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/register-have-your-say',
				projectsMiddleware,
				getRegisterIndexController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/register-have-your-say/start',
				projectsMiddleware,
				getRegisterIndexController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/who-registering-for',
				registerStartRedirectMiddleware,
				registerMiddleware,
				getRegisteringForController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/who-registering-for',
				registerStartRedirectMiddleware,
				registerMiddleware,
				validateRegisteringForOptions(),
				validationErrorHandler,
				postRegisteringForController
			);

			expect(use).toHaveBeenCalledWith(registerAgentRouter);

			expect(use).toHaveBeenCalledWith(registerMyselfRouter);

			expect(use).toHaveBeenCalledWith(registerOrganisationRouter);

			expect(get).toBeCalledTimes(3);
			expect(post).toBeCalledTimes(1);
			expect(use).toBeCalledTimes(4);
		});
	});
});
