const { get, post } = require('../router-mock');

const aboutTheApplicationController = require('../../../../src/controllers/projects/docments/controller');
const examinationController = require('../../../../src/controllers/projects/examination');

describe('routes/projects/documents', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('../../../../src/routes/projects/documents');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});
	it('should define the expected routes', () => {
		expect(get).toHaveBeenCalledWith(
			'/:case_ref/documents/:page',
			aboutTheApplicationController.getAboutTheApplication
		);
		expect(post).toHaveBeenCalledWith(
			'/:case_ref/documents/search/:page',
			aboutTheApplicationController.postSearchDocument
		);
		expect(post).toHaveBeenCalledWith(
			'/:case_ref/documents/filter/:page',
			aboutTheApplicationController.postFilterDocument
		);
		expect(get).toHaveBeenCalledWith('/:case_ref', examinationController.getExamination);
		expect(post.mock.calls.length).toBe(2);
		expect(get.mock.calls.length).toBe(2);
	});
});
