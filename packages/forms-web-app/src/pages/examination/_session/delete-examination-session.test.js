const { deleteExaminationSession } = require('./delete-examination-session');
const { getExaminationSession } = require('./examination-session');

jest.mock('./examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('#deleteExaminationSession', () => {
	describe('when deleting the examination session ', () => {
		describe('and there are keys required to be kept', () => {
			const mockSession = {
				save: jest.fn()
			};
			const mockExam = {
				submissionId: '1234',
				submissionComplete: true,
				email: 'mock email',
				extra: 'i should be ignored'
			};

			beforeEach(() => {
				getExaminationSession.mockReturnValue(mockExam);
				deleteExaminationSession(mockSession);
			});
			it('should save the session', () => {
				expect(mockSession.save).toHaveBeenCalled();
			});
			it('should only keep the required examination session key values', () => {
				expect(mockSession).toEqual({
					examination: {
						submissionId: '1234',
						submissionComplete: true,
						email: 'mock email'
					},
					save: mockSession.save
				});
			});
		});
	});
});
