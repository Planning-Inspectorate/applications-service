const { getProcessSubmission, postProcessSubmission } = require('./controller');
const { postRegistration } = require('../../../../../lib/application-api-wrapper');
jest.mock('../../../../../lib/application-api-wrapper', () => ({
	postRegistration: jest.fn()
}));
describe('pages/projects/register/_common/process-submission/controller', () => {
	describe('#getProcessSubmission', () => {
		const res = {
			render: jest.fn(),
			status: jest.fn(() => res)
		};
		describe('and the user has selected myself', () => {
			const req = {
				originalUrl: '/mock-base-url/mock-case-ref/register/myself/process-submission'
			};
			beforeEach(() => {
				getProcessSubmission(req, res);
			});
			it('should render the process-submission view', () => {
				expect(res.render).toHaveBeenCalledWith(
					'projects/register/_common/process-submission/view.njk',
					{ key: 'myself' }
				);
			});
		});
	});
	describe('#postProcessSubmission', () => {
		describe('when submission is successful', () => {
			const res = {
				locals: { baseUrl: '/mock-base-url/mock-case-ref' },
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};
			const req = {
				originalUrl: '/mock-base-url/mock-case-ref/register/myself/process-submission',
				params: { case_ref: 'mock-case-ref' },
				session: {
					comment: 'mock comment',
					mySelfRegdata: { text: 'mock data' }
				}
			};
			beforeEach(async () => {
				postRegistration.mockResolvedValue({ data: { referenceId: 'IP-REF-123' } });
				await postProcessSubmission(req, res);
			});
			it('should call postRegistration with the correct data', () => {
				expect(postRegistration).toHaveBeenCalledWith(
					expect.stringContaining('"case_ref":"mock-case-ref"')
				);
			});
			it('should redirect to the registration-complete page', () => {
				expect(res.redirect).toHaveBeenCalledWith(
					'/mock-base-url/mock-case-ref/register/myself/registration-complete'
				);
			});
		});
		describe('when submission fails', () => {
			const res = {
				locals: { baseUrl: '/mock-base-url/mock-case-ref' },
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};
			const req = {
				originalUrl: '/mock-base-url/mock-case-ref/register/myself/process-submission',
				params: { case_ref: 'mock-case-ref' },
				session: {
					comment: 'mock comment',
					mySelfRegdata: { text: 'mock data' }
				}
			};
			beforeEach(async () => {
				postRegistration.mockRejectedValue(new Error('API error'));
				await postProcessSubmission(req, res);
			});
			it('should render the error page', () => {
				expect(res.status).toHaveBeenCalledWith(500);
				expect(res.render).toHaveBeenCalledWith('error/have-your-say-journey-error');
			});
		});
	});
});
