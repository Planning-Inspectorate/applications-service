const controller = require('../../../../src/controllers/projects/recommendations');
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

	describe('getRecommendations', () => {
		it('should call the correct template', async () => {
			await controller.getRecommendations(req, res);
			expect(res.render).toHaveBeenCalledWith(VIEW.PROJECTS.RECOMMENDATIONS, {
				projectName: 'ABC',
				caseRef: 'ABCD1234'
			});
		});
	});
});
