const { get } = require('./router-mock');
const applicationsController = require('../../../src/controllers/applications');

describe('routes/applications', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('../../../src/routes/applications');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(get).toHaveBeenCalledWith('/:id', applicationsController.getApplication);
		expect(get).toHaveBeenCalledWith('/', applicationsController.getAllApplications);
	});
});
