const { originRoute } = require('../config');

const getOriginURL = () => {
	const originPath = originRoute ? `/${originRoute}` : '';

	return originPath;
};

module.exports = { getOriginURL };
