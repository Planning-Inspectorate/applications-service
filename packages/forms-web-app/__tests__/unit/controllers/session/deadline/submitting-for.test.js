const {
	getDeadlineSubmittingFor,
	setDeadlineSubmittingFor
} = require('../../../../../src/controllers/session/deadline/submitting-for');

const {
	getExaminationSession
} = require('../../../../../src/controllers/examination/session/examination-session');

jest.mock('../../../../../src/controllers/examination/session/examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('controllers/session/deadline/submitting-for', () => {
	const req = {
		session: { mockSession: 'mock session' }
	};
	describe('#getDeadlineSubmittingFor', () => {
		describe('When getting the deadline submitting for from the examination session', () => {
			describe('and there is no deadline submitting for in the examination session', () => {
				beforeEach(() => {
					getExaminationSession.mockReturnValue({});
				});
				it('should throw an error', () => {
					expect(() => getDeadlineSubmittingFor()).toThrow('Deadline submitting for not found');
				});
			});
			describe('and there is a deadline submitting for in the examination session', () => {
				let result;
				const mockExaminationSession = {
					submittingFor: 'mock submitting for'
				};
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getDeadlineSubmittingFor(req.session);
				});
				it('should call the function', () => {
					expect(getExaminationSession).toHaveBeenCalledWith(req.session);
				});
				it('should return the deadline submitting for', () => {
					expect(result).toEqual(mockExaminationSession.submittingFor);
				});
			});
		});
	});
	describe('#setDeadlineSubmittingFor', () => {
		describe('When setting the deadline submitting for in the examination session', () => {
			const mockExaminationSession = {};
			const mockDeadlineSubmittingFor = 'mock deadline submitting for';
			beforeEach(() => {
				getExaminationSession.mockReturnValue(mockExaminationSession);
				setDeadlineSubmittingFor(req.session, mockDeadlineSubmittingFor);
			});
			it('should call the function', () => {
				expect(getExaminationSession).toHaveBeenCalledWith(req.session);
			});
			it('should add the deadline submitting for to the examination session', () => {
				expect(mockExaminationSession).toEqual({
					submittingFor: mockDeadlineSubmittingFor
				});
			});
		});
	});
});
