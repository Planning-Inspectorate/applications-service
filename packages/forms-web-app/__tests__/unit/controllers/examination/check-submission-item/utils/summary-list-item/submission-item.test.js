const {
	getSummaryListItemSubmissionItem
} = require('../../../../../../../src/controllers/examination/check-submission-item/utils/summary-list-item');

describe('controllers/examination/check-submission-item/utils/summary-list-item/submission-item', () => {
	describe('#getSummaryListItemSubmissionItem', () => {
		describe('When invoking the getSummaryListItemSubmissionItem function', () => {
			describe('and the session has a submission item value', () => {
				const mockSubmissionItem = {
					submissionItem: 'submission item'
				};

				const req = {
					session: {
						examination: {
							caseRef: 'TEST001',
							deadlineItems: [
								{ value: '0', text: 'Deadline 1' },
								{ value: '1', text: 'Deadline 2' },
								{ value: '2', text: 'Deadline 3' }
							],
							submissionItems: [
								{
									itemId: '0',
									submissionItem: 'Deadline 1',
									submitted: true,
									submissionType: 'comment',
									comment: 'Comments on deadline 1'
								}
							]
						}
					}
				};

				const result = getSummaryListItemSubmissionItem(mockSubmissionItem, req.session);
				it('should return the object', () => {
					expect(result).toEqual({
						actions: {
							items: [
								{
									href: '/examination/select-deadline-item?mode=edit',
									text: 'Change',
									visuallyHiddenText: 'Deadline item'
								}
							]
						},
						key: { text: 'Deadline item' },
						value: { html: 'submission item' }
					});
				});
			});
			describe('and the session does not have a submission item value', () => {
				const mockSubmissionItem = {};
				it('should return throw an error', () => {
					expect(() => getSummaryListItemSubmissionItem(mockSubmissionItem)).toThrow(
						'Submission item does not have a submission item value'
					);
				});
			});
		});
	});
});
