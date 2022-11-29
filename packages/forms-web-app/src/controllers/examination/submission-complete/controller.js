const { getExaminationSubmissionId } = require('../session/examination-session');

const {
	routesConfig: {
		examination: {
			pages: { submissionComplete }
		}
	}
} = require('../../../routes/config');
const logger = require('../../../lib/logger');
const { getProjectEmailAddress } = require('../../session/app-data-session');

const getSubmissionComplete = (req, res) => {
	try {
		const { session } = req;

		const pageData = {
			submissionId: getExaminationSubmissionId(session),
			projectEmail: getProjectEmailAddress(session)
		};

		return res.render(submissionComplete.view, pageData);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getSubmissionComplete
};
