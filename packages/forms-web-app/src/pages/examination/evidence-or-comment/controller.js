const logger = require('../../../lib/logger');
const { deleteSubmissionType } = require('./utils/delete-submission-type');
const { addKeyValueToActiveSubmissionItem } = require('../_session/submission-items-session');
const { getRedirectUrl } = require('./utils/get-redirect-url');
const { getPageData } = require('./utils/get-page-data');
const {
	routesConfig: {
		examination: {
			pages: { evidenceOrComment }
		}
	}
} = require('../../../routes/config');

const view = 'examination/evidence-or-comment/view.njk';

const getEvidenceOrComment = async (req, res) => {
	try {
		const { i18n, query, session } = req;

		return res.render(view, getPageData(i18n, query, session));
	} catch (error) {
		logger.error('Error: ', error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postEvidenceOrComment = async (req, res) => {
	try {
		const { body, i18n, query, session } = req;
		const { errors = {}, errorSummary = [] } = body;

		if (errors[evidenceOrComment.id] || Object.keys(errors).length > 0) {
			return res.render(view, {
				...getPageData(i18n, query, session),
				errors,
				errorSummary
			});
		}

		const selectedSubmissionType = body[evidenceOrComment.id];
		if (!selectedSubmissionType) throw new Error('No submission type selected');

		const redirectUrl = getRedirectUrl(query, session, selectedSubmissionType);
		await deleteSubmissionType(session, selectedSubmissionType);
		addKeyValueToActiveSubmissionItem(session, 'submissionType', selectedSubmissionType);
		return res.redirect(redirectUrl);
	} catch (error) {
		logger.error('Error: ', error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getEvidenceOrComment,
	postEvidenceOrComment
};
