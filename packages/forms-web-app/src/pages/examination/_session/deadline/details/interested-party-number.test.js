const {
	getDeadlineDetailsInterestedPartyNumber,
	setDeadlineDetailsInterestedPartyNumber
} = require('./interested-party-number');

const { getExaminationSession } = require('../../examination-session');

jest.mock('../../examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('examination/session/deadline/details/interested-party-number', () => {
	const req = {
		session: { mockSession: 'mock session' }
	};
	describe('#getDeadlineDetailsInterestedPartyNumber', () => {
		describe('When getting the deadline interested party number from the examination session', () => {
			describe('and there is no deadline interested party number in the examination session', () => {
				beforeEach(() => {
					getExaminationSession.mockReturnValue({});
				});
				it('should throw an error', () => {
					expect(() => getDeadlineDetailsInterestedPartyNumber()).toThrow(
						'Deadline interested party number not found'
					);
				});
			});
			describe('and there is a deadline interested party number in the examination session', () => {
				let result;
				const mockExaminationSession = {
					interestedPartyNumber: '1234567890'
				};
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getDeadlineDetailsInterestedPartyNumber(req.session);
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
	describe('#setDeadlineDetailsInterestedPartyNumber', () => {
		describe('When setting the deadline interested party number in the examination session', () => {
			const mockExaminationSession = {};
			const mockDeadlineInterestedPartyNumberValue = '1234567890';
			beforeEach(() => {
				getExaminationSession.mockReturnValue(mockExaminationSession);
				setDeadlineDetailsInterestedPartyNumber(
					req.session,
					mockDeadlineInterestedPartyNumberValue
				);
			});
			it('should call the function', () => {
				expect(getExaminationSession).toHaveBeenCalledWith(req.session);
			});
			it('should add the deadline interested party number to the examination session', () => {
				expect(mockExaminationSession).toEqual({
					interestedPartyNumber: mockDeadlineInterestedPartyNumberValue
				});
			});
		});
	});
});
