const { getHeaderTitleFromPath } = require('../utils/get-header-title-from-path');

const setHeaderTitle = (req, res, next) => {
	const { path } = req;
	res.locals.headerTitle = getHeaderTitleFromPath(path);
	next();
};

module.exports = {
	setHeaderTitle
};
