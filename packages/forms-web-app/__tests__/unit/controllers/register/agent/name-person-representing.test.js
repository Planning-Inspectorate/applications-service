const fullNameController = require('../../../../../src/controllers/register/agent/name-person-representing');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/agent/name-person-representing', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				behalfRegdata: {
					representee: {
						'full-name': 'test'
					}
				}
			}
		};
		res = mockRes();
		jest.resetAllMocks();
	});

	describe('getFullName', () => {
		it('should call the correct template', () => {
			fullNameController.getFullName(req, res);
			expect(res.render).toHaveBeenCalledWith('register/agent/name-person-representing', {
				fullName: 'test'
			});
		});
	});

	describe('postFullName', () => {
		it(`'should post data and redirect to '/${VIEW.REGISTER.AGENT.REPRESENTEE_OVER_18}' if name is provided`, async () => {
			const fullName = 'test';
			const mockRequest = {
				...req,
				body: {
					'full-name': fullName
				},
				query: {
					mode: ''
				}
			};
			await fullNameController.postFullName(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				`/mock-base-url/mock-case-ref/${VIEW.REGISTER.AGENT.REPRESENTEE_OVER_18}`
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

			mockRequest.session.behalfRegdata.representing = 'person';

			await fullNameController.postFullName(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.AGENT.REPRESENTEE_NAME, {
				errorSummary: [{ text: 'There were errors here', href: '#' }],
				errors: { a: 'b' },
				representing: 'person'
			});
		});

		it('should re-render the template with errors if there is any validation error', async () => {
			const mockRequest = {
				...req,
				body: {
					errorSummary: [{ text: 'There were errors here', href: '#' }],
					errors: { a: 'b' }
				}
			};

			mockRequest.session.behalfRegdata.representing = 'family';

			await fullNameController.postFullName(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.AGENT.REPRESENTEE_NAME_FAMILY, {
				errorSummary: [{ text: 'There were errors here', href: '#' }],
				errors: { a: 'b' },
				representing: 'family'
			});
		});

		it('should re-render the template with errors if there is any validation error', async () => {
			const mockRequest = {
				...req,
				body: {
					errorSummary: [{ text: 'There were errors here', href: '#' }],
					errors: { a: 'b' }
				}
			};

			mockRequest.session.behalfRegdata.representing = 'organisation';

			await fullNameController.postFullName(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.AGENT.REPRESENTEE_NAME_ORGANISATION, {
				errorSummary: [{ text: 'There were errors here', href: '#' }],
				errors: { a: 'b' },
				representing: 'organisation'
			});
		});
	});
});
