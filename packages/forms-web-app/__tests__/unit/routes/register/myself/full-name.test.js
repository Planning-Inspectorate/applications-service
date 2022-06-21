const { get, post } = require('../../router-mock');
const fullNameController = require('../../../../../src/controllers/register/myself/full-name');
const {
	validationErrorHandler
} = require('../../../../../src/validators/validation-error-handler');

jest.mock('../../../../../src/validators/register/myself/full-name');

describe('routes/register/myself/full-name', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('../../../../../src/routes/register/myself/full-name');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(get).toHaveBeenCalledWith('/full-name', fullNameController.getFullName);
		expect(post).toHaveBeenCalledWith(
			'/full-name',
			undefined,
			validationErrorHandler,
			fullNameController.postFullName
		);
		expect(get.mock.calls.length).toBe(1);
		expect(post.mock.calls.length).toBe(1);
	});
});
