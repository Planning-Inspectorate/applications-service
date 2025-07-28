const { getExaminationSubmissionId } = require('../_session/examination-session');
const logger = require('../../../lib/logger');
const { getProjectEmailAddress } = require('../../../controllers/session/app-data-session');
const view = 'examination/submission-complete/view.njk';
const { getProjectsIndexURL } = require('../../projects/index/_utils/get-projects-index-url');

const getSubmissionComplete = (req, res) => {
	try {
		const { params, session } = req;
		const { case_ref: caseRef } = params;

		const pageData = {
			submissionId: getExaminationSubmissionId(session),
			projectEmail: getProjectEmailAddress(session),
			projectsIndexURL: getProjectsIndexURL(caseRef)
		};

		return res.render(view, pageData);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getSubmissionComplete
};
