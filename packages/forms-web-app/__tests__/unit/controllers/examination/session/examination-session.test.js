const {
	getExaminationSession,
	setExaminationUploadingState,
	setExaminationSubmissionComplete,
	setExaminationSubmissionId,
	getExaminationUploadingState,
	getExaminationSubmissionComplete,
	getExaminationSubmissionId,
	getExaminationEmailAddress,
	getExaminationSubmissionRetryErrorCount,
	setExaminationSubmissionRetryErrorCount,
	getExaminationSubmissionItems
} = require('../../../../../src/controllers/examination/session/examination-session');
describe('controllers/examination/session/examination-session', () => {
	describe('#getExaminationSession', () => {
		describe('When getting the examination key from session', () => {
			describe('and the examination key exists', () => {
				const mockSession = { examination: 'examination session' };
				const result = getExaminationSession(mockSession);
				it('should return the object', () => {
					expect(result).toEqual('examination session');
				});
			});
			describe('and the examination key does not exists', () => {
				const mockSession = {};
				it('should throw an error', () => {
					expect(() => getExaminationSession(mockSession)).toThrow('No examination session');
				});
			});
		});
	});
	describe('#setExaminationUploadingState', () => {
		describe('When setting the examination uploading flag', () => {
			describe('and the flag is true', () => {
				const mockSession = { examination: {} };
				beforeEach(() => {
					mockSession.save = jest.fn();
					setExaminationUploadingState(mockSession, true);
				});
				it('should set uploading to true', () => {
					expect(mockSession.examination.uploading).toEqual(true);
				});
				it('should save session', () => {
					expect(mockSession.save).toHaveBeenCalled();
				});
			});
			describe('and the flag is false', () => {
				const mockSession = { examination: {} };
				beforeEach(() => {
					mockSession.save = jest.fn();
					setExaminationUploadingState(mockSession, false);
				});
				it('should set uploading to false', () => {
					expect(mockSession.examination.uploading).toEqual(false);
				});
				it('should save session', () => {
					expect(mockSession.save).toHaveBeenCalled();
				});
			});
			describe('and the examination key does not exists', () => {
				const mockSession = { examination: {} };
				it('should throw an error', () => {
					expect(() => setExaminationUploadingState(mockSession)).toThrow(
						'Examination upload state is not a boolean'
					);
				});
			});
		});
	});
	describe('#getExaminationUploadingState', () => {
		describe('When getting the uploading state', () => {
			const mockSession = { examination: { uploading: true } };
			const result = getExaminationUploadingState(mockSession);
			it('should return the value of the uploading state', () => {
				expect(result).toEqual(true);
			});
		});
	});
	describe('#getExaminationSubmissionComplete', () => {
		describe('When getting the submission complete state', () => {
			const mockSession = { examination: { submissionComplete: true } };
			const result = getExaminationSubmissionComplete(mockSession);
			it('should return the value of submission complete', () => {
				expect(result).toEqual(true);
			});
		});
	});
	describe('#setExaminationSubmissionComplete', () => {
		describe('When setting the examination submission complete flag', () => {
			describe('and the flag is true', () => {
				const mockSession = { examination: {} };
				beforeEach(() => {
					mockSession.save = jest.fn();
					setExaminationSubmissionComplete(mockSession, true);
				});
				it('should set submission complete to true', () => {
					expect(mockSession.examination.submissionComplete).toEqual(true);
				});
				it('should save session', () => {
					expect(mockSession.save).toHaveBeenCalled();
				});
			});
			describe('and the flag is false', () => {
				const mockSession = { examination: {} };
				beforeEach(() => {
					mockSession.save = jest.fn();
					setExaminationSubmissionComplete(mockSession, false);
				});
				it('should set submission complete to false', () => {
					expect(mockSession.examination.submissionComplete).toEqual(false);
				});
				it('should save session', () => {
					expect(mockSession.save).toHaveBeenCalled();
				});
			});
			describe('and the examination key does not exists', () => {
				const mockSession = { examination: {} };
				it('should throw an error', () => {
					expect(() => setExaminationSubmissionComplete(mockSession)).toThrow(
						'Examination submission complete state is not a boolean'
					);
				});
			});
		});
	});
	describe('#setExaminationSubmissionId', () => {
		describe('When setting the submission Id', () => {
			describe('and the submission Id 1234', () => {
				const mockSession = { examination: {} };
				beforeEach(() => {
					mockSession.save = jest.fn();
					setExaminationSubmissionId(mockSession, '1234');
				});
				it('should set submission complete to true', () => {
					expect(mockSession.examination.submissionId).toEqual('1234');
				});
			});
		});
	});
	describe('#getExaminationSubmissionId', () => {
		describe('When getting the submission id', () => {
			const mockSession = { examination: { submissionId: '1234' } };
			const result = getExaminationSubmissionId(mockSession);
			it('should return the value of submission id', () => {
				expect(result).toEqual('1234');
			});
		});
	});
	describe('#getExaminationEmailAddress', () => {
		describe('When getting the submission id', () => {
			const mockSession = { examination: { email: 'mock email' } };
			const result = getExaminationEmailAddress(mockSession);
			it('should return the value of submission id', () => {
				expect(result).toEqual('mock email');
			});
		});
	});
	describe('#getExaminationSubmissionItems', () => {
		describe('When getting submission items', () => {
			const mockSession = {
				examination: { submissionItems: ['mock submission item 1', 'mock submission item 2'] }
			};
			const result = getExaminationSubmissionItems(mockSession);
			it('should return the submission items', () => {
				expect(result).toEqual(['mock submission item 1', 'mock submission item 2']);
			});
		});
	});
	describe('When managing the submission error retry count', () => {
		describe('#getExaminationSubmissionRetryErrorCount', () => {
			describe('When getting the retry error count', () => {
				const mockSession = { examination: { retryErrorCount: '1' } };
				const result = getExaminationSubmissionRetryErrorCount(mockSession);
				it('should return the value of submission id', () => {
					expect(result).toEqual('1');
				});
			});
		});
		describe('#setExaminationSubmissionRetryErrorCount', () => {
			describe('When setting the submission retry error count', () => {
				describe('and the count is not initialised', () => {
					const mockSession = { examination: {} };
					setExaminationSubmissionRetryErrorCount(mockSession);
					it('should initialise the value ', () => {
						expect(mockSession.examination.retryErrorCount).toEqual(1);
					});
				});
				describe('and the count is initialised', () => {
					const mockSession = { examination: { retryErrorCount: 1 } };
					setExaminationSubmissionRetryErrorCount(mockSession);
					it('should increment the value by 1', () => {
						expect(mockSession.examination.retryErrorCount).toEqual(2);
					});
				});
			});
		});
	});
});
