const telephoneController = require('../../../../../src/controllers/register/organisation/telephone-number');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/organisation/telephone-number', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				orgRegdata: {
					telephone: '06876767'
				}
			}
		};
		res = mockRes();
		jest.resetAllMocks();
	});

	describe('getTelephone', () => {
		it('should call the correct template', () => {
			telephoneController.getTelephone(req, res);
			expect(res.render).toHaveBeenCalledWith('register/organisation/telephone-number', {
				telephone: '06876767'
			});
		});
	});

	describe('postTelephone', () => {
		it(`'should post data and redirect to '/${VIEW.REGISTER.ORGANISATION.TELL_US_ABOUT_PROJECT}' if telephone is provided`, async () => {
			const mockRequest = {
				...req,
				body: {
					telephone: '676876876'
				},
				query: {
					mode: ''
				}
			};
			await telephoneController.postTelephone(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				`/${VIEW.REGISTER.ORGANISATION.TELL_US_ABOUT_PROJECT}`
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
			await telephoneController.postTelephone(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.ORGANISATION.TELEPHONE, {
				errorSummary: [{ text: 'There were errors here', href: '#' }],
				errors: { a: 'b' }
			});
		});
	});
});
