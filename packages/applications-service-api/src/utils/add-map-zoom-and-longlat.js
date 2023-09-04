const addMapZoomLvlAndLongLat = (document) => {
	const area = ['COUNTRY', 'REGION', 'COUNTY', 'BOROUGH', 'DISTRICT', 'CITY', 'TOWN', 'JUNCTION'];
	const MAPZOOMLVL_OFFSET = 5;
	const DEFAULT_MAPZOOMLVL = 9;
	const DEFAULT_LONGLAT = ['53.8033666', '-2.7044637'];
	const mapZoomLevel = document.MapZoomLevel ? document.MapZoomLevel : 'COUNTRY';
	let LongLat = [...DEFAULT_LONGLAT];
	if (document.LatLong) {
		const latLong = document.LatLong.split(',');
		LongLat = [latLong[1], latLong[0]];
	}

	const application = {
		...document,
		MapZoomLevel: mapZoomLevel
			? MAPZOOMLVL_OFFSET + area.indexOf(mapZoomLevel.toUpperCase())
			: MAPZOOMLVL_OFFSET + DEFAULT_MAPZOOMLVL,
		LongLat
	};
	delete application.LatLong;
	return application;
};

module.exports = {
	addMapZoomLvlAndLongLat
};
