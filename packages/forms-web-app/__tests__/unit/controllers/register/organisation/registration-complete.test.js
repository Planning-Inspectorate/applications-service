const confirmationController = require('../../../../../src/controllers/register/organisation/registration-complete');
const { postRegistration, putComments } = require('../../../../../src/lib/application-api-wrapper');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/application-api-wrapper');
jest.mock('../../../../../src/lib/logger');

describe('controllers/register/organisation/registration-complete', () => {
	let req;
	let res;

	beforeEach(() => {
		jest.resetAllMocks();
		req = {
			...mockReq(),
			session: {
				orgRegdata: {
					email: 'anc@test.com'
				},
				projectName: 'ABC',
				caseRef: 'ABC123',
				appData: {
					ProjectName: 'ABC',
					Region: 'eastern'
				},
				comments: {
					comment: 'comment',
					topic: 'topic'
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
			expect(res.render).toHaveBeenCalledWith('register/organisation/registration-complete', {
				email: 'anc@test.com',
				nsipProjectLink: 'https://infrastructure.planninginspectorate.gov.uk/projects/eastern/abc'
			});
		});

		it('should redirect to correct route if mode is draft', async () => {
			req.session.mode = 'draft';
			await confirmationController.getConfirmation(req, res);
			expect(res.redirect).toHaveBeenCalledWith(
				`/${VIEW.REGISTER.ORGANISATION.REGISTRATION_SAVED}`
			);
		});
	});
});
