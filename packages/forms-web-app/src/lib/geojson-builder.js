'use strict';

/** Maps numeric DB Stage value to display label. Mirrors NI_MAPPING.stage in application.mapper.js. */
const STAGE_LABELS = {
	0: 'Draft',
	1: 'Pre-application',
	2: 'Acceptance',
	3: 'Pre-examination',
	4: 'Examination',
	5: 'Recommendation',
	6: 'Decision',
	7: 'Post-decision',
	8: 'Withdrawn'
};

/**
 * Validates that a coordinate is a valid [lng, lat] pair.
 * @param {*} coordinate
 * @returns {boolean}
 */
function isValidCoordinate(coordinate) {
	if (!Array.isArray(coordinate) || coordinate.length < 2) return false;
	const lng = parseFloat(coordinate[0]);
	const lat = parseFloat(coordinate[1]);
	return !isNaN(lng) && !isNaN(lat);
}

/**
 * Server-side utility for constructing GeoJSON FeatureCollections from application records
 * or coordinate pairs. Produces Point-only output — does NOT handle boundary polygon merging.
 */
class GeoJSONBuilder {
	#features = [];

	/**
	 * Adds application records as Point features.
	 * Records with missing/invalid LongLat are silently excluded.
	 * @param {Object[]} applications
	 * @returns {GeoJSONBuilder} for chaining
	 */
	addApplications(applications) {
		for (const app of applications) {
			const coords = app.LongLat;
			if (!isValidCoordinate(coords)) continue;

			const lng = parseFloat(coords[0]);
			const lat = parseFloat(coords[1]);

			this.#features.push({
				type: 'Feature',
				geometry: { type: 'Point', coordinates: [lng, lat] },
				properties: {
					caseReference: app.CaseReference,
					projectName: app.ProjectName,
					stage: STAGE_LABELS[app.Stage] || app.Stage,
					projectURL: `/projects/${app.CaseReference}`
				}
			});
		}
		return this;
	}

	/**
	 * Adds a single [lng, lat] coordinate as a Point feature.
	 * Invalid coordinates are silently skipped.
	 * @param {number[]} coordinate
	 * @param {Object} [properties={}]
	 * @returns {GeoJSONBuilder} for chaining
	 */
	addPoint(coordinate, properties = {}) {
		if (!isValidCoordinate(coordinate)) return this;

		const lng = parseFloat(coordinate[0]);
		const lat = parseFloat(coordinate[1]);

		this.#features.push({
			type: 'Feature',
			geometry: { type: 'Point', coordinates: [lng, lat] },
			properties
		});
		return this;
	}

	/**
	 * Returns the constructed GeoJSON FeatureCollection (Point features only).
	 * @returns {{ type: 'FeatureCollection', features: Object[] }}
	 */
	build() {
		return {
			type: 'FeatureCollection',
			features: this.#features
		};
	}
}

module.exports = { GeoJSONBuilder };
