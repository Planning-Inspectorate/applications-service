const registrationSavedController = require('../../../../../src/controllers/register/organisation/registration-saved');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/organisation/registration-saved', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				orgRegdata: {
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
			expect(res.render).toHaveBeenCalledWith('register/organisation/registration-saved', {
				email: 'test@test.com',
				ipRefNo: '10'
			});
		});
	});
});
