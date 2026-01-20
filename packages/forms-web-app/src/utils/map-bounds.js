const proj4 = require('proj4');

/**
 * Calculate UK map bounds for Leaflet using British National Grid (BNG) to WGS84 conversion
 * @returns {Object} Object containing center and bounds coordinates for Leaflet
 */
function getUKMapBounds() {
	// Proj4 string for EPSG:27700 (British National Grid)
	const bngProj4String =
		'+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs';

	// Calculate center: BNG coordinates shifted down to show full UK including southern edge
	const bngCenter = [400000, 300000]; // [easting, northing] in meters
	const wgs84Center = proj4(bngProj4String, 'WGS84', bngCenter); // Convert to [lng, lat]
	const leafletCenter = [wgs84Center[1], wgs84Center[0]]; // Flip to [lat, lng] for Leaflet

	// Calculate bounds: UK bounds in BNG coordinates (EPSG:27700) based on OS Maps coverage area
	const bngBounds = [
		[-238375.0, 0.0], // Southwest corner in BNG (extended for full coverage)
		[900000.0, 1376256.0] // Northeast corner in BNG (matches OS Maps extent)
	];

	// Convert BNG bounds to WGS84 for Leaflet maxBounds
	const wgs84Southwest = proj4(bngProj4String, 'WGS84', bngBounds[0]);
	const wgs84Northeast = proj4(bngProj4String, 'WGS84', bngBounds[1]);
	const leafletMaxBounds = [
		[wgs84Southwest[1], wgs84Southwest[0]], // [lat, lng] for southwest
		[wgs84Northeast[1], wgs84Northeast[0]] // [lat, lng] for northeast
	];

	return {
		center: leafletCenter,
		maxBounds: leafletMaxBounds
	};
}

module.exports = {
	getUKMapBounds
};
