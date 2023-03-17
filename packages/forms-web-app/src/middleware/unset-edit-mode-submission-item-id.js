const {
	deleteEditModeSubmissionItemId
} = require('../pages/examination/_session/submission-items-session');

const unsetEditModeSubmissionItemId = () => (req, res, next) => {
	const { session } = req;

	deleteEditModeSubmissionItemId(session);

	return next();
};

module.exports = { unsetEditModeSubmissionItemId };
