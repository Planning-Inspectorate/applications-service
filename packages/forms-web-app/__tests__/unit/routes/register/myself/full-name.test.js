const { get, post } = require('../../router-mock');
const fullNameController = require('../../../../../src/controllers/register/myself/full-name');
const { decodeUri } = require('../../../../../src/middleware/decode-uri');
const {
	validationErrorHandler
} = require('../../../../../src/validators/validation-error-handler');

jest.mock('../../../../../src/validators/shared/full-name');
jest.mock('../../../../../src/middleware/decode-uri', () => ({ decodeUri: jest.fn() }));

describe('routes/register/myself/full-name', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		decodeUri.mockReturnValue('decodeUri return');
		require('../../../../../src/routes/register/myself/full-name');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(get).toHaveBeenCalledWith('/full-name', fullNameController.getFullName);
		expect(post).toHaveBeenCalledWith(
			'/full-name',
			'decodeUri return',
			undefined,
			validationErrorHandler,
			fullNameController.postFullName
		);
		expect(get.mock.calls.length).toBe(1);
		expect(post.mock.calls.length).toBe(1);
	});
});
