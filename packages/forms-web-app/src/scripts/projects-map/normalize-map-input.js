'use strict';

const GeoJSON = require('ol/format/GeoJSON.js').default;
const Feature = require('ol/Feature.js').default;
const Point = require('ol/geom/Point.js').default;
const { transform } = require('ol/proj.js');
const {
	EPSG_27700,
	EPSG_4326,
	GEOJSON_FEATURE_COLLECTION,
	RENDER_MODE_SINGLE_POINT,
	RENDER_MODE_MULTI_POINT,
	RENDER_MODE_GEOJSON
} = require('./constants');

/**
 * Normalises any supported map input into OL features and a render mode.
 *
 * Accepts a GeoJSON FeatureCollection, a single `[lng, lat]` coordinate, or an
 * array of `[lng, lat]` pairs.
 *
 * @param {Object|Array} mapInput  GeoJSON FeatureCollection | [lng,lat] | [[lng,lat],...]
 * @returns {{ features: Array, mode: 'singlePoint'|'multiPoint'|'geojson', warnings: string[] }}
 */
function normalizeMapInput(mapInput) {
	// Warnings are collected and returned rather than logged here.
	// This module is CJS and has no access to window.appLogger — it runs in both
	// the browser bundle and Jest (Node.js). Returning warnings keeps the function
	// pure and side-effect-free so callers can decide how (and whether) to surface them.
	const warnings = [];

	if (!mapInput) {
		warnings.push('[projects-map] normalizeMapInput: received null/undefined input');
		return { features: [], mode: RENDER_MODE_SINGLE_POINT, warnings };
	}

	// GeoJSON FeatureCollection
	if (
		!Array.isArray(mapInput) &&
		typeof mapInput === 'object' &&
		mapInput.type === GEOJSON_FEATURE_COLLECTION
	) {
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

	// Array input: single [lng, lat] or array of [lng, lat] pairs
	if (Array.isArray(mapInput)) {
		const lng0 = parseFloat(mapInput[0]);
		const lat0 = parseFloat(mapInput[1]);
		if (mapInput.length === 2 && isFinite(lng0) && isFinite(lat0)) {
			const coords = transform([lng0, lat0], EPSG_4326, EPSG_27700);
			return {
				features: [new Feature({ geometry: new Point(coords) })],
				mode: RENDER_MODE_SINGLE_POINT,
				warnings
			};
		}

		const features = [];
		for (const point of mapInput) {
			const lng = parseFloat(point?.[0]);
			const lat = parseFloat(point?.[1]);
			if (!Array.isArray(point) || !isFinite(lng) || !isFinite(lat)) {
				warnings.push(
					`[projects-map] normalizeMapInput: skipping invalid point: ${JSON.stringify(point)}`
				);
				continue;
			}
			const coords = transform([lng, lat], EPSG_4326, EPSG_27700);
			features.push(new Feature({ geometry: new Point(coords) }));
		}
		return {
			features,
			mode: features.length === 1 ? RENDER_MODE_SINGLE_POINT : RENDER_MODE_MULTI_POINT,
			warnings
		};
	}

	warnings.push(`[projects-map] normalizeMapInput: unrecognised input: ${typeof mapInput}`);
	return { features: [], mode: RENDER_MODE_SINGLE_POINT, warnings };
}

module.exports = { normalizeMapInput };
