const {
	addCommonTranslationsMiddleware
} = require('../../_middleware/i18n/add-common-translations-middleware');
const {
	addGetUpdatesIndexTranslationsMiddleware
} = require('./index/_middleware/add-get-updates-index-translations-middleware');
const {
	addGetUpdatesEmailTranslationsMiddleware
} = require('./email/_middleware/add-get-updates-email-translations-middleware');
const {
	addGetUpdatesHowOftenTranslationsMiddleware
} = require('./how-often/_middleware/add-get-updates-how-often-translations-middleware');
const {
	addGetUpdatesConfirmYourEmailTranslationsMiddleware
} = require('./confirm-your-email/_middleware/add-get-updates-confirm-your-email-translations-middleware');
const {
	addGetUpdatesSubscribedTranslationsMiddleware
} = require('./subscribed/_middleware/add-get-updates-subscribed-translations-middleware');
const {
	getUpdatesUnsubscribeTranslationsMiddleware
} = require('./unsubscribe/_middleware/unsubscribe-translations-middleware');
const {
	getUpdatesUnsubscribedTranslationsMiddleware
} = require('./unsubscribed/_middleware/unsubscribed-translations-middleware');
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
			expect(use).toHaveBeenCalledWith(addCommonTranslationsMiddleware);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/get-updates/start',
				addGetUpdatesIndexTranslationsMiddleware,
				projectsMiddleware,
				getGetUpdatesIndexController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/get-updates/email',
				addGetUpdatesEmailTranslationsMiddleware,
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
				addGetUpdatesHowOftenTranslationsMiddleware,
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
				addGetUpdatesConfirmYourEmailTranslationsMiddleware,
				projectsMiddleware,
				getUpdatesMiddleware,
				getUpdatesConfirmYourEmailController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/get-updates/subscribed',
				addGetUpdatesSubscribedTranslationsMiddleware,
				projectsMiddleware,
				getUpdatesSubscribedController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/get-updates/unsubscribe-confirm',
				projectsMiddleware,
				getUpdatesUnsubscribeTranslationsMiddleware,
				getGetUpdatesUnsubscribeController
			);

			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/get-updates/unsubscribe-confirm',
				postGetUpdatesUnsubscribeController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/get-updates/unsubscribed',
				projectsMiddleware,
				getUpdatesUnsubscribedTranslationsMiddleware,
				getUpdatesUnsubscribedController
			);
		});
	});
});
