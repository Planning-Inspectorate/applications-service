const {
	getRegisterAgentTheirTelephoneController,
	postRegisterAgentTheirTelephoneController
} = require('./controller');

const { mockReq, mockRes } = require('../../../../../../__tests__/unit/mocks');

describe('pages/projects/register/agent/their-telephone/controller', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			params: {
				case_ref: 'mock-case-ref'
			},
			session: {
				behalfRegdata: {
					representee: {
						telephone: '06876767'
					}
				}
			}
		};
		res = mockRes();
		jest.resetAllMocks();
	});

	describe('#getRegisterAgentTheirTelephoneController', () => {
		it('should call the correct template', () => {
			getRegisterAgentTheirTelephoneController(req, res);
			expect(res.render).toHaveBeenCalledWith('projects/register/agent/their-telephone/view.njk', {
				telephone: '06876767'
			});
		});
	});

	describe('#postRegisterAgentTheirTelephoneController', () => {
		it('should post data and redirect to about project page if a telephone number is provided', async () => {
			const mockRequest = {
				...req,
				body: {
					telephone: '676876876'
				},
				query: {
					mode: ''
				}
			};
			await postRegisterAgentTheirTelephoneController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/projects/mock-case-ref/register/agent/tell-us-about-project'
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
			await postRegisterAgentTheirTelephoneController(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith('projects/register/agent/their-telephone/view.njk', {
				errorSummary: [{ text: 'There were errors here', href: '#' }],
				errors: { a: 'b' }
			});
		});
	});
});
