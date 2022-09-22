const declarationController = require('../../../../../src/controllers/register/agent/declaration');
const { postRegistration, putComments } = require('../../../../../src/lib/application-api-wrapper');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes, mockResponse } = require('../../../mocks');

jest.mock('../../../../../src/lib/application-api-wrapper');
jest.mock('../../../../../src/lib/logger');

describe('controllers/register/agent/declaration', () => {
	let req;
	let res;
	let mockRequest;

	beforeEach(() => {
		req = mockReq();
		res = mockRes();
		jest.resetAllMocks();

		mockRequest = {
			...req,
			session: {
				behalfRegdata: {
					email: 'anc@test.com',
					ipRefNo: 'ABC123'
				},
				projectName: 'ABC',
				caseRef: 'ABC123',
				mode: 'final',
				comment: 'comment'
			}
		};

		postRegistration.mockImplementation(() =>
			Promise.resolve({ resp_code: 200, data: '30020010' })
		);

		putComments.mockImplementation(() => Promise.resolve({ resp_code: 200, data: {} }));
	});

	describe('getDeclaration', () => {
		it('should call the correct template', () => {
			declarationController.getDeclaration(req, res);
			expect(res.render).toHaveBeenCalledWith('register/agent/declaration');
		});
	});

	describe('postDeclaration', () => {
		it(`'should post data and redirect to '/${VIEW.REGISTER.AGENT.REGISTRATION_COMPLETE}'`, async () => {
			await declarationController.postDeclaration(mockRequest, res);
			expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.AGENT.REGISTRATION_COMPLETE}`);
		});
		it(`'should create session data and post, redirect to '/${VIEW.REGISTER.AGENT.REGISTRATION_COMPLETE}' if no ipRef exists in session`, async () => {
			await declarationController.postDeclaration(mockRequest, res);
			expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.AGENT.REGISTRATION_COMPLETE}`);
		});

		it('handle exception thrown by API when writing representations', async () => {
			res = mockResponse();
			putComments.mockImplementation(() => {
				throw new Error();
			});
			await declarationController.postDeclaration(mockRequest, res);
			expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
		});
	});
});
