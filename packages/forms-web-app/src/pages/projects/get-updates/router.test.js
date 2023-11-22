const { projectsMiddleware, projectMigrationMiddleware } = require('../_middleware/middleware');
const { getGetUpdatesIndexController } = require('./index/controller');
const {
	getGetUpdatesEmailController,
	postGetUpdatesEmailController
} = require('./email/controller');
const { emailValidationRules } = require('../../../validators/shared/email-address');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
	getGetUpdatesHowOftenController,
	postGetUpdatesHowOftenController
} = require('./how-often/controller');
const { howOftenValidationRules } = require('./how-often/validator');
const { getGetUpdatesConfirmYourEmailController } = require('./confirm-your-email/controller');
const { getGetUpdatesSubscribedController } = require('./subscribed/controller');
const {
	getGetUpdatesUnsubscribeController,
	postGetUpdatesUnsubscribeController
} = require('./unsubscribe/controller');
const { getGetUpdatesUnsubscribedController } = require('./unsubscribed/controller');

jest.mock('../../../validators/shared/email-address', () => {
	return {
		emailValidationRules: jest.fn()
	};
});

jest.mock('./how-often/validator', () => {
	return {
		howOftenValidationRules: jest.fn()
	};
});

describe('pages/projects/get-updates/router', () => {
	describe('#getUpdatesRouter', () => {
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

		it('it should call get updates routes and controllers', () => {
			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/get-updates/start',
				[projectsMiddleware, projectMigrationMiddleware],
				getGetUpdatesIndexController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/get-updates/email',
				getGetUpdatesEmailController
			);

			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/get-updates/email',
				emailValidationRules(),
				validationErrorHandler,
				postGetUpdatesEmailController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/get-updates/how-often',
				getGetUpdatesHowOftenController
			);

			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/get-updates/how-often',
				howOftenValidationRules(),
				validationErrorHandler,
				postGetUpdatesHowOftenController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/get-updates/confirm-your-email',
				projectsMiddleware,
				getGetUpdatesConfirmYourEmailController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/get-updates/subscribed',
				projectsMiddleware,
				getGetUpdatesSubscribedController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/get-updates/unsubscribe-confirm',
				projectsMiddleware,
				getGetUpdatesUnsubscribeController
			);

			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/get-updates/unsubscribe-confirm',
				postGetUpdatesUnsubscribeController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/get-updates/unsubscribed',
				projectsMiddleware,
				getGetUpdatesUnsubscribedController
			);
		});
	});
});
