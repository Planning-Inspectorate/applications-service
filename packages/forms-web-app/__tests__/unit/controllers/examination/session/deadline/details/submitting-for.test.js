const {
	getDeadlineDetailsSubmittingFor,
	setDeadlineDetailsSubmittingFor
} = require('../../../../../../../src/controllers/examination/session/deadline/details/submitting-for');

const {
	getExaminationSession
} = require('../../../../../../../src/controllers/examination/session/examination-session');

jest.mock('../../../../../../../src/controllers/examination/session/examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('controllers/examination/session/deadline/details/submitting-for', () => {
	const req = {
		session: { mockSession: 'mock session' }
	};
	describe('#getDeadlineDetailsSubmittingFor', () => {
		describe('When getting deadline submitting for from the examination session', () => {
			describe('and there is no deadline submitting for in the examination session', () => {
				beforeEach(() => {
					getExaminationSession.mockReturnValue({});
				});
				it('should throw an error', () => {
					expect(() => getDeadlineDetailsSubmittingFor()).toThrow(
						'Deadline submitting for not found'
					);
				});
			});
			describe('and there is a deadline submitting for in the examination session', () => {
				let result;
				const mockExaminationSession = {
					submittingFor: 'myself/organisation/agent'
				};
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getDeadlineDetailsSubmittingFor(req.session);
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
	describe('#setDeadlineDetailsSubmittingFor', () => {
		describe('When setting the deadline submitting for in the examination session', () => {
			const mockExaminationSession = {};
			const mockDeadlineSubmittingForValue = 'myself/organisation/agent';
			beforeEach(() => {
				getExaminationSession.mockReturnValue(mockExaminationSession);
				setDeadlineDetailsSubmittingFor(req.session, mockDeadlineSubmittingForValue);
			});
			it('should call the function', () => {
				expect(getExaminationSession).toHaveBeenCalledWith(req.session);
			});
			it('should add the deadline submitting for to the examination session', () => {
				expect(mockExaminationSession).toEqual({
					submittingFor: mockDeadlineSubmittingForValue
				});
			});
		});
	});
});
