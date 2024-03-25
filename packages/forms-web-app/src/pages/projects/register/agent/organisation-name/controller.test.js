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
			body: {
				'organisation-name': 'mock body organisation name'
			},
			params: {
				case_ref: 'mock-case-ref'
			},
			session: {
				behalfRegdata: {
					representor: {
						'organisation-name': 'mock session organisation name'
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
					organisationName: 'mock session organisation name',
					registerAgentEmailURL: '/projects/mock-case-ref/register/agent/email-address',
					registerAgentOrgNameInputID: 'organisation-name'
				}
			);
		});
	});

	describe('#postRegisterAgentOrgNameController', () => {
		it('should post data and redirect to /agent/email-address if name is provided', async () => {
			const mockRequest = {
				...req,
				query: {
					mode: ''
				},
				session: {
					behalfRegdata: {
						representor: {}
					}
				}
			};
			await postRegisterAgentOrgNameController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				`/projects/mock-case-ref/register/agent/email-address`
			);

			expect(mockRequest.session).toEqual({
				behalfRegdata: { representor: { 'organisation-name': 'mock body organisation name' } }
			});
		});

		it('should post data and redirect to /agent/check-answers if in edit mode', async () => {
			const mockRequest = {
				...req,
				query: {
					mode: 'edit'
				},
				session: {
					behalfRegdata: {
						representor: {}
					}
				}
			};
			await postRegisterAgentOrgNameController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				`/projects/mock-case-ref/register/agent/check-answers`
			);

			expect(mockRequest.session).toEqual({
				behalfRegdata: { representor: { 'organisation-name': 'mock body organisation name' } }
			});
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
					errorSummary: [{ href: '#', text: 'There were errors here' }],
					errors: { a: 'b' },
					organisationName: undefined,
					registerAgentEmailURL: '/projects/mock-case-ref/register/agent/email-address',
					registerAgentOrgNameInputID: 'organisation-name'
				}
			);
		});
	});
});
