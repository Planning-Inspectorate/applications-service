const confirmEmailController = require('../../../../src/controllers/register/confirm-email');
const { authenticateToken } = require('../../../../src/lib/application-api-wrapper');
const { VIEW } = require('../../../../src/lib/views');
const { mockReq, mockRes } = require('../../mocks');

jest.mock('../../../../src/lib/application-api-wrapper');
jest.mock('../../../../src/lib/logger');

describe('controllers/register/confirm-email', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			query: {
				token: 'abc'
			}
		};
		res = mockRes();
		jest.resetAllMocks();

		authenticateToken.mockImplementation(() =>
			Promise.resolve({ resp_code: 200, data: { personal_data: { behalf: 'me' }, comments: [] } })
		);
	});

	describe('getConfirmEmail', () => {
		it('should call the correct template', () => {
			confirmEmailController.getConfirmEmail(req, res);
			expect(res.render).toHaveBeenCalledWith('register/confirm-email');
		});
	});

	describe('postConfirmEmail', () => {
		it(`'should post data and redirect to '/${VIEW.REGISTER.MYSELF.TELL_US_ABOUT_PROJECT}' if email is provided and is myself journey`, async () => {
			const mockRequest = {
				...req,
				body: {
					email: 'anc@test.com'
				}
			};
			await confirmEmailController.postConfirmEmail(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.MYSELF.TELL_US_ABOUT_PROJECT}`);
		});

		it(`'should post data and redirect to '/${VIEW.REGISTER.ORGANISATION.TELL_US_ABOUT_PROJECT}' if email is provided and is organisation journey`, async () => {
			const mockRequest = {
				...req,
				body: {
					email: 'anc@test.com'
				}
			};
			authenticateToken.mockImplementation(() =>
				Promise.resolve({
					resp_code: 200,
					data: { personal_data: { behalf: 'them' }, comments: [] }
				})
			);
			await confirmEmailController.postConfirmEmail(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				`/${VIEW.REGISTER.ORGANISATION.TELL_US_ABOUT_PROJECT}`
			);
		});

		it(`'should post data and redirect to '/${VIEW.REGISTER.AGENT.ADD_ANOTHER_COMMENT}' if email is provided and is agents journey`, async () => {
			const mockRequest = {
				...req,
				body: {
					email: 'anc@test.com'
				}
			};
			authenticateToken.mockImplementation(() =>
				Promise.resolve({
					resp_code: 200,
					data: { personal_data: { behalf: 'you' }, comments: [] }
				})
			);
			await confirmEmailController.postConfirmEmail(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.AGENT.TELL_US_ABOUT_PROJECT}`);
		});

		it(`'should render '/${VIEW.REGISTER.MISSED_DEADLINE}' if registration period is closed`, async () => {
			const mockRequest = {
				...req,
				body: {
					email: 'anc@test.com'
				}
			};
			authenticateToken.mockImplementation(() =>
				Promise.resolve({
					resp_code: 200,
					data: {
						submissionPeriodClosed: true,
						personal_data: { behalf: 'you' },
						comments: [],
						projectData: { Region: 'Wales', ProjectName: 'St James Barton Giant Wind Turbine' }
					}
				})
			);
			await confirmEmailController.postConfirmEmail(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith(`${VIEW.REGISTER.MISSED_DEADLINE}`, {
				nsipProjectLink:
					'https://infrastructure.planninginspectorate.gov.uk/projects/wales/st-james-barton-giant-wind-turbine',
				projectData: { ProjectName: 'St James Barton Giant Wind Turbine', Region: 'Wales' }
			});
		});

		it(`'should redirect to '/${VIEW.REGISTER.TOKEN_EMAIL_NOT_VERIFIED}' if received 404`, async () => {
			const mockRequest = {
				...req,
				body: {
					email: 'anc@test.com'
				}
			};
			authenticateToken.mockImplementation(() =>
				Promise.resolve({
					resp_code: 404
				})
			);
			await confirmEmailController.postConfirmEmail(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				`/${VIEW.REGISTER.TOKEN_EMAIL_NOT_VERIFIED}?token=abc`
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
			await confirmEmailController.postConfirmEmail(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.CONFIRM_EMAIL, {
				errorSummary: [{ text: 'There were errors here', href: '#' }],
				errors: { a: 'b' }
			});
		});
	});
});
