const { get } = require('./router-mock');
const adviceController = require('../../../src/controllers/advice');
const { asyncRoute } = require('@pins/common/src/utils/async-route');

jest.mock('@pins/common/src/utils/async-route');

describe('routes/advice', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('../../../src/routes/advice');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(get).toHaveBeenCalledWith('/:adviceID', asyncRoute(adviceController.getAdviceById));
		expect(get).toHaveBeenCalledWith('/', asyncRoute(adviceController.getAdvice));
	});
});
