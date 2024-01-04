const { getRegisterMyselfCheckAnswersController } = require('./controller');

const { mockReq, mockRes } = require('../../../../../../__tests__/unit/mocks');

jest.mock('../../../../../lib/logger');

describe('pages/projects/register/myself/check-answers/controller', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				mySelfRegdata: {
					name: 'abc'
				},
				comment: 'comment'
			}
		};
		res = mockRes();
		jest.resetAllMocks();
	});

	describe('getCheckYourAnswers', () => {
		it('should call the correct template', () => {
			getRegisterMyselfCheckAnswersController(req, res);
			expect(res.render).toHaveBeenCalledWith('projects/register/myself/check-answers/view.njk', {
				data: {
					comment: 'comment',
					name: 'abc'
				},
				registerMyselfDeclarationURL: '/projects/:case_ref/register/myself/declaration'
			});
		});
	});
});
