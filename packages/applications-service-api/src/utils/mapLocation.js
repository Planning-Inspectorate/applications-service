const OSPoint = require('ospoint');

const mapZoomLevel = (zoomLevelName) => {
	const DEFAULT_ZOOM_LEVEL = 0;

	if (!zoomLevelName) return DEFAULT_ZOOM_LEVEL;

	const ZOOM_LEVELS = {
		COUNTRY: 0,
		REGION: 1,
		COUNTY: 2,
		BOROUGH: 3,
		DISTRICT: 4,
		CITY: 5,
		TOWN: 6,
		JUNCTION: 7
	};

	return ZOOM_LEVELS[zoomLevelName.toUpperCase()] || DEFAULT_ZOOM_LEVEL;
};

const mapLongLat = (latLong) => {
	if (!latLong) return [];

	return latLong
		.split(',')
		.map((s) => s.trim())
		.reverse();
};

const mapNorthingEastingToLongLat = (northing, easting) => {
	const point = new OSPoint(northing, easting);
	const coordinates = point.toWGS84();
	return [coordinates.longitude.toString(), coordinates.latitude.toString()];
};

module.exports = {
	mapZoomLevel,
	mapLongLat,
	mapNorthingEastingToLongLat
};
