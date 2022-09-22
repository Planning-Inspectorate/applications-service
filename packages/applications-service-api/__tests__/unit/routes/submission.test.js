const { post } = require('./router-mock');
const submissionController = require('../../../src/controllers/submission');

describe('routes/submission', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('../../../src/routes/submission');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(post).toHaveBeenCalledWith(
			'/:caseRef',
			expect.anything(),
			submissionController.createSubmission
		);
	});
});
