const {
	getDeadlineInterestedPartyNumber,
	setDeadlineInterestedPartyNumber
} = require('../../../../../src/controllers/session/deadline/interested-party-number');

const {
	getExaminationSession
} = require('../../../../../src/controllers/session/examination-session');

jest.mock('../../../../../src/controllers/session/examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('controllers/session/deadline/email', () => {
	const req = {
		session: { mockSession: 'mock session' }
	};
	describe('#getDeadlineInterestedPartyNumber', () => {
		describe('When getting the deadline interested party number from the examination session', () => {
			describe('and there is no deadline interested party number in the examination session', () => {
				beforeEach(() => {
					getExaminationSession.mockReturnValue({});
				});
				it('should throw an error', () => {
					expect(() => getDeadlineInterestedPartyNumber()).toThrow(
						'Deadline interested party number not found'
					);
				});
			});
			describe('and there is a deadline interested party number in the examination session', () => {
				let result;
				const mockExaminationSession = {
					interestedPartyNumber: 'mock interested party number'
				};
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getDeadlineInterestedPartyNumber(req.session);
				});
				it('should call the function', () => {
					expect(getExaminationSession).toHaveBeenCalledWith(req.session);
				});
				it('should return the deadline interested party number', () => {
					expect(result).toEqual(mockExaminationSession.interestedPartyNumber);
				});
			});
		});
	});
	describe('#setDeadlineInterestedPartyNumber', () => {
		describe('When setting the deadline interested party number in the examination session', () => {
			const mockExaminationSession = {};
			const mockDeadlineInterestedPartyNumber = 'mock deadline interested party number';
			beforeEach(() => {
				getExaminationSession.mockReturnValue(mockExaminationSession);
				setDeadlineInterestedPartyNumber(req.session, mockDeadlineInterestedPartyNumber);
			});
			it('should call the function', () => {
				expect(getExaminationSession).toHaveBeenCalledWith(req.session);
			});
			it('should add the deadline interested party number to the examination session', () => {
				expect(mockExaminationSession).toEqual({
					interestedPartyNumber: mockDeadlineInterestedPartyNumber
				});
			});
		});
	});
});
