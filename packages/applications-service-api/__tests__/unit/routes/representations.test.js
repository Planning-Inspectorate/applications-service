const { get } = require('./router-mock');
const representationsController = require('../../../src/controllers/representations');

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
			'/',
			representationsController.getRepresentationsForApplication
		);
	});
});
