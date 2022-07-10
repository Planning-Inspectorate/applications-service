const {
	getProjectExaminationDocuments
} = require('../../../../src/controllers/projects/project/examination-documents');
const { mockReq, mockRes } = require('../../mocks');
const { VIEW } = require('../../../../src/lib/views');

describe('controllers/projects/project/examination-documents', () => {
	let req;
	let res;

	beforeEach(() => {
		jest.resetAllMocks();
		req = {
			...mockReq(),
			session: {
				caseRef: 'ABCD1234',
				projectName: 'ABC'
			}
		};
		res = mockRes();
	});

	describe('getProjectExaminationDocuments', () => {
		it('should call the correct template', async () => {
			await getProjectExaminationDocuments(req, res);
			expect(res.render).toHaveBeenCalledWith(VIEW.PROJECTS.PROJECT.EXAMINATION_DOCUMENTS, {
				projectName: 'ABC',
				caseRef: 'ABCD1234'
			});
		});
	});
});
