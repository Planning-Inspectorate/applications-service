const {
	getRegisterAgentOrgNameController,
	postRegisterAgentOrgNameController
} = require('./controller');
const { mockReq, mockRes } = require('../../../../../../__tests__/unit/mocks');

describe('pages/projects/register/agent/organisation-name/controller', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				behalfRegdata: {
					representor: {
						'organisation-name': 'test'
					}
				}
			}
		};
		res = mockRes();
		jest.resetAllMocks();
	});

	describe('#getRegisterAgentOrgNameController', () => {
		it('should call the correct template', () => {
			getRegisterAgentOrgNameController(req, res);
			expect(res.render).toHaveBeenCalledWith(
				'projects/register/agent/organisation-name/view.njk',
				{
					organisationName: 'test'
				}
			);
		});
	});

	describe('#postRegisterAgentOrgNameController', () => {
		it(`'should post data and redirect to /agent/email-address if name is provided`, async () => {
			const organisationName = 'test';
			const mockRequest = {
				...req,
				body: {
					'organisation-name': organisationName
				},
				query: {
					mode: ''
				}
			};
			await postRegisterAgentOrgNameController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				`/mock-base-url/mock-case-ref/register/agent/email-address`
			);
		});
		it('should re-render the template with errors if there is any validation errors', async () => {
			const mockRequest = {
				...req,
				body: {
					errorSummary: [{ text: 'There were errors here', href: '#' }],
					errors: { a: 'b' }
				}
			};
			await postRegisterAgentOrgNameController(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith(
				'projects/register/agent/organisation-name/view.njk',
				{
					errorSummary: [{ text: 'There were errors here', href: '#' }],
					errors: { a: 'b' }
				}
			);
		});
	});
});
