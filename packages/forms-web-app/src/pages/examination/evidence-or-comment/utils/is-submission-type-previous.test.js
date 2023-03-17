const { isSubmissionTypePrevious } = require('./is-submission-type-previous');

let { getActiveSubmissionItem } = require('../../_session/submission-items-session');

jest.mock('../../_session/submission-items-session', () => ({
	getActiveSubmissionItem: jest.fn()
}));

describe('examination/evidence-or-comment/utils/is-submission-type-previous', () => {
	const req = {
		session: {}
	};
	describe('#isSubmissionTypePrevious', () => {
		describe('When determining if the new submission type is the same as the previous submission type', () => {
			describe('and the selected submission type matches the previous submission type', () => {
				let result;
				const mockGetActiveSubmissionItemvalue = {
					submissionType: 'mock previous submission type value'
				};
				beforeEach(() => {
					getActiveSubmissionItem.mockReturnValue(mockGetActiveSubmissionItemvalue);
					result = isSubmissionTypePrevious(
						req.session,
						mockGetActiveSubmissionItemvalue.submissionType
					);
				});
				it('should return a boolean set to true', () => {
					expect(result).toEqual(true);
				});
			});
			describe('and the selected submission type does not match the previous submission type', () => {
				let result;
				const mockGetActiveSubmissionItemvalue = {
					submissionType: 'mock submission type value'
				};
				beforeEach(() => {
					getActiveSubmissionItem.mockReturnValue(mockGetActiveSubmissionItemvalue);
					result = isSubmissionTypePrevious(req.session, 'mock new submission type value');
				});
				it('should return a boolean set to false', () => {
					expect(result).toEqual(false);
				});
			});
		});
	});
});
