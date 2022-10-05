const { post } = require('./router-mock');
const submissionsController = require('../../../src/controllers/submissions');

describe('routes/submissions', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('../../../src/routes/submissions');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(post).toHaveBeenCalledWith(
			'/:caseReference',
			expect.anything(),
			submissionsController.createSubmission
		);
	});
});
