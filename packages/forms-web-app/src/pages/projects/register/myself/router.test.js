const {
	getRegisterAreYou18Controller,
	postRegisterAreYou18Controller
} = require('../_common/are-you-18/controller');
const {
	getRegisterNameController,
	postRegisterNameController
} = require('../_common/name/controller');
const {
	getRegisterEmailController,
	postRegisterEmailController
} = require('../_common/email/controller');
const {
	getRegisterAddressController,
	postRegisterAddressController
} = require('../_common/address/controller');
const {
	getRegisterNumberController,
	postRegisterNumberController
} = require('../_common/number/controller');
const {
	getRegisterMyselfAboutProjectController,
	postRegisterMyselfAboutProjectController
} = require('./about-project/controller');
const { getRegisterMyselfCheckAnswersController } = require('./check-answers/controller');
const {
	getRegisterDeclarationController,
	postRegisterDeclarationController
} = require('../_common/declaration/controller');
const { getRegisterCompleteController } = require('../_common/complete/controller');

const { registerMiddleware } = require('../_middleware/register-middleware');
const {
	addCommonTranslationsMiddleware
} = require('../../../_middleware/i18n/add-common-translations-middleware');
const {
	addRegisterTranslationsMiddleware
} = require('../_middleware/add-register-translations-middleware');
const { decodeUri } = require('../../../../middleware/decode-uri');

const { rules: fullNameValidationRules } = require('../../../../validators/shared/full-name');
const { rules: areYou18ValidationRules } = require('../../../../validators/shared/are-you-18-over');
const { emailValidationRules } = require('../../../../validators/shared/email-address');
const { rules: addressValidationRules } = require('../../../../validators/shared/address');
const {
	rules: telephoneValidationRules
} = require('../../../../validators/shared/telephone-number');
const {
	validate: aboutProjectValidationRules
} = require('../../../../validators/register/tell-us-about-project');

const { validationErrorHandler } = require('../../../../validators/validation-error-handler');

jest.mock('../../../../middleware/decode-uri', () => {
	return {
		decodeUri: jest.fn()
	};
});

jest.mock('../../../../validators/shared/full-name', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/shared/are-you-18-over', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/shared/email-address', () => {
	return {
		emailValidationRules: jest.fn()
	};
});
jest.mock('../../../../validators/shared/address', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/shared/telephone-number', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/register/tell-us-about-project', () => {
	return {
		validate: jest.fn()
	};
});

describe('pages/projects/register/myself/router', () => {
	describe('#registerMyselfRouter', () => {
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

		it('should call the register myself routes and controllers', () => {
			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/full-name',
				addCommonTranslationsMiddleware,
				addRegisterTranslationsMiddleware,
				registerMiddleware,
				getRegisterNameController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/full-name',
				addCommonTranslationsMiddleware,
				addRegisterTranslationsMiddleware,
				registerMiddleware,
				decodeUri(),
				fullNameValidationRules(),
				validationErrorHandler,
				postRegisterNameController
			);
			expect(decodeUri).toHaveBeenCalledWith('body', ['full-name']);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/are-you-18-over',
				addCommonTranslationsMiddleware,
				addRegisterTranslationsMiddleware,
				registerMiddleware,
				getRegisterAreYou18Controller
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/are-you-18-over',
				addCommonTranslationsMiddleware,
				addRegisterTranslationsMiddleware,
				registerMiddleware,
				areYou18ValidationRules(),
				validationErrorHandler,
				postRegisterAreYou18Controller
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/email-address',
				addCommonTranslationsMiddleware,
				addRegisterTranslationsMiddleware,
				registerMiddleware,
				getRegisterEmailController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/email-address',
				addCommonTranslationsMiddleware,
				addRegisterTranslationsMiddleware,
				registerMiddleware,
				addCommonTranslationsMiddleware,
				emailValidationRules(),
				validationErrorHandler,
				postRegisterEmailController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/address',
				addCommonTranslationsMiddleware,
				addRegisterTranslationsMiddleware,
				registerMiddleware,
				getRegisterAddressController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/address',
				addCommonTranslationsMiddleware,
				addRegisterTranslationsMiddleware,
				registerMiddleware,
				addressValidationRules(),
				validationErrorHandler,
				postRegisterAddressController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/telephone-number',
				addCommonTranslationsMiddleware,
				addRegisterTranslationsMiddleware,
				registerMiddleware,
				getRegisterNumberController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/telephone-number',
				addCommonTranslationsMiddleware,
				addRegisterTranslationsMiddleware,
				registerMiddleware,
				telephoneValidationRules(),
				validationErrorHandler,
				postRegisterNumberController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/tell-us-about-project',
				addCommonTranslationsMiddleware,
				addRegisterTranslationsMiddleware,
				registerMiddleware,
				getRegisterMyselfAboutProjectController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/tell-us-about-project',
				addCommonTranslationsMiddleware,
				addRegisterTranslationsMiddleware,
				registerMiddleware,
				decodeUri(),
				aboutProjectValidationRules(),
				validationErrorHandler,
				postRegisterMyselfAboutProjectController
			);
			expect(decodeUri).toHaveBeenCalledWith('body', ['comment']);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/check-answers',
				addCommonTranslationsMiddleware,
				addRegisterTranslationsMiddleware,
				registerMiddleware,
				getRegisterMyselfCheckAnswersController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/declaration',
				addCommonTranslationsMiddleware,
				addRegisterTranslationsMiddleware,
				registerMiddleware,
				getRegisterDeclarationController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/declaration',
				registerMiddleware,
				postRegisterDeclarationController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/registration-complete',
				addCommonTranslationsMiddleware,
				addRegisterTranslationsMiddleware,
				registerMiddleware,
				getRegisterCompleteController
			);

			expect(get).toBeCalledTimes(9);
			expect(post).toBeCalledTimes(7);
			expect(use).toBeCalledTimes(0);
		});
	});
});
