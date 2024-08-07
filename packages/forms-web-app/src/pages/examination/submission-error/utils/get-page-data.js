const {
	routesConfig: {
		examination: {
			pages: { submissionError }
		}
	}
} = require('../../../../routes/config');

const { getProjectEmailAddress } = require('../../../../controllers/session/app-data-session');

const { getExaminationSubmitCommentsURL } = require('./get-examination-submit-comments-url');

const getPageData = (session) => ({
	id: submissionError.id,
	projectEmail: getProjectEmailAddress(session),
	submitCommentsURL: getExaminationSubmitCommentsURL()
});

module.exports = { getPageData };
