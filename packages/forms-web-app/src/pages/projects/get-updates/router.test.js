const { projectsMiddleware } = require('../_middleware/middleware');
const { getUpdatesMiddleware } = require('./_middleware/get-updates-middleware');
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
const { getUpdatesConfirmYourEmailController } = require('./confirm-your-email/controller');
const { getUpdatesSubscribedController } = require('./subscribed/controller');
const {
	getGetUpdatesUnsubscribeController,
	postGetUpdatesUnsubscribeController
} = require('./unsubscribe/controller');
const { getUpdatesUnsubscribedController } = require('./unsubscribed/controller');

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
				projectsMiddleware,
				getGetUpdatesIndexController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/get-updates/email',
				getUpdatesMiddleware,
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
				getUpdatesMiddleware,
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
				getUpdatesMiddleware,
				getUpdatesConfirmYourEmailController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/get-updates/subscribed',
				projectsMiddleware,
				getUpdatesSubscribedController
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
				getUpdatesUnsubscribedController
			);
		});
	});
});
