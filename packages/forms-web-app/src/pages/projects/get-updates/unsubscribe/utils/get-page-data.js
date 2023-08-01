const { getEmail } = require('./get-email');

const getPageData = (query) => ({
	email: getEmail(query),
	pageHeading: 'Are you sure you want to unsubscribe?',
	pageTitle: 'Unsubscribe confirmation'
});

module.exports = { getPageData };
