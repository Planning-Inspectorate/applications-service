const { getProjectEmailAddress } = require('../../../../controllers/session/app-data-session');

const { getExaminationSubmitCommentsURL } = require('./get-examination-submit-comments-url');

const getPageData = (session) => {
	const pageData = {
		id: 'examination-submission-error',
		projectEmail: getProjectEmailAddress(session),
		submitCommentsURL: getExaminationSubmitCommentsURL(),
		pageTitle: 'Sorry, there is a problem with the service',
		title: 'Sorry, there is a problem with the service'
	};

	return pageData;
};

module.exports = { getPageData };
