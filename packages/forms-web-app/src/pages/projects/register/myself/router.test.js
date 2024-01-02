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
	getRegisterDeclarationController,
	postRegisterDeclarationController
} = require('../_common/declaration/controller');

const { registerMiddleware } = require('../../../../routes/register/middleware');
const { decodeUri } = require('../../../../middleware/decode-uri');

const { rules: fullNameValidationRules } = require('../../../../validators/shared/full-name');
const {
	rules: areYou18ValidationRules
} = require('../../../../validators/register/myself/are-you-18-over');
const { emailValidationRules } = require('../../../../validators/shared/email-address');
const { rules: addressValidationRules } = require('../../../../validators/register/myself/address');
const {
	rules: telephoneValidationRules
} = require('../../../../validators/register/myself/telephone');

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
jest.mock('../../../../validators/register/myself/are-you-18-over', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/shared/email-address', () => {
	return {
		emailValidationRules: jest.fn()
	};
});
jest.mock('../../../../validators/register/myself/address', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/register/myself/telephone', () => {
	return {
		rules: jest.fn()
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
				registerMiddleware,
				getRegisterNameController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/full-name',
				registerMiddleware,
				decodeUri(),
				fullNameValidationRules(),
				validationErrorHandler,
				postRegisterNameController
			);
			expect(decodeUri).toHaveBeenCalledWith('body', ['full-name']);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/are-you-18-over',
				registerMiddleware,
				getRegisterAreYou18Controller
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/are-you-18-over',
				registerMiddleware,
				areYou18ValidationRules(),
				validationErrorHandler,
				postRegisterAreYou18Controller
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/email-address',
				registerMiddleware,
				getRegisterEmailController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/email-address',
				registerMiddleware,
				emailValidationRules(),
				validationErrorHandler,
				postRegisterEmailController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/address',
				registerMiddleware,
				getRegisterAddressController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/address',
				registerMiddleware,
				addressValidationRules(),
				validationErrorHandler,
				postRegisterAddressController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/telephone-number',
				registerMiddleware,
				getRegisterNumberController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/telephone-number',
				registerMiddleware,
				telephoneValidationRules(),
				validationErrorHandler,
				postRegisterNumberController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/declaration',
				registerMiddleware,
				getRegisterDeclarationController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/myself/declaration',
				registerMiddleware,
				postRegisterDeclarationController
			);

			expect(get).toBeCalledTimes(6);
			expect(post).toBeCalledTimes(6);
			expect(use).toBeCalledTimes(0);
		});
	});
});
