const { getOriginURL } = require('../../_utils/get-origin-url');
const { projectsMapRoute, masterGeoJsonDownloadRoute } = require('../config');

const getGeoJsonDownloadURL = () => {
	const originURL = getOriginURL();

	return `${originURL}/${projectsMapRoute}/${masterGeoJsonDownloadRoute}`;
};

module.exports = { getGeoJsonDownloadURL };
