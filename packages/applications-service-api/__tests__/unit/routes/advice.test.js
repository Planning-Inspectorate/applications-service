const { get } = require('./router-mock');
const adviceController = require('../../../src/controllers/advice');
const { asyncRoute } = require('@pins/common/src/utils/async-route');
const { validateRequestWithOpenAPI } = require('../../../src/middleware/validator/openapi');
const { parseIntegerQueryParams } = require('../../../src/middleware/parseQueryParamProperties');

jest.mock('@pins/common/src/utils/async-route');
jest.mock('../../../src/middleware/validator/openapi');
jest.mock('../../../src/middleware/parseQueryParamProperties');

describe('routes/advice', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('../../../src/routes/advice');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(get).toHaveBeenCalledWith(
			'/:adviceID',
			validateRequestWithOpenAPI,
			asyncRoute(adviceController.getAdviceById)
		);
		expect(get).toHaveBeenCalledWith(
			'',
			parseIntegerQueryParams(['page', 'size']),
			validateRequestWithOpenAPI,
			asyncRoute(adviceController.getAdvice)
		);
	});
});
