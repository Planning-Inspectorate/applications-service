const {
	getDeadlineItemChangeUrl
} = require('../../../../../../../src/controllers/examination/check-submission-item/utils/summary-list-item/get-deadline-item-change-url');
const {
	routesConfig: {
		examination: {
			directory,
			pages: { selectDeadline }
		}
	}
} = require('../../../../../../../src/routes/config');
const {
	editQuery
} = require('../../../../../../../src/controllers/examination/check-submission-item/utils/summary-list-item/config');

describe('controllers/examination/check-submission-item/utils/summary-list-item/get-deadline-item-change-url', () => {
	describe('#getDeadlineItemChangeUrl', () => {
		describe('When getting the change deadline item url for the summary list item for the check your answers page', () => {
			describe('and submission items has the same number of items as deadline items', () => {
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
								},
								{
									itemId: '1',
									submissionItem: 'Deadline 2',
									submitted: true,
									submissionType: 'comment',
									comment: 'Comments on deadline 2'
								},
								{
									itemId: '2',
									submissionItem: 'Deadline 3',
									submitted: true,
									submissionType: 'comment',
									comment: 'Comments on deadline 3'
								}
							]
						}
					}
				};
				const result = getDeadlineItemChangeUrl(
					req.session,
					`${directory}${selectDeadline.route}${editQuery}`
				);
				it('should return a null string', () => {
					expect(result).toEqual('');
				});
			});
			describe('and submission items has less than the number of items in deadline items', () => {
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
								},
								{
									itemId: '1',
									submissionItem: 'Deadline 2',
									submitted: true,
									submissionType: 'comment',
									comment: 'Comments on deadline 2'
								}
							]
						}
					}
				};
				const result = getDeadlineItemChangeUrl(
					req.session,
					`${directory}${selectDeadline.route}${editQuery}`
				);
				it('should return the passed in url unchanged', () => {
					expect(result).toEqual(`${directory}${selectDeadline.route}${editQuery}`);
				});
			});
		});
	});
});
