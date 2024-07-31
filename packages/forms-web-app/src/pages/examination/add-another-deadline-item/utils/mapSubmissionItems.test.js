const { mapSubmissionItems } = require('./mapSubmissionItems');

const { getExaminationSession } = require('../../_session/examination-session');
const { filterSubmissionItems } = require('./filter-submission-items');
const { mockI18n } = require('../../../_mocks/i18n');

const i18n = mockI18n({});

jest.mock('../../_session/examination-session', () => ({
	getExaminationSession: jest.fn()
}));
jest.mock('./filter-submission-items', () => ({
	filterSubmissionItems: jest.fn()
}));

describe('#mapSubmissionItems', () => {
	describe('When mapping the submission items', () => {
		describe('and there are no submission item', () => {
			beforeEach(() => {
				getExaminationSession.mockReturnValue('i am empty');
			});
			it('should throw an error', () => {
				expect(() => mapSubmissionItems()).toThrow('No submission items in session');
			});
		});
		describe('and there is 1 non submitted submission item', () => {
			let result;
			const mockSession = {};
			const mockSubmissionItems = [{ submissionItem: 'mock submission item', itemId: 1 }];
			beforeEach(() => {
				getExaminationSession.mockReturnValue({ submissionItems: mockSubmissionItems });
				filterSubmissionItems.mockReturnValue(mockSubmissionItems);
				result = mapSubmissionItems(i18n, mockSession);
			});
			it('should return the mapped data', () => {
				expect(result).toEqual({
					hasNoSubmissionItems: false,
					noDeadlineItems: {
						selectDeadlineURL: 'select-deadline-item'
					},
					submissionItems: [
						{
							change: {
								itemId: 1,
								url: 'change-a-deadline-item'
							},
							remove: {
								itemId: 1,
								url: 'mark-deadline-item-to-delete'
							},
							submissionItem: 'mock submission item'
						}
					],
					title: 'You added 1 deadline item'
				});
			});
		});
		describe('and there is non submitted submission items', () => {
			let result;
			const mockSession = {};
			const mockSubmissionItems = [
				{ submissionItem: 'mock submission item', itemId: 1 },
				{ submissionItem: 'mock another submission item', itemId: 2 }
			];
			beforeEach(() => {
				getExaminationSession.mockReturnValue({ submissionItems: mockSubmissionItems });
				filterSubmissionItems.mockReturnValue(mockSubmissionItems);
				result = mapSubmissionItems(i18n, mockSession);
			});
			it('should return the mapped data', () => {
				expect(result).toEqual({
					hasNoSubmissionItems: false,
					noDeadlineItems: {
						selectDeadlineURL: 'select-deadline-item'
					},
					submissionItems: [
						{
							change: {
								itemId: 1,
								url: 'change-a-deadline-item'
							},
							remove: {
								itemId: 1,
								url: 'mark-deadline-item-to-delete'
							},
							submissionItem: 'mock submission item'
						},
						{
							change: {
								itemId: 2,
								url: 'change-a-deadline-item'
							},
							remove: {
								itemId: 2,
								url: 'mark-deadline-item-to-delete'
							},
							submissionItem: 'mock another submission item'
						}
					],
					title: 'You added 2 deadline items'
				});
			});
		});
	});
});
