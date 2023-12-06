const {
	getRegisterAddressController,
	postRegisterAddressController
} = require('../_common/address/controller');

const {
	getRegisterAreYou18Controller,
	postRegisterAreYou18Controller
} = require('../_common/are-you-18/controller');

const { registerMiddleware } = require('../../../../routes/register/middleware');
const { validationErrorHandler } = require('../../../../validators/validation-error-handler');
const { rules: addressValidationRules } = require('../../../../validators/register/myself/address');
const {
	rules: areYou18ValidationRules
} = require('../../../../validators/register/myself/are-you-18-over');

jest.mock('../../../../validators/register/myself/address', () => {
	return {
		rules: jest.fn()
	};
});
jest.mock('../../../../validators/register/myself/are-you-18-over', () => {
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

			expect(get).toBeCalledTimes(2);
			expect(post).toBeCalledTimes(2);
			expect(use).toBeCalledTimes(0);
		});
	});
});
