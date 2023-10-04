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
		expect(get.mock.calls.length).toBe(3);

		expect(get.mock.calls[0][0]).toBe(
			'/download',
			applicationsController.getAllApplicationsDownload
		);

		expect(get.mock.calls[1][0]).toBe(
			'/:caseReference',
			validateRequestWithOpenAPI,
			applicationsController.getApplication
		);

		expect(get.mock.calls[2][0]).toBe('', applicationsController.getAllApplications);
	});
});
