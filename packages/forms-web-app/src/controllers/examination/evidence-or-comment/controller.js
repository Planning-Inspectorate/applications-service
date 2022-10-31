const {
	addKeyValueToActiveSubmissionItem,
	getActiveSubmissionItem
} = require('./../session/submission-items-session');
const { markActiveChecked } = require('../utils/mark-active-checked');

const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: { evidenceOrComment, selectDeadline }
		}
	}
} = require('../../../routes/config');
const { getRedirectUrl } = require('./utils/get-redirect-url');

const pageData = {
	backLinkUrl: `${examinationDirectory}${selectDeadline.route}`,
	id: evidenceOrComment.id,
	options: [
		evidenceOrComment.options[1],
		evidenceOrComment.options[2],
		evidenceOrComment.options[3]
	],
	pageTitle: evidenceOrComment.title,
	title: evidenceOrComment.title
};

const getEvidenceOrComment = async (req, res) => {
	try {
		const setPageData = { ...pageData };

		const activeSubmissionItem = getActiveSubmissionItem(req.session);

		setPageData.activeSubmissionItemTitle = activeSubmissionItem.submissionItem;

		if (activeSubmissionItem.submissionType)
			setPageData.options = markActiveChecked(
				setPageData.options,
				activeSubmissionItem.submissionType
			);

		return res.render(evidenceOrComment.view, setPageData);
	} catch (error) {
		console.log('Error: ', error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postEvidenceOrComment = async (req, res) => {
	try {
		const { body, session } = req;

		const setPageData = { ...pageData };

		const activeSubmissionItem = getActiveSubmissionItem(session);

		setPageData.activeSubmissionItemTitle = activeSubmissionItem.submissionItem;

		const { errors = {}, errorSummary = [] } = body;

		if (errors[evidenceOrComment.id] || Object.keys(errors).length > 0) {
			return res.render(evidenceOrComment.view, {
				...setPageData,
				errors,
				errorSummary
			});
		}

		const selectedEvidenceOrComment = body[evidenceOrComment.id];
		if (!selectedEvidenceOrComment) throw new Error('No selected evidence or comment');

		addKeyValueToActiveSubmissionItem(session, 'submissionType', selectedEvidenceOrComment);

		const redirectUrl = getRedirectUrl(evidenceOrComment.options, selectedEvidenceOrComment);

		return res.redirect(redirectUrl);
	} catch (error) {
		console.log('Error: ', error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getEvidenceOrComment,
	postEvidenceOrComment
};
