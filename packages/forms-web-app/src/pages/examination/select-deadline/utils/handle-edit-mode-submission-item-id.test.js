const { handleEditModeSubmissionItemId } = require('./handle-edit-mode-submission-item-id');

const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');
const { setEditModeSubmissionItemId } = require('../../_session/submission-items-session');

jest.mock('../../../../controllers/utils/is-query-mode-edit', () => ({
	isQueryModeEdit: jest.fn()
}));
jest.mock('../../_session/submission-items-session', () => ({
	setEditModeSubmissionItemId: jest.fn()
}));

describe('examination/select-deadline/utils/handle-edit-mode-submission-item-id', () => {
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
