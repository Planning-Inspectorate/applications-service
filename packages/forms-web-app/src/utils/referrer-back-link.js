const referrerBackLink = (refUrl, session) => {
	if (refUrl && !refUrl.includes('having-your-say-guide')) {
		session.referrerBackLink = refUrl;
	}
	return session.referrerBackLink;
};

module.exports = {
	referrerBackLink
};
