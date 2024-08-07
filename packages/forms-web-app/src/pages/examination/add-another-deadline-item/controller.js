const logger = require('../../../lib/logger');
const { getRedirectUrl } = require('./utils/get-redirect-url');
const { getPageData } = require('./utils/get-page-data');
const {
	setActiveSubmissionItemId,
	setEditModeSubmissionItemId
} = require('../_session/submission-items-session');
const { editQuery } = require('../../../controllers/utils/queryMode');
const {
	routesConfig: {
		examination: {
			pages: { addAnotherDeadlineItem, checkSubmissionItem }
		}
	}
} = require('../../../routes/config');

const view = 'examination/add-another-deadline-item/view.njk';

const getAddAnotherDeadlineItem = (req, res) => {
	try {
		const { i18n, query, session } = req;
		return res.render(view, getPageData(i18n, session, query));
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

		return res.redirect(`${checkSubmissionItem.route}${editQuery}`);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postAddAnotherDeadlineItem = (req, res) => {
	try {
		const { body, i18n, session, query } = req;
		const { errors = {}, errorSummary = [] } = body;

		if (errors[addAnotherDeadlineItem.id] || Object.keys(errors).length > 0) {
			const setPageData = getPageData(i18n, session, query);
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
