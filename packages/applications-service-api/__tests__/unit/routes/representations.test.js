const { get } = require('./router-mock');
const representationsController = require('../../../src/controllers/representations');
const {
	parseIntegerPathParams,
	parseIntegerQueryParams,
	normaliseArrayQueryParams
} = require('../../../src/middleware/parseParamProperties');
const { asyncRoute } = require('@pins/common/src/utils/async-route');
const { validateRequestWithOpenAPI } = require('../../../src/middleware/validator/openapi');

jest.mock('@pins/common/src/utils/async-route');
jest.mock('../../../src/middleware/validator/openapi');
jest.mock('../../../src/middleware/parseParamProperties');

describe('routes/representations', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('../../../src/routes/representations');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(get).toHaveBeenCalledWith(
			'/:id',
			parseIntegerPathParams(['id']),
			validateRequestWithOpenAPI,
			asyncRoute(representationsController.getRepresentationById)
		);

		expect(get).toHaveBeenCalledWith(
			'/',
			parseIntegerQueryParams(['page', 'size']),
			normaliseArrayQueryParams(['type']),
			validateRequestWithOpenAPI,
			asyncRoute(representationsController.getRepresentationsForApplication)
		);
	});
});
