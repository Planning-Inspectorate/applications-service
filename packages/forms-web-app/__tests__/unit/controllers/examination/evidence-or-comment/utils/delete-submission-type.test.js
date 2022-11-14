const {
	deleteSubmissionType
} = require('../../../../../../src/controllers/examination/evidence-or-comment/utils/delete-submission-type');

let {
	deleteKeyFromActiveSubmissionItem
} = require('../../../../../../src/controllers/examination/session/submission-items-session');

jest.mock('../../../../../../src/controllers/examination/session/submission-items-session', () => ({
	deleteKeyFromActiveSubmissionItem: jest.fn()
}));

describe('controllers/examination/evidence-or-comment/utils/delete-submission-type', () => {
	const req = {
		session: 'mock session'
	};
	describe('#deleteSubmissionType', () => {
		describe('When the deleteSubmissionType function is called', () => {
			describe('and the submission type value is equal to "comment"', () => {
				beforeEach(() => {
					deleteSubmissionType(req.session, 'comment');
				});
				it('should call the deleteKeyFromActiveSubmissionItem function', () => {
					expect(deleteKeyFromActiveSubmissionItem).toHaveBeenCalledWith(req.session, 'files');
				});
			});
			describe('and the submission type value is equal to "upload"', () => {
				beforeEach(() => {
					deleteSubmissionType(req.session, 'upload');
				});
				it('should call the deleteKeyFromActiveSubmissionItem function', () => {
					expect(deleteKeyFromActiveSubmissionItem).toHaveBeenCalledWith(req.session, 'comment');
				});
			});
			describe('and the submission type is not equal to "comment" or "upload"', () => {
				beforeEach(() => {
					deleteSubmissionType(req.session, 'both');
				});
				it('should call the deleteKeyFromActiveSubmissionItem function', () => {
					expect(deleteKeyFromActiveSubmissionItem).toBeCalledTimes(0);
				});
			});
		});
	});
});
