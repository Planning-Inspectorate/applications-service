const addressController = require('../../../../../src/controllers/register/myself/address');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/myself/address', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				mySelfRegdata: {
					address: {
						line1: 'abc',
						line2: 'xyz',
						line3: 'xyz',
						postcode: 'ABC 123',
						country: 'UK'
					}
				}
			}
		};
		res = mockRes();
		jest.resetAllMocks();
	});

	describe('getAddress', () => {
		it('should call the correct template', () => {
			addressController.getAddress(req, res);
			expect(res.render).toHaveBeenCalledWith('register/myself/address', {
				address: { country: 'UK', line1: 'abc', line2: 'xyz', line3: 'xyz', postcode: 'ABC 123' }
			});
		});
	});

	describe('postAddress', () => {
		it(`'should post data and redirect to '/${VIEW.REGISTER.MYSELF.EMAIL_ADDRESS}' if address is provided`, async () => {
			const mockRequest = {
				...req,
				body: {
					address: {
						line1: 'abc',
						line2: 'xyz',
						line3: 'xyz',
						postcode: 'ABC 123',
						country: 'UK'
					}
				},
				query: {
					mode: ''
				}
			};
			await addressController.postAddress(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.MYSELF.TELEPHONE}`);
		});
		it('should re-render the template with errors if there is any validation error', async () => {
			const mockRequest = {
				...req,
				body: {
					errorSummary: [{ text: 'There were errors here', href: '#' }],
					errors: { a: 'b' }
				}
			};
			await addressController.postAddress(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.MYSELF.ADDRESS, {
				address: {
					errorSummary: [
						{
							href: '#',
							text: 'There were errors here'
						}
					],
					errors: {
						a: 'b'
					}
				},
				errorSummary: [
					{
						href: '#',
						text: 'There were errors here'
					}
				],
				errors: {
					a: 'b'
				}
			});
		});
	});
});
