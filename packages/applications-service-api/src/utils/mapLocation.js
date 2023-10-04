const OSPoint = require('ospoint');

const mapZoomLevel = (zoomLevelName) => {
	const DEFAULT_ZOOM_LEVEL = 5;

	if (!zoomLevelName) return DEFAULT_ZOOM_LEVEL;

	const ZOOM_LEVELS = {
		COUNTRY: 5,
		REGION: 6,
		COUNTY: 7,
		BOROUGH: 8,
		DISTRICT: 9,
		CITY: 10,
		TOWN: 11,
		JUNCTION: 12
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
