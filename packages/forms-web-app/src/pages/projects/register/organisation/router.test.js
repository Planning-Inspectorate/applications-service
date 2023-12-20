const {
	getRegisterAddressController,
	postRegisterAddressController
} = require('../_common/address/controller');
const {
	getRegisterAreYou18Controller,
	postRegisterAreYou18Controller
} = require('../_common/are-you-18/controller');
const {
	getRegisterNameController,
	postRegisterNameController
} = require('../_common/name/controller');

const { registerMiddleware } = require('../../../../routes/register/middleware');
const { validationErrorHandler } = require('../../../../validators/validation-error-handler');

const { rules: addressValidationRules } = require('../../../../validators/register/myself/address');
const {
	rules: areYou18ValidationRules
} = require('../../../../validators/register/organisation/are-you-18-over');
const { rules: fullNameValidationRules } = require('../../../../validators/shared/full-name');
const { decodeUri } = require('../../../../middleware/decode-uri');

jest.mock('../../../../validators/register/myself/address', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/register/organisation/are-you-18-over', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/shared/full-name', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../middleware/decode-uri', () => {
	return {
		decodeUri: jest.fn()
	};
});

describe('pages/projects/register/organisation/router', () => {
	describe('#registerOrganisationRouter', () => {
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

		it('should call the register organisation routes and controllers', () => {
			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/full-name',
				registerMiddleware,
				getRegisterNameController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/full-name',
				registerMiddleware,
				decodeUri(),
				fullNameValidationRules(),
				validationErrorHandler,
				postRegisterNameController
			);
			expect(decodeUri).toHaveBeenCalledWith('body', ['full-name']);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/address',
				registerMiddleware,
				getRegisterAddressController
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/address',
				registerMiddleware,
				addressValidationRules(),
				validationErrorHandler,
				postRegisterAddressController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/are-you-18-over',
				registerMiddleware,
				getRegisterAreYou18Controller
			);
			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/register/organisation/are-you-18-over',
				registerMiddleware,
				areYou18ValidationRules(),
				validationErrorHandler,
				postRegisterAreYou18Controller
			);

			expect(get).toBeCalledTimes(3);
			expect(post).toBeCalledTimes(3);
			expect(use).toBeCalledTimes(0);
		});
	});
});
