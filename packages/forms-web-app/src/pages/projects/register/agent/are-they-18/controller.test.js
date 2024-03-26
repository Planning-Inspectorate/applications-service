const { getRegisterAreThey18Controller, postRegisterAreThey18Controller } = require('./controller');

const { mockReq, mockRes } = require('../../../../../../__tests__/unit/mocks');

describe('pages/projects/register/agent/are-they-18/controller', () => {
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
						'over-18': 'yes'
					}
				}
			}
		};
		res = mockRes();
		jest.resetAllMocks();
	});

	describe('#getRegisterAreThey18Controller', () => {
		it('should call the correct template', () => {
			getRegisterAreThey18Controller(req, res);
			expect(res.render).toHaveBeenCalledWith('projects/register/agent/are-they-18/view.njk', {
				over18: 'yes'
			});
		});
	});

	describe('postOver18', () => {
		it('should post data and redirect to register agent their email url if over-18 is provided', async () => {
			const mockRequest = {
				...req,
				body: {
					'over-18': 'yes'
				},
				query: {
					mode: ''
				}
			};

			await postRegisterAreThey18Controller(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/projects/mock-case-ref/register/agent/their-email-address'
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
			await postRegisterAreThey18Controller(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith('projects/register/agent/are-they-18/view.njk', {
				errorSummary: [{ text: 'There were errors here', href: '#' }],
				errors: { a: 'b' }
			});
		});
	});
});
