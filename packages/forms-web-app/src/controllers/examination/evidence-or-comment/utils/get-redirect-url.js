const { getRedirectRoute } = require('./get-redirect-route');
const { getSubmissionItemPageUrl } = require('../../utils/get-submission-item-page-url');
const { isSubmissionTypePrevious } = require('./is-submission-type-previous');
const {
	routesConfig: {
		examination: { directory }
	}
} = require('../../../../routes/config');

const getRedirectUrl = (query, session, value) => {
	let redirectUrl;

	const redirectRoute = getRedirectRoute(value);

	if (isSubmissionTypePrevious(session, value))
		redirectUrl = getSubmissionItemPageUrl(query, redirectRoute);
	else redirectUrl = `${directory}${redirectRoute}`;

	return redirectUrl;
};

module.exports = { getRedirectUrl };
