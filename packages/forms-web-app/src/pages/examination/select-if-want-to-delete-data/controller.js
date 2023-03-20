const logger = require('../../../lib/logger');

const {
	routesConfig: {
		examination: {
			pages: { selectIfYouWantToDeleteData, addAnotherDeadlineItem }
		}
	}
} = require('../../../routes/config');

const { setDeadlineItemToDelete } = require('../_session/deadlineItems-session');
const { yesDeleteSubmissionItem } = require('./utils/yes-delete-submission-item');

const view = 'examination/select-if-want-to-delete-data/view.njk';

const pageData = {
	backLinkUrl: `${addAnotherDeadlineItem.route}`,
	id: selectIfYouWantToDeleteData.id,
	pageTitle: selectIfYouWantToDeleteData.pageTitle,
	options: [
		{ text: 'Yes', value: 'yes' },
		{ text: 'No', value: 'no' }
	]
};

const getSelectIfYouWantToDeleteData = (req, res) => {
	try {
		const setPageData = { ...pageData };

		return res.render(view, setPageData);
	} catch (error) {
		logger.error('Error: ', error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postMarkDeadlineItemForDelete = (req, res) => {
	try {
		const {
			session,
			body: { itemIdToDelete }
		} = req;

		setDeadlineItemToDelete(session, itemIdToDelete);

		return res.redirect(`${selectIfYouWantToDeleteData.route}`);
	} catch (error) {
		logger.error('Error: ', error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postSelectIfYouWantToDeleteData = async (req, res) => {
	try {
		const { body, session } = req;
		const { errors = {}, errorSummary = [] } = body;

		if (errors[selectIfYouWantToDeleteData.id] || Object.keys(errors).length > 0) {
			return res.render(view, {
				...pageData,
				errors,
				errorSummary
			});
		}

		const answer = body[selectIfYouWantToDeleteData.id];
		if (!answer) throw new Error('No selected deadline');

		if (answer === 'yes') await yesDeleteSubmissionItem(session);
		setDeadlineItemToDelete(session, -1);

		return res.redirect(`${addAnotherDeadlineItem.route}`);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getSelectIfYouWantToDeleteData,
	postSelectIfYouWantToDeleteData,
	postMarkDeadlineItemForDelete
};
