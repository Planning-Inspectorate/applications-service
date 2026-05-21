'use strict';

const GeoJSON = require('ol/format/GeoJSON.js').default;
const {
	EPSG_27700,
	EPSG_4326,
	GEOJSON_FEATURE_COLLECTION,
	RENDER_MODE_SINGLE_POINT,
	RENDER_MODE_MULTI_POINT,
	RENDER_MODE_GEOJSON
} = require('./constants');

/**
 * @param {Object|Array} mapInput GeoJSON FeatureCollection | [lng,lat] | [[lng,lat],...]
 * @returns {{ features: Array, mode: 'singlePoint'|'multiPoint'|'geojson', warnings: string[] }}
 */
function normalizeMapInput(mapInput) {
	const warnings = [];

	if (mapInput == null) {
		warnings.push('[projects-map] normalizeMapInput: received null/undefined input');
		return { features: [], mode: RENDER_MODE_SINGLE_POINT, warnings };
	}

	// Array fallback: normalise [lng, lat] or [[lng, lat], ...] to a FeatureCollection,
	// then fall through to the single GeoJSON processing path below.
	if (Array.isArray(mapInput)) {
		const pairs = !Array.isArray(mapInput[0]) ? [mapInput] : mapInput;
		const features = [];
		for (const point of pairs) {
			const lng = parseFloat(point?.[0]);
			const lat = parseFloat(point?.[1]);
			if (!isFinite(lng) || !isFinite(lat)) {
				warnings.push(
					`[projects-map] normalizeMapInput: skipping invalid point: ${JSON.stringify(point)}`
				);
				continue;
			}
			features.push({
				type: 'Feature',
				geometry: { type: 'Point', coordinates: [lng, lat] },
				properties: {}
			});
		}
		mapInput = { type: GEOJSON_FEATURE_COLLECTION, features };
	}

	// Primary path: GeoJSON FeatureCollection (always sent by both controllers)
	if (mapInput.type === GEOJSON_FEATURE_COLLECTION) {
		const rawFeatures = Array.isArray(mapInput.features) ? mapInput.features : [];
		const validFeatures = rawFeatures.filter((f) => f != null && f.type === 'Feature');
		if (validFeatures.length < rawFeatures.length) {
			warnings.push(
				`[projects-map] normalizeMapInput: dropped ${
					rawFeatures.length - validFeatures.length
				} feature(s) with missing or invalid GeoJSON type`
			);
		}
		const features = new GeoJSON().readFeatures(
			{ ...mapInput, features: validFeatures },
			{ dataProjection: EPSG_4326, featureProjection: EPSG_27700 }
		);
		const allPoints =
			validFeatures.length === 0 || validFeatures.every((f) => f.geometry?.type === 'Point');
		const mode = !allPoints
			? RENDER_MODE_GEOJSON
			: validFeatures.length === 1
			? RENDER_MODE_SINGLE_POINT
			: RENDER_MODE_MULTI_POINT;
		return { features, mode, warnings };
	}

	warnings.push(`[projects-map] normalizeMapInput: unrecognised input: ${typeof mapInput}`);
	return { features: [], mode: RENDER_MODE_SINGLE_POINT, warnings };
}

module.exports = { normalizeMapInput };
