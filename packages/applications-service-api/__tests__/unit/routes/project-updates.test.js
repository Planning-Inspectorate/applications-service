const { get } = require('./router-mock');
const { validateRequestWithOpenAPI } = require('../../../src/middleware/validator/openapi');
const { getProjectUpdates } = require('../../../src/controllers/project-updates');

jest.mock('../../../src/middleware/parseFormDataProperties');
jest.mock('@pins/common/src/utils/async-route');

const asyncRouteMock = require('@pins/common/src/utils/async-route').asyncRoute;
const asyncRouteMockValue = jest.fn();

describe('routes/project-updates', () => {
	asyncRouteMock.mockImplementation((fn) => asyncRouteMockValue(fn));

	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('../../../src/routes/project-updates');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(get).toHaveBeenCalledWith(
			'/:caseReference',
			validateRequestWithOpenAPI,
			asyncRouteMock(getProjectUpdates)
		);
		expect(asyncRouteMockValue).toHaveBeenCalledWith(getProjectUpdates);
	});
});
