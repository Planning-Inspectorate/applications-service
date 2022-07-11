const { getProjectTimeLine } = require('../../../../src/controllers/projects/project/timeline');
const { mockReq, mockRes } = require('../../mocks');
const { VIEW } = require('../../../../src/lib/views');

describe('controllers/projects/project/timeline', () => {
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

	describe('getProjectTimeLine', () => {
		it('should call the correct template', async () => {
			await getProjectTimeLine(req, res);
			expect(res.render).toHaveBeenCalledWith(VIEW.PROJECTS.PROJECT.TIMELINE, {
				projectName: 'ABC',
				caseRef: 'ABCD1234'
			});
		});
	});
});
