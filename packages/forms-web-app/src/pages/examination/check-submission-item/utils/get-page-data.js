const {
	routesConfig: {
		examination: {
			pages: { addDeadline, checkSubmissionItem }
		}
	}
} = require('../../../../routes/config');

const getPageData = () => ({
	id: checkSubmissionItem.id,
	nextPageUrl: `${addDeadline.route}`
});

module.exports = { getPageData };
