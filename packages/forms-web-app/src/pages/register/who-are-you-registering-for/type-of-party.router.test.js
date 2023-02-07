const { get, post } = require('../../../../__tests__/unit/routes/router-mock');
const typeOfPartyController = require('./type-of-party.controller');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const { rules: typeOfPartyValidationRules } = require('./type-of-party.validator');

jest.mock('./type-of-party.validator');

describe('routes/register/who-registering-for', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('./type-of-party.router');
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
