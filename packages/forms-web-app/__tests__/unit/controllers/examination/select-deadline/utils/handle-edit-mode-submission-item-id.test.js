const {
	handleEditModeSubmissionItemId
} = require('../../../../../../src/controllers/examination/select-deadline/utils/handle-edit-mode-submission-item-id');

const { isQueryModeEdit } = require('../../../../../../src/controllers/utils/is-query-mode-edit');
const {
	setEditModeSubmissionItemId
} = require('../../../../../../src/controllers/examination/session/submission-items-session');

jest.mock('../../../../../../src/controllers/utils/is-query-mode-edit', () => ({
	isQueryModeEdit: jest.fn()
}));
jest.mock('../../../../../../src/controllers/examination/session/submission-items-session', () => ({
	setEditModeSubmissionItemId: jest.fn()
}));

describe('controllers/examination/select-deadline/utils/handle-edit-mode-submission-item-id', () => {
	describe('#handleEditModeSubmissionItemId', () => {
		const query = {
			mockQuery: 'mock query'
		};
		const session = {
			mockSession: 'mock session'
		};
		const selectedDeadlineOptionValue = 'mock selected deadline option value';

		describe('and the query has a mode that is set to edit', () => {
			beforeEach(() => {
				isQueryModeEdit.mockReturnValue(true);
				handleEditModeSubmissionItemId(query, session, selectedDeadlineOptionValue);
			});
			it('should call the functions', () => {
				expect(isQueryModeEdit).toHaveBeenCalledWith(query);
				expect(setEditModeSubmissionItemId).toHaveBeenCalledWith(
					session,
					selectedDeadlineOptionValue
				);
			});
		});
		describe('and the query does not have a mode that is set to edit', () => {
			beforeEach(() => {
				isQueryModeEdit.mockReturnValue(false);
				handleEditModeSubmissionItemId(query, session, selectedDeadlineOptionValue);
			});
			it('should call the function', () => {
				expect(isQueryModeEdit).toHaveBeenCalledWith(query);
			});
			it('should not call the function', () => {
				expect(setEditModeSubmissionItemId).toHaveBeenCalledTimes(0);
			});
		});
	});
});
