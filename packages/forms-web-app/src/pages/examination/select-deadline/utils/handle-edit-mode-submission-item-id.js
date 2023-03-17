const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');
const { setEditModeSubmissionItemId } = require('../../_session/submission-items-session');

const handleEditModeSubmissionItemId = (query, session, selectedDeadlineOptionValue) => {
	if (isQueryModeEdit(query)) setEditModeSubmissionItemId(session, selectedDeadlineOptionValue);
};

module.exports = { handleEditModeSubmissionItemId };
