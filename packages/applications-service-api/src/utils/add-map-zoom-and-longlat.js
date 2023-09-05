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

module.exports = {
	addMapZoomLvlAndLongLat
};
