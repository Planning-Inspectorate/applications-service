const { getProjectsTimeLine } = require('../../../../src/controllers/projects/timeline');
const { mockReq, mockRes } = require('../../mocks');
const { VIEW } = require('../../../../src/lib/views');

describe('controllers/projects/project-timeline', () => {
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

	describe('getProjectsTimeLine', () => {
		it('should call the correct template', async () => {
			await getProjectsTimeLine(req, res);
			expect(res.render).toHaveBeenCalledWith(VIEW.PROJECTS.TIMELINE, {
				projectName: 'ABC',
				caseRef: 'ABCD1234'
			});
		});
	});
});
