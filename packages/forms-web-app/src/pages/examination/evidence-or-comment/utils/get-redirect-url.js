const { getRedirectRoute } = require('./get-redirect-route');
const { getSubmissionItemPageUrl } = require('../../_utils/get-submission-item-page-url');
const { isSubmissionTypePrevious } = require('./is-submission-type-previous');

const getRedirectUrl = (query, session, value) => {
	let redirectUrl;

	const redirectRoute = getRedirectRoute(value);

	if (isSubmissionTypePrevious(session, value))
		redirectUrl = getSubmissionItemPageUrl(query, redirectRoute);
	else redirectUrl = `${redirectRoute}`;

	return redirectUrl;
};

module.exports = { getRedirectUrl };
