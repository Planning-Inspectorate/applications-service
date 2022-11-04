const {
	getActiveSubmissionItemKey,
	setSubmissionItem
} = require('../session/submission-items-session');

const logger = require('../../../lib/logger');

const {
	findDeadlineItemByValue,
	getDeadlineItemStillToSubmit
} = require('../session/deadlineItems-session');
const { markActiveDeadlineItemAsChecked } = require('./utils/markActiveDeadlineItemAsChecked');

const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				email: { route: emailRoute },
				evidenceOrComment: { route: evidenceOrCommentRoute },
				selectDeadline
			}
		}
	}
} = require('../../../routes/config');

const pageData = {
	backLinkUrl: `${examinationDirectory}${emailRoute}`,
	hintText:
		'Select the item you want to submit against. You can submit against another item later.',
	id: selectDeadline.id,
	pageTitle: selectDeadline.title,
	title: selectDeadline.title
};

const getSelectDeadline = (req, res) => {
	try {
		const { session } = req;
		const setPageData = { ...pageData };

		const deadlineItemsToSubmit = getDeadlineItemStillToSubmit(session);
		setPageData.options = deadlineItemsToSubmit;

		const activeDeadlineId = getActiveSubmissionItemKey(session);
		if (activeDeadlineId)
			setPageData.options = markActiveDeadlineItemAsChecked(
				deadlineItemsToSubmit,
				activeDeadlineId
			);

		return res.render(selectDeadline.view, setPageData);
	} catch (error) {
		logger.error('Error: ', error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postSelectDeadline = (req, res) => {
	try {
		const { body, session } = req;
		const { errors = {}, errorSummary = [] } = body;

		if (errors[selectDeadline.id] || Object.keys(errors).length > 0) {
			return res.render(selectDeadline.view, {
				...pageData,
				options: getDeadlineItemStillToSubmit(session),
				errors,
				errorSummary
			});
		}

		const selectedDeadline = body[selectDeadline.id];
		if (!selectedDeadline) throw new Error('No selected deadline');

		const selectedDeadlineOption = findDeadlineItemByValue(session, selectedDeadline);

		setSubmissionItem(session, selectedDeadlineOption);
		return res.redirect(examinationDirectory + evidenceOrCommentRoute);
	} catch (error) {
		logger.error(`Error: ${error}`);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getSelectDeadline,
	postSelectDeadline
};
