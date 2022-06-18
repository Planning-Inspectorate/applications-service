const emailController = require('../../../../../src/controllers/register/myself/email-address');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/myself/email', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				mySelfRegdata: {
					email: 'anc@test.com'
				}
			}
		};
		res = mockRes();
		jest.resetAllMocks();
	});

	describe('getEmail', () => {
		it('should call the correct template', () => {
			emailController.getEmail(req, res);
			expect(res.render).toHaveBeenCalledWith('register/myself/email-address', {
				email: 'anc@test.com'
			});
		});
	});

	describe('postEmail', () => {
		it(`'should post data and redirect to '/${VIEW.REGISTER.MYSELF.ADDRESS}' if email is provided`, async () => {
			const mockRequest = {
				...req,
				body: {
					email: 'anc@test.com'
				},
				query: {
					mode: ''
				}
			};
			await emailController.postEmail(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.MYSELF.ADDRESS}`);
		});
		it('should re-render the template with errors if there is any validation error', async () => {
			const mockRequest = {
				...req,
				body: {
					errorSummary: [{ text: 'There were errors here', href: '#' }],
					errors: { a: 'b' }
				}
			};
			await emailController.postEmail(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.MYSELF.EMAIL_ADDRESS, {
				errorSummary: [{ text: 'There were errors here', href: '#' }],
				errors: { a: 'b' }
			});
		});
	});
});
