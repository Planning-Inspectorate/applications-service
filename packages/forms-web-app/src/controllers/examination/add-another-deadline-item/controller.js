const {
	routesConfig: {
		examination: {
			directory,
			pages: { addAnotherDeadlineItem, checkSubmissionItem }
		}
	}
} = require('../../../routes/config');
const logger = require('../../../lib/logger');
const { getRedirectUrl } = require('./utils/get-redirect-url');
const { getPageData } = require('./utils/get-page-data');
const { setActiveSubmissionItem } = require('../session/submission-items-session');

const getAddAnotherDeadlineItem = (req, res) => {
	try {
		const { session } = req;
		const setPageData = getPageData(session);

		return res.render(addAnotherDeadlineItem.view, {
			...setPageData
		});
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

		setActiveSubmissionItem(session, itemIdToChange);

		return res.redirect(`${directory}${checkSubmissionItem.route}`);
	} catch (error) {
		logger.error('Error: ', error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postAddAnotherDeadlineItem = (req, res) => {
	try {
		const { body, session } = req;
		const { errors = {}, errorSummary = [] } = body;

		if (errors[addAnotherDeadlineItem.id] || Object.keys(errors).length > 0) {
			const setPageData = getPageData(session);
			return res.render(addAnotherDeadlineItem.view, {
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
