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
	submitCommentsURL: getExaminationSubmitCommentsURL(),
	pageTitle: 'Sorry, there is a problem with the service',
	title: 'Sorry, there is a problem with the service'
});

module.exports = { getPageData };
