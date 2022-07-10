const { getProjectTimetable } = require('../../../../src/controllers/projects/project/timetable');
const { mockReq, mockRes } = require('../../mocks');
const { VIEW } = require('../../../../src/lib/views');

describe('controllers/projects/timetable', () => {
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

	describe('getProjectTimetable', () => {
		it('should call the correct template', async () => {
			await getProjectTimetable(req, res);
			expect(res.render).toHaveBeenCalledWith(VIEW.PROJECTS.PROJECT.TIMETABLE, {
				projectName: 'ABC',
				caseRef: 'ABCD1234'
			});
		});
	});
});
