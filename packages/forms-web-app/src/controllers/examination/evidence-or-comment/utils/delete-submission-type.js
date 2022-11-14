const { deleteKeyFromActiveSubmissionItem } = require('../../session/submission-items-session');
const {
	routesConfig: {
		examination: {
			pages: { enterComment, evidenceOrComment, selectFile }
		}
	}
} = require('../../../../routes/config');

const deleteSubmissionType = (session, value) => {
	if (value === evidenceOrComment.options[1].value) {
		deleteKeyFromActiveSubmissionItem(session, selectFile.sessionId);
	} else if (value === evidenceOrComment.options[2].value) {
		deleteKeyFromActiveSubmissionItem(session, enterComment.sessionId);
	}
};

module.exports = { deleteSubmissionType };
