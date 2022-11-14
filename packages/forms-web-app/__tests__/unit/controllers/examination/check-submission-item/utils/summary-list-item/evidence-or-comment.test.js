const {
	getSummaryListItemEvidenceOrComment
} = require('../../../../../../../src/controllers/examination/check-submission-item/utils/summary-list-item/evidence-or-comment');

describe('controllers/examination/check-submission-item/utils/summary-list-item/evidence-or-comment', () => {
	describe('#getSummaryListItemEvidenceOrComment', () => {
		describe('When getting the evidence or comment summary list item', () => {
			describe('and the submission item has a submission type value', () => {
				describe('and the value is equal to "comment"', () => {
					const mockSubmissionItem = {
						submissionType: 'comment'
					};
					const result = getSummaryListItemEvidenceOrComment(mockSubmissionItem);
					it('should return the summary list item', () => {
						expect(result).toEqual({
							actions: {
								items: [
									{
										href: '/examination/select-upload-evidence-or-comment?mode=edit',
										text: 'Change',
										visuallyHiddenText: "How you've submitted your representation"
									}
								]
							},
							key: { text: "How you've submitted your representation" },
							value: { html: 'Write a comment' }
						});
					});
				});
				describe('and the value is equal to "upload"', () => {
					const mockSubmissionItem = {
						submissionType: 'upload'
					};
					const result = getSummaryListItemEvidenceOrComment(mockSubmissionItem);
					it('should return the summary list item', () => {
						expect(result).toEqual({
							actions: {
								items: [
									{
										href: '/examination/select-upload-evidence-or-comment?mode=edit',
										text: 'Change',
										visuallyHiddenText: "How you've submitted your representation"
									}
								]
							},
							key: { text: "How you've submitted your representation" },
							value: { html: 'Upload files' }
						});
					});
				});
				describe('and the value is equal to "both"', () => {
					const mockSubmissionItem = {
						submissionType: 'both'
					};
					const result = getSummaryListItemEvidenceOrComment(mockSubmissionItem);
					it('should return the summary list item', () => {
						expect(result).toEqual({
							actions: {
								items: [
									{
										href: '/examination/select-upload-evidence-or-comment?mode=edit',
										text: 'Change',
										visuallyHiddenText: "How you've submitted your representation"
									}
								]
							},
							key: { text: "How you've submitted your representation" },
							value: { html: 'Both' }
						});
					});
				});
			});
			describe('and the submission item does not have a submission type value', () => {
				it('it should throw an error', () => {
					expect(() => getSummaryListItemEvidenceOrComment('')).toThrow(
						'Submission item submission type value is not a required option'
					);
				});
			});
		});
	});
});
