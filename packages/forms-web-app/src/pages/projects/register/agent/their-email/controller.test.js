const {
	getRegisterAgentTheirEmailController,
	postRegisterAgentTheirEmailController
} = require('./controller');

const { mockReq, mockRes } = require('../../../../../../__tests__/unit/mocks');

describe('pages/projects/register/agent/their-email/controller', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				behalfRegdata: {
					representee: {
						email: 'anc@test.com'
					},
					representor: {
						email: 'anc@test.com'
					}
				}
			}
		};
		res = mockRes();
		jest.resetAllMocks();
	});

	describe('#getRegisterAgentTheirEmailController', () => {
		it('should call the correct template', () => {
			getRegisterAgentTheirEmailController(req, res);

			expect(res.render).toHaveBeenCalledWith('projects/register/agent/their-email/view.njk', {
				email: 'anc@test.com'
			});
		});
	});

	describe('#postRegisterAgentTheirEmailController', () => {
		it(`'should post data and redirect to the their number page if email is provided`, async () => {
			const mockRequest = {
				...req,
				body: {
					email: 'anc@test.com'
				},
				query: {
					mode: ''
				}
			};
			await postRegisterAgentTheirEmailController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/mock-base-url/mock-case-ref/register/agent/their-telephone-number'
			);
		});

		it('should re-render the template with errors if there is any validation error', async () => {
			const mockRequest = {
				...req,
				body: {
					errorSummary: [{ text: 'There were errors here', href: '#' }],
					errors: { a: 'b' }
				}
			};

			await postRegisterAgentTheirEmailController(mockRequest, res);

			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith('projects/register/agent/their-email/view.njk', {
				errorSummary: [{ text: 'There were errors here', href: '#' }],
				errors: { a: 'b' }
			});
		});
	});
});
