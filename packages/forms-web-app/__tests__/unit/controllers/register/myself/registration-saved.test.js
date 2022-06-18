const registrationSavedController = require('../../../../../src/controllers/register/myself/registration-saved');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/myself/registration-saved', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				mySelfRegdata: {
					email: 'test@test.com'
				},
				ipRefNo: '10',
				typeOfParty: 'org'
			}
		};
		res = mockRes();
		jest.resetAllMocks();
	});

	describe('getRegistrationSaved', () => {
		it('should call the correct template', () => {
			registrationSavedController.getRegistrationSaved(req, res);
			expect(res.render).toHaveBeenCalledWith('register/myself/registration-saved', {
				email: 'test@test.com',
				ipRefNo: '10'
			});
		});
	});
});
