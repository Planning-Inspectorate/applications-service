const {
	isProcessingSubmission
} = require('../../../../../src/controllers/examination/middleware/submission.middleware');
const {
	getExaminationSubmissionComplete,
	getExaminationUploadingState
} = require('../../../../../src/controllers/examination/session/examination-session');

jest.mock('../../../../../src/controllers/examination/session/examination-session', () => ({
	getExaminationSubmissionComplete: jest.fn(),
	getExaminationUploadingState: jest.fn()
}));

describe('#isProcessingSubmission', () => {
	describe('When a user has processed a submission and navigated away from the process page', () => {
		const req = { url: '', session: { mockSession: 'mock session' } };
		const res = {
			redirect: jest.fn(),
			render: jest.fn(),
			status: jest.fn(() => res)
		};
		const next = jest.fn();
		describe('and a submission has complete and the user is on the complete submission route', () => {
			beforeEach(() => {
				const url = '/submission-complete';
				isProcessingSubmission({ ...req, url }, res, next);
			});
			it('should go to the next middleware', () => {
				expect(next).toHaveBeenCalled();
			});
		});
		describe('and the uploading process is completed', () => {
			beforeEach(() => {
				getExaminationSubmissionComplete.mockReturnValue(true);
				isProcessingSubmission(req, res, next);
			});
			it('should redirect to the submission	 complete page', () => {
				expect(res.redirect).toHaveBeenCalledWith('/examination/submission-complete');
			});
		});
		describe('and the process is still uploading', () => {
			beforeEach(() => {
				getExaminationSubmissionComplete.mockReturnValue(false);
				getExaminationUploadingState.mockReturnValue(true);
				isProcessingSubmission(req, res, next);
			});
			it('should render the error page', () => {
				expect(res.status).toHaveBeenCalledWith(500);
				expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
			});
		});
		describe('and no conditions are met', () => {
			beforeEach(() => {
				getExaminationSubmissionComplete.mockReturnValue(false);
				getExaminationUploadingState.mockReturnValue(false);
				isProcessingSubmission(req, res, next);
			});
			it('should go to the next middleware', () => {
				expect(next).toHaveBeenCalled();
			});
		});
	});
});
