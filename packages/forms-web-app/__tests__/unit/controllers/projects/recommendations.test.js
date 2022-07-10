const {
	getProjectRecommendations
} = require('../../../../src/controllers/projects/project/recommendations');
const { mockReq, mockRes } = require('../../mocks');
const { VIEW } = require('../../../../src/lib/views');

describe('controllers/projects/recommendations', () => {
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

	describe('getProjectRecommendations', () => {
		it('should call the correct template', async () => {
			await getProjectRecommendations(req, res);
			expect(res.render).toHaveBeenCalledWith(VIEW.PROJECTS.PROJECT.RECOMMENDATIONS, {
				projectName: 'ABC',
				caseRef: 'ABCD1234'
			});
		});
	});
});
