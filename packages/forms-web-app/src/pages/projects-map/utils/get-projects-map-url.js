const { getOriginURL } = require('../../_utils/get-origin-url');
const { projectsMapRoute } = require('../config');

const getProjectsMapURL = () => {
	const originURL = getOriginURL();

	return `${originURL}/${projectsMapRoute}`;
};

module.exports = { getProjectsMapURL };
