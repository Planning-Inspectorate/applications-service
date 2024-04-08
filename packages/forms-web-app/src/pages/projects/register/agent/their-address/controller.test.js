const {
	getRegisterAgentTheirAddressController,
	postRegisterAgentTheirAddressController
} = require('./controller');
const { mockReq, mockRes } = require('../../../../../../__tests__/unit/mocks');

describe('pages/projects/register/agent/their-address/controller', () => {
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
						address: {
							line1: 'abc',
							line2: 'xyz',
							line3: 'xyz',
							postcode: 'ABC 123',
							country: 'UK'
						}
					}
				}
			}
		};
		res = mockRes();
		jest.resetAllMocks();
	});

	describe('#getRegisterAgentTheirAddressController', () => {
		it('should call the correct template', () => {
			getRegisterAgentTheirAddressController(req, res);
			expect(res.render).toHaveBeenCalledWith('projects/register/agent/their-address/view.njk', {
				address: { country: 'UK', line1: 'abc', line2: 'xyz', line3: 'xyz', postcode: 'ABC 123' }
			});
		});
	});

	describe('#getRegisterAgentTheirAddressController', () => {
		it(`'should post data and redirect to  agent their number url if address is provided`, async () => {
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
			await postRegisterAgentTheirAddressController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/projects/mock-case-ref/register/agent/their-telephone-number'
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
			await postRegisterAgentTheirAddressController(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith('projects/register/agent/their-address/view.njk', {
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
