const { get, post } = require('../router-mock');
const typeOfPartyController = require('../../../../src/controllers/register/type-of-party');
const { validationErrorHandler } = require('../../../../src/validators/validation-error-handler');
const {
	rules: typeOfPartyValidationRules
} = require('../../../../src/validators/register/type-of-party');

jest.mock('../../../../src/validators/register/type-of-party');

describe('routes/register/who-registering-for', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('../../../../src/routes/register/type-of-party');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(get).toHaveBeenCalledWith('/who-registering-for', typeOfPartyController.getTypeOfParty);
		expect(post).toHaveBeenCalledWith(
			'/who-registering-for',
			typeOfPartyValidationRules(),
			validationErrorHandler,
			typeOfPartyController.postTypeOfParty
		);
		expect(get.mock.calls.length).toBe(1);
		expect(post.mock.calls.length).toBe(1);
	});
});
