const mapTitles = (pageHeading, pageTitle) => {
	const title = pageTitle ? pageTitle : pageHeading;

	return { pageHeading, pageTitle: title };
};

module.exports = { mapTitles };
