const { get, post } = require('../router-mock');

const {
	getProjectApplicationDocuments
} = require('../../../../src/controllers/projects/project/application-documents');
const { getProject } = require('../../../../src/controllers/projects/project/index');

describe('routes/projects/documents', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('../../../../src/routes/projects');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});
	it('should define the expected routes', () => {
		expect(get).toHaveBeenCalledWith('/:case_ref/documents/:page', getProjectApplicationDocuments);
		expect(get).toHaveBeenCalledWith('/:case_ref', getProject);
		expect(post.mock.calls.length).toBe(2);
		expect(get.mock.calls.length).toBe(2);
	});
});
