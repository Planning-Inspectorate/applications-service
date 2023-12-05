const {
	getRegisterAddressController,
	postRegisterAddressController
} = require('../_common/address/controller');

const { registerMiddleware } = require('../../../../routes/register/middleware');
const { rules: addressValidationRules } = require('../../../../validators/register/myself/address');
const { validationErrorHandler } = require('../../../../validators/validation-error-handler');

jest.mock('../../../../validators/register/myself/address', () => {
	return {
		rules: jest.fn()
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

			expect(get).toBeCalledTimes(1);
			expect(post).toBeCalledTimes(1);
			expect(use).toBeCalledTimes(0);
		});
	});
});
