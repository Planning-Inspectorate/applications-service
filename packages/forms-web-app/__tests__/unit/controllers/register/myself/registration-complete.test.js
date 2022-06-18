const confirmationController = require('../../../../../src/controllers/register/myself/registration-complete');
const { postRegistration, putComments } = require('../../../../../src/lib/application-api-wrapper');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/application-api-wrapper');
jest.mock('../../../../../src/lib/logger');

describe('controllers/register/myself/registration-complete', () => {
	let req;
	let res;

	beforeEach(() => {
		jest.resetAllMocks();
		req = {
			...mockReq(),
			session: {
				mySelfRegdata: {
					email: 'anc@test.com'
				},
				projectName: 'ABC',
				appData: {
					ProjectName: 'ABC',
					Region: 'eastern'
				},
				caseRef: 'ABC123',
				comment: {
					comment: 'comment'
				}
			}
		};
		res = mockRes();

		postRegistration.mockImplementation(() =>
			Promise.resolve({ resp_code: 200, data: '30020010' })
		);

		putComments.mockImplementation(() => Promise.resolve({ resp_code: 200, data: {} }));
	});

	describe('getConfirmation', () => {
		it('should call the correct template', async () => {
			await confirmationController.getConfirmation(req, res);
			expect(res.render).toHaveBeenCalledWith('register/myself/registration-complete', {
				email: 'anc@test.com',
				nsipProjectLink: 'https://infrastructure.planninginspectorate.gov.uk/projects/eastern/abc'
			});
		});

		it('should redirect to correct route if mode is draft', async () => {
			req.session.mode = 'draft';
			await confirmationController.getConfirmation(req, res);
			expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.MYSELF.REGISTRATION_SAVED}`);
		});
	});
});
