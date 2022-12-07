const {
	getDeadlineDetailsHasInterestedPartyNumber,
	setDeadlineDetailsHasInterestedPartyNumber
} = require('../../../../../../../src/controllers/examination/session/deadline/details/has-interested-party-number');

const {
	getExaminationSession
} = require('../../../../../../../src/controllers/examination/session/examination-session');

jest.mock('../../../../../../../src/controllers/examination/session/examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('controllers/examination/session/deadline/details/has-interested-party-number', () => {
	const req = {
		session: { mockSession: 'mock session' }
	};
	describe('#getDeadlineDetailsHasInterestedPartyNumber', () => {
		describe('When getting the deadline has interested party number from the examination session', () => {
			describe('and there is no deadline has interested party number in the examination session', () => {
				beforeEach(() => {
					getExaminationSession.mockReturnValue({});
				});
				it('should throw an error', () => {
					expect(() => getDeadlineDetailsHasInterestedPartyNumber()).toThrow(
						'Deadline has interested party number not found'
					);
				});
			});
			describe('and there is a deadline has interested party number in the examination session', () => {
				let result;
				const mockExaminationSession = {
					hasInterestedPartyNo: 'yes/no'
				};
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getDeadlineDetailsHasInterestedPartyNumber(req.session);
				});
				it('should call the function', () => {
					expect(getExaminationSession).toHaveBeenCalledWith(req.session);
				});
				it('should return the deadline has interested party number', () => {
					expect(result).toEqual(mockExaminationSession.hasInterestedPartyNo);
				});
			});
		});
	});
	describe('#setDeadlineDetailsHasInterestedPartyNumber', () => {
		describe('When setting the deadline has interested party number in the examination session', () => {
			const mockExaminationSession = {};
			const mockDeadlineHasInterestedPartyNumberValue = 'yes/no';
			beforeEach(() => {
				getExaminationSession.mockReturnValue(mockExaminationSession);
				setDeadlineDetailsHasInterestedPartyNumber(
					req.session,
					mockDeadlineHasInterestedPartyNumberValue
				);
			});
			it('should call the function', () => {
				expect(getExaminationSession).toHaveBeenCalledWith(req.session);
			});
			it('should add the deadline has interested party number to the examination session', () => {
				expect(mockExaminationSession).toEqual({
					hasInterestedPartyNo: mockDeadlineHasInterestedPartyNumberValue
				});
			});
		});
	});
});
