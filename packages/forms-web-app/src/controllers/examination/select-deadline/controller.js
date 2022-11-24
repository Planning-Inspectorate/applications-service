const logger = require('../../../lib/logger');
const { setActiveSubmissionItem } = require('../session/submission-items-session');
const { findDeadlineItemByValue } = require('../session/deadlineItems-session');
const { getPageData } = require('./utils/get-page-data');
const { getRedirectUrl } = require('./utils/get-redirect-url');
const { handleEditModeSubmissionItemId } = require('./utils/handle-edit-mode-submission-item-id');
const {
	routesConfig: {
		examination: {
			pages: { selectDeadline }
		}
	}
} = require('../../../routes/config');

const getSelectDeadline = (req, res) => {
	try {
		const { query, session } = req;
		return res.render(selectDeadline.view, getPageData(query, session));
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postSelectDeadline = (req, res) => {
	try {
		const { body, query, session } = req;
		const { errors = {}, errorSummary = [] } = body;

		if (errors[selectDeadline.id] || Object.keys(errors).length > 0) {
			return res.render(selectDeadline.view, {
				...getPageData(query, session),
				errors,
				errorSummary
			});
		}

		const selectedDeadline = body[selectDeadline.id];
		if (!selectedDeadline) throw new Error('No selected deadline');

		const selectedDeadlineOption = findDeadlineItemByValue(session, selectedDeadline);

		setActiveSubmissionItem(session, selectedDeadlineOption);
		handleEditModeSubmissionItemId(query, session, selectedDeadlineOption.value);

		return res.redirect(getRedirectUrl(query));
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getSelectDeadline,
	postSelectDeadline
};
