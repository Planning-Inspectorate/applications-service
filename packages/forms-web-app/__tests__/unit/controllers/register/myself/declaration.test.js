const declarationController = require('../../../../../src/controllers/register/myself/declaration');
const { postRegistration, putComments } = require('../../../../../src/lib/application-api-wrapper');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes, mockResponse } = require('../../../mocks');

jest.mock('../../../../../src/lib/application-api-wrapper');
jest.mock('../../../../../src/lib/logger');

describe('controllers/register/myself/declaration', () => {
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
				mySelfRegdata: {
					email: 'anc@test.com'
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
			expect(res.render).toHaveBeenCalledWith('register/myself/declaration');
		});
	});

	describe('postDeclaration', () => {
		it(`'should post data and redirect to '/${VIEW.REGISTER.MYSELF.REGISTRATION_COMPLETE}'`, async () => {
			await declarationController.postDeclaration(mockRequest, res);
			expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.MYSELF.REGISTRATION_COMPLETE}`);
		});

		it(`'should create session data and post, redirect to '/${VIEW.REGISTER.MYSELF.REGISTRATION_COMPLETE}' if no ipRef exists in session`, async () => {
			await declarationController.postDeclaration(mockRequest, res);
			expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.MYSELF.REGISTRATION_COMPLETE}`);
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
