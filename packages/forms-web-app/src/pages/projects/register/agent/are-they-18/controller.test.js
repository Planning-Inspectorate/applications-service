const { getRegisterAreThey18Controller, postRegisterAreThey18Controller } = require('./controller');
const { VIEW } = require('../../../../../lib/views');
const { mockReq, mockRes } = require('../../../../../../__tests__/unit/mocks');

describe('packages/forms-web-app/src/pages/projects/register/agent/are-they-18/controller', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
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
		it(`'should post data and redirect to '/${VIEW.REGISTER.AGENT.REPRESENTEE_ADDRESS}' if over-18 is provided`, async () => {
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
				`/mock-base-url/mock-case-ref/${VIEW.REGISTER.AGENT.REPRESENTEE_ADDRESS}`
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
