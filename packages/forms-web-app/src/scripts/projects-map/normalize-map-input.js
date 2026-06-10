import GeoJSON from 'ol/format/GeoJSON.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import { transform } from 'ol/proj.js';
import { SOURCE_PROJECTION, TARGET_PROJECTION } from './constants.js';

/**
 * @typedef {'multiPoint' | 'singlePoint' | 'geojson'} RenderMode
 */

/**
 * @typedef {Object} NormalizedMapInput
 * @property {Feature[]} features
 * @property {RenderMode} mode
 */

/**
 * Classifies map input and returns projected OL features with a render mode.
 * @param {object|number[]|null|undefined} input
 * @returns {NormalizedMapInput}
 */
export function normalizeMapInput(input) {
	if (input == null) {
		return { features: [], mode: 'multiPoint' };
	}

	// Single coordinate array [lng, lat]
	if (
		Array.isArray(input) &&
		input.length === 2 &&
		typeof input[0] === 'number' &&
		typeof input[1] === 'number'
	) {
		const coordinate = transform(input, SOURCE_PROJECTION, TARGET_PROJECTION);
		const feature = new Feature(new Point(coordinate));
		return { features: [feature], mode: 'singlePoint' };
	}

	// FeatureCollection
	if (input.type === 'FeatureCollection' && Array.isArray(input.features)) {
		const hasPolygons = input.features.some(
			(f) => f.geometry && (f.geometry.type === 'Polygon' || f.geometry.type === 'MultiPolygon')
		);

		if (hasPolygons) {
			const features = new GeoJSON().readFeatures(input, {
				dataProjection: SOURCE_PROJECTION,
				featureProjection: TARGET_PROJECTION
			});
			return { features, mode: 'geojson' };
		}

		const features = new GeoJSON().readFeatures(input, {
			dataProjection: SOURCE_PROJECTION,
			featureProjection: TARGET_PROJECTION
		});

		if (features.length === 1) {
			return { features, mode: 'singlePoint' };
		}

		return { features, mode: 'multiPoint' };
	}

	// Fallback: unrecognized input
	return { features: [], mode: 'multiPoint' };
}
