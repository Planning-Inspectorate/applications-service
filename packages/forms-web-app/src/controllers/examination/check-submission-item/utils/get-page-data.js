const {
	routesConfig: {
		examination: {
			directory,
			pages: { addDeadline, checkSubmissionItem }
		}
	}
} = require('../../../../routes/config');

const getPageData = () => ({
	id: checkSubmissionItem.id,
	nextPageUrl: `${directory}${addDeadline.route}`,
	pageTitle: checkSubmissionItem.name,
	title: checkSubmissionItem.name
});

module.exports = { getPageData };
