const OSPoint = require('ospoint');

const addMapZoomLvlAndLongLat = (document) => {
	const area = ['COUNTRY', 'REGION', 'COUNTY', 'BOROUGH', 'DISTRICT', 'CITY', 'TOWN', 'JUNCTION'];
	const ZOOM_LEVEL_OFFSET = 5;

	const zoomLevelArea = document.MapZoomLevel || 'COUNTRY';
	const MapZoomLevel = ZOOM_LEVEL_OFFSET + area.indexOf(zoomLevelArea.toUpperCase());

	let LongLat;
	if (document.LatLong) {
		const latLong = document.LatLong.split(',').map((s) => s.trim());
		LongLat = [latLong[1], latLong[0]];
	}

	const application = {
		...document,
		MapZoomLevel,
		LongLat
	};

	delete application.LatLong;

	return application;
};

const mapZoomLevel = (zoomLevelName) => {
	const DEFAULT_ZOOM_LEVEL = 14;

	if (!zoomLevelName) return DEFAULT_ZOOM_LEVEL;

	const ZOOM_LEVELS = {
		'COUNTRY': 5,
		'REGION': 6,
		'COUNTY': 7,
		'BOROUGH': 8,
		'DISTRICT': 9,
		'CITY': 10,
		'TOWN': 11,
		'JUNCTION': 12
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
	addMapZoomLvlAndLongLat,
	mapZoomLevel,
	mapLongLat,
	mapNorthingEastingToLongLat
};
