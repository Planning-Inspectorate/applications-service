const { get } = require('./router-mock');
const applicationsController = require('../../../src/controllers/applications');
const { validateRequestWithOpenAPI } = require('../../../src/middleware/validator/openapi');

describe('routes/applications', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('../../../src/routes/applications');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(get).toHaveBeenCalledWith(
			'/:caseReference',
			validateRequestWithOpenAPI,
			expect.any(Function)
		);
		expect(get.mock.calls[0][2].name).toEqual('getApplicationsRoute');
		expect(get).toHaveBeenCalledWith('/', applicationsController.getAllApplications);
	});
});
