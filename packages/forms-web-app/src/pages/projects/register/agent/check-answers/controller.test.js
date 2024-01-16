const { getRegisterAgentCheckAnswersController } = require('./controller');

const { mockReq, mockRes } = require('../../../../../../__tests__/unit/mocks');

jest.mock('../../../../../lib/logger');

describe('pages/projects/register/agent/check-answers/controller', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				behalfRegdata: {
					name: 'abc'
				},
				comment: 'comment'
			}
		};
		res = mockRes();
		jest.resetAllMocks();
	});

	describe('#getRegisterAgentCheckAnswersController', () => {
		it('should call the correct template', () => {
			getRegisterAgentCheckAnswersController(req, res);
			expect(res.render).toHaveBeenCalledWith('projects/register/agent/check-answers/view.njk', {
				data: {
					comment: 'comment',
					name: 'abc'
				},
				registerAgentDeclarationURL: '/projects/:case_ref/register/agent/declaration'
			});
		});
	});
});
