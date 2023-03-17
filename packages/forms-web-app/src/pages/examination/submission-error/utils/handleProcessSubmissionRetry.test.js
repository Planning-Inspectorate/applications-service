const {
	setExaminationUploadingState,
	setExaminationSubmissionComplete,
	setExaminationSubmissionRetryErrorCount,
	getExaminationSubmissionRetryErrorCount
} = require('../../_session/examination-session');
const { handleProcessSubmissionRetry } = require('./handleProcessSubmissionRetry');

jest.mock('../../_session/examination-session', () => ({
	setExaminationUploadingState: jest.fn(),
	setExaminationSubmissionComplete: jest.fn(),
	setExaminationSubmissionRetryErrorCount: jest.fn(),
	getExaminationSubmissionRetryErrorCount: jest.fn()
}));

describe('#handleProcessSubmissionRetry', () => {
	describe('When handling the process submission failure', () => {
		describe('and the retry count has NOT been reached', () => {
			const mockSession = { text: 'mock session' };
			beforeEach(() => {
				getExaminationSubmissionRetryErrorCount.mockReturnValue(1);
				handleProcessSubmissionRetry(mockSession);
			});
			it('should remove the session blocks in place to allow a retry to take place', () => {
				expect(setExaminationUploadingState).toHaveBeenCalledWith(mockSession, false);
				expect(setExaminationSubmissionComplete).toHaveBeenCalledWith(mockSession, false);
			});
			it('should call the session manager to increment thr retry value', () => {
				expect(setExaminationSubmissionRetryErrorCount).toHaveBeenCalledWith(mockSession);
			});
		});
		describe('and the retry count has been reached', () => {
			const mockSession = { text: 'mock session' };
			beforeEach(() => {
				getExaminationSubmissionRetryErrorCount.mockReturnValue(5);
			});
			it('should set ht uploading state to true and throw an error', () => {
				expect(() => handleProcessSubmissionRetry(mockSession)).toThrow(
					'Maximum process submission retry limit (2) reached'
				);
				expect(setExaminationUploadingState).toHaveBeenCalledWith(mockSession, true);
			});
		});
	});
});
