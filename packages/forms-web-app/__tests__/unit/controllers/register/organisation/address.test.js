const addressController = require('../../../../../src/controllers/register/organisation/address');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/organisation/address', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				orgRegdata: {
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
			expect(res.render).toHaveBeenCalledWith('register/organisation/address', {
				address: { country: 'UK', line1: 'abc', line2: 'xyz', line3: 'xyz', postcode: 'ABC 123' }
			});
		});
	});

	describe('postAddress', () => {
		it(`'should post data and redirect to '/${VIEW.REGISTER.ORGANISATION.TELEPHONE}' if address is provided`, async () => {
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

			expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.ORGANISATION.TELEPHONE}`);
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

			expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.ORGANISATION.ADDRESS, {
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
