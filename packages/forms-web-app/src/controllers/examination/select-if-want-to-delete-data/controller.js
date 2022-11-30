const logger = require('../../../lib/logger');

const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: { selectIfYouWantToDeleteData, addAnotherDeadlineItem }
		}
	}
} = require('../../../routes/config');

const { setDeadlineItemToDelete } = require('../session/deadlineItems-session');
const { yesDeleteSubmissionItem } = require('./utils/yes-delete-submission-item');

const pageData = {
	backLinkUrl: `${examinationDirectory}${addAnotherDeadlineItem.route}`,
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

		return res.render(selectIfYouWantToDeleteData.view, setPageData);
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

		return res.redirect(`${examinationDirectory}${selectIfYouWantToDeleteData.route}`);
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
			return res.render(selectIfYouWantToDeleteData.view, {
				...pageData,
				errors,
				errorSummary
			});
		}

		const answer = body[selectIfYouWantToDeleteData.id];
		if (!answer) throw new Error('No selected deadline');

		if (answer === 'yes') await yesDeleteSubmissionItem(session);
		setDeadlineItemToDelete(session, -1);

		return res.redirect(`${examinationDirectory}${addAnotherDeadlineItem.route}`);
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
