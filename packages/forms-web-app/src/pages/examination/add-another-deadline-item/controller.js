const logger = require('../../../lib/logger');
const { getRedirectUrl } = require('./utils/get-redirect-url');
const { getPageData } = require('./utils/get-page-data');
const {
	setActiveSubmissionItemId,
	setEditModeSubmissionItemId
} = require('../_session/submission-items-session');
const {
	routesConfig: {
		examination: {
			directory,
			pages: { addAnotherDeadlineItem, checkSubmissionItem }
		}
	}
} = require('../../../routes/config');
const { editQuery } = require('../../../controllers/utils/queryMode');
const view = 'examination/add-another-deadline-item/view.njk';
const getAddAnotherDeadlineItem = (req, res) => {
	try {
		const { query, session } = req;
		return res.render(view, getPageData(session, query));
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postChangeADeadlineItem = (req, res) => {
	try {
		const {
			session,
			body: { itemIdToChange }
		} = req;

		if (!itemIdToChange) throw new Error('No item id for change');

		setActiveSubmissionItemId(session, itemIdToChange);
		setEditModeSubmissionItemId(session, itemIdToChange);
		return res.redirect(`${directory}${checkSubmissionItem.route}${editQuery}`);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postAddAnotherDeadlineItem = (req, res) => {
	try {
		const { body, session, query } = req;
		const { errors = {}, errorSummary = [] } = body;

		if (errors[addAnotherDeadlineItem.id] || Object.keys(errors).length > 0) {
			const setPageData = getPageData(session, query);
			return res.render(view, {
				...setPageData,
				errors,
				errorSummary
			});
		}

		const addAnotherDeadlineItemValue = body[addAnotherDeadlineItem.id];

		if (!addAnotherDeadlineItemValue)
			throw new Error('No add another deadline item value in the body');

		return res.redirect(getRedirectUrl(addAnotherDeadlineItemValue));
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getAddAnotherDeadlineItem,
	postAddAnotherDeadlineItem,
	postChangeADeadlineItem
};
