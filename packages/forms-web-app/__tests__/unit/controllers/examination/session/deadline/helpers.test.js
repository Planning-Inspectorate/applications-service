const {
	getUserHasInterestedPartyNumber,
	isUserApplicant
} = require('../../../../../../src/controllers/examination/session/deadline/helpers');

const {
	getExaminationSession
} = require('../../../../../../src/controllers/examination/session/examination-session');

jest.mock('../../../../../../src/controllers/examination/session/examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('controllers/session/deadline/helpers', () => {
	const req = {
		session: { mockSession: 'mock session' }
	};
	describe('#getUserHasInterestedPartyNumber', () => {
		describe('When determining if a user has a interested party number', () => {
			describe('and the user has selected yes', () => {
				let result;
				beforeEach(() => {
					getExaminationSession.mockReturnValue({ hasInterestedPartyNo: 'yes' });
					result = getUserHasInterestedPartyNumber(req.session);
				});
				it('should call the function', () => {
					expect(getExaminationSession).toHaveBeenCalledWith(req.session);
				});
				it('should return as true', () => {
					expect(result).toEqual(true);
				});
			});
			describe('and the user has not selected yes', () => {
				let result;
				beforeEach(() => {
					getExaminationSession.mockReturnValue({ hasInterestedPartyNo: 'no' });
					result = getUserHasInterestedPartyNumber(req.session);
				});
				it('should call the function', () => {
					expect(getExaminationSession).toHaveBeenCalledWith(req.session);
				});
				it('should return as false', () => {
					expect(result).toEqual(false);
				});
			});
		});
	});
	describe('#isUserApplicant', () => {
		describe('When determining if a user is the applicant', () => {
			describe('and the user has selected yes', () => {
				let result;
				beforeEach(() => {
					getExaminationSession.mockReturnValue({ isApplicant: 'yes' });
					result = isUserApplicant(req.session);
				});
				it('should call the function', () => {
					expect(getExaminationSession).toHaveBeenCalledWith(req.session);
				});
				it('should return as true', () => {
					expect(result).toEqual(true);
				});
			});
			describe('and the user has not selected yes', () => {
				let result;
				beforeEach(() => {
					getExaminationSession.mockReturnValue({ isApplicant: 'no' });
					result = isUserApplicant(req.session);
				});
				it('should call the function', () => {
					expect(getExaminationSession).toHaveBeenCalledWith(req.session);
				});
				it('should return as false', () => {
					expect(result).toEqual(false);
				});
			});
		});
	});
});
