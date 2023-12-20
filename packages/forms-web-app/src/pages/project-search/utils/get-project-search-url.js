const { getOriginURL } = require('../../_utils/get-origin-url');
const { projectSearchRoute } = require('../config');

const getProjectSearchURL = () => {
	const originURL = getOriginURL();

	return `${originURL}/${projectSearchRoute}`;
};

module.exports = { getProjectSearchURL };
