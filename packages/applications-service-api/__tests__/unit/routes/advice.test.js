const { get } = require('./router-mock');
const adviceController = require('../../../src/controllers/advice');

describe('routes/advice', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('../../../src/routes/advice');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(get).toHaveBeenCalledWith('/', adviceController.getAdvice);
		expect(get).toHaveBeenCalledWith('/:adviceID', adviceController.getAdviceById);
	});
});
