const {
	getDeadlineHasInterestedPartyNumber,
	setDeadlineHasInterestedPartyNumber
} = require('../../../../../src/controllers/session/deadline/has-interested-party-number');

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
	describe('#getDeadlineHasInterestedPartyNumber', () => {
		describe('When getting the deadline has interested party number from the examination session', () => {
			describe('and there is no deadline has interested party number in the examination session', () => {
				beforeEach(() => {
					getExaminationSession.mockReturnValue({});
				});
				it('should throw an error', () => {
					expect(() => getDeadlineHasInterestedPartyNumber()).toThrow(
						'Deadline has interested party number not found'
					);
				});
			});
			describe('and there is a deadline has interested party number in the examination session', () => {
				let result;
				const mockExaminationSession = {
					hasInterestedPartyNumber: 'mock has interested party number'
				};
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getDeadlineHasInterestedPartyNumber(req.session);
				});
				it('should call the function', () => {
					expect(getExaminationSession).toHaveBeenCalledWith(req.session);
				});
				it('should return the deadline has interested party number', () => {
					expect(result).toEqual(mockExaminationSession.hasInterestedPartyNumber);
				});
			});
		});
	});
	describe('#setDeadlineHasInterestedPartyNumber', () => {
		describe('When setting the deadline has interested party number in the examination session', () => {
			const mockExaminationSession = {};
			const mockDeadlineHasInterestedPartyNumber = 'mock deadline has interested party number';
			beforeEach(() => {
				getExaminationSession.mockReturnValue(mockExaminationSession);
				setDeadlineHasInterestedPartyNumber(req.session, mockDeadlineHasInterestedPartyNumber);
			});
			it('should call the function', () => {
				expect(getExaminationSession).toHaveBeenCalledWith(req.session);
			});
			it('should add the deadline has interested party number to the examination session', () => {
				expect(mockExaminationSession).toEqual({
					hasInterestedPartyNumber: mockDeadlineHasInterestedPartyNumber
				});
			});
		});
	});
});
