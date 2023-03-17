const { filterSubmissionItems } = require('./filter-submission-items');

describe('examination/add-another-deadline-item/utils/filter-submission-items', () => {
	describe('#filterSubmissionItems', () => {
		describe('When filtering the submission items', () => {
			const mockSubmittedSubmissionItem = { submitted: true };
			const mockNonSubmittedSubmissionItem = { submitted: false };
			describe('and there are both submitted and non-submitted submission items', () => {
				const result = filterSubmissionItems([
					mockSubmittedSubmissionItem,
					mockNonSubmittedSubmissionItem
				]);
				it('should return only the submitted submission items', () => {
					expect(result).toEqual([mockSubmittedSubmissionItem]);
				});
			});
		});
	});
});
