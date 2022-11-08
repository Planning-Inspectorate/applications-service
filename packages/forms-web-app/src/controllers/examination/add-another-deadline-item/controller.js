const {
	routesConfig: {
		examination: {
			pages: { addAnotherDeadlineItem }
		}
	}
} = require('../../../routes/config');
const logger = require('../../../lib/logger');
const { getRedirectUrl } = require('./utils/get-redirect-url');
const { getPageData } = require('./utils/get-page-data');

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

const postAddAnotherDeadlineItem = (req, res) => {
	try {
		const { body, session } = req;
		const { errors = {}, errorSummary = [] } = body;

		if (errors[addAnotherDeadlineItem.id] || Object.keys(errors).length > 0) {
			const setPageData = getPageData(session);
			console.log('Errors: ', errors, errorSummary);
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
	postAddAnotherDeadlineItem
};
