const { getSummaryListItemEnterComment } = require('./index');

describe('examination/check-submission-item/utils/summary-list-item/enter-comment', () => {
	describe('#getSummaryListItemEnterComment', () => {
		describe('When getting the enter comment summary list item', () => {
			describe('and the submission item has a comment', () => {
				const mockSubmissionItem = {
					comment: 'comment'
				};
				const result = getSummaryListItemEnterComment(mockSubmissionItem);
				it('should return the summary list item', () => {
					expect(result).toEqual({
						actions: {
							items: [
								{
									href: 'enter-a-comment?mode=edit',
									text: 'Change',
									visuallyHiddenText: 'Your comment'
								}
							]
						},
						key: { text: 'Your comment' },
						value: { html: 'comment' }
					});
				});
			});
			describe('and the submission item does not have a comment', () => {
				const mockSubmissionItem = {};
				it('should throw an error', () => {
					expect(() => getSummaryListItemEnterComment(mockSubmissionItem)).toThrow(
						'Submission item does not have a comment'
					);
				});
			});
		});
	});
});
