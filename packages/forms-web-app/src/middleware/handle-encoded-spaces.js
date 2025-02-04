const handleEncodedSpacesInUrl = (req, res, next) => {
	const url = req.url;
	const trimmedUrl = url
		.split('/')
		.map((segment) => decodeURIComponent(segment).trim())
		.join('/');

	if (url !== trimmedUrl) {
		return res.redirect(301, trimmedUrl);
	}

	next();
};

module.exports = {
	handleEncodedSpacesInUrl
};
