const { getOriginURL } = require('../../_utils/get-origin-url');
const { projectsMapRoute, masterGeoJsonMapDisplayRoute } = require('../config');

const getGeoJsonURL = () => {
	const originURL = getOriginURL();

	return `${originURL}/${projectsMapRoute}/${masterGeoJsonMapDisplayRoute}`;
};

module.exports = { getGeoJsonURL };
