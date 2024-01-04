const { getRegisterOrganisationCheckAnswersController } = require('./controller');

const { mockReq, mockRes } = require('../../../../../../__tests__/unit/mocks');

jest.mock('../../../../../lib/logger');

describe('pages/projects/register/organisation/check-answers/controller', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				orgRegdata: {
					name: 'abc'
				},
				comment: 'comment'
			}
		};
		res = mockRes();
		jest.resetAllMocks();
	});

	describe('#getRegisterOrganisationCheckAnswersController', () => {
		it('should call the correct template', () => {
			getRegisterOrganisationCheckAnswersController(req, res);
			expect(res.render).toHaveBeenCalledWith(
				'projects/register/organisation/check-answers/view.njk',
				{
					data: {
						comment: 'comment',
						name: 'abc'
					},
					registerOrganisationDeclarationURL:
						'/projects/:case_ref/register/organisation/declaration'
				}
			);
		});
	});
});
