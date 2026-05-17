'use strict';

const { projectInfoProjectStages } = require('../../utils/project-stages');

/**
 * Builds a GeoJSON FeatureCollection from application records or a coordinate pair.
 *
 * @example
 * // all-projects map (list endpoint — PascalCase shape)
 * new GeoJSONBuilder().addApplications(applications).build()
 *
 * @example
 * // single-project map (single endpoint — camelCase shape)
 * new GeoJSONBuilder().addPoint(applicationData.longLat).build()
 *
 * @example
 * // smart dispatch — detects input type automatically
 * new GeoJSONBuilder().add(input).build()
 */
class GeoJSONBuilder {
	#features = [];

	/**
	 * Adds Point features from an array of application records.
	 * Reads `app.LongLat` (PascalCase) from the list endpoint shape.
	 * Applications with missing or invalid coordinates are silently skipped.
	 *
	 * @param {Object[]} applications
	 * @returns {this}
	 */
	addApplications(applications) {
		for (const app of applications || []) {
			const coords = app.LongLat;
			if (!coords || coords.length < 2 || !coords[0] || !coords[1]) continue;
			const lng = parseFloat(coords[0]);
			const lat = parseFloat(coords[1]);
			if (!isFinite(lng) || !isFinite(lat)) continue;
			this.#features.push({
				type: 'Feature',
				geometry: { type: 'Point', coordinates: [lng, lat] },
				properties: {
					caseReference: app.CaseReference,
					projectName: app.ProjectName,
					stage: projectInfoProjectStages[app.Stage] || app.Stage,
					projectURL: `/projects/${app.CaseReference}`
				}
			});
		}
		return this;
	}

	/**
	 * Adds a single Point feature from a [lng, lat] coordinate pair.
	 * Reads the camelCase `longLat` shape from the single-project endpoint.
	 * Does nothing when coordinates are missing or invalid.
	 *
	 * @param {Array} longLat  [lng, lat] as strings or numbers
	 * @returns {this}
	 */
	addPoint(longLat) {
		const [lng, lat] = longLat || [];
		const parsedLng = parseFloat(lng);
		const parsedLat = parseFloat(lat);
		if (isFinite(parsedLng) && isFinite(parsedLat)) {
			this.#features.push({
				type: 'Feature',
				geometry: { type: 'Point', coordinates: [parsedLng, parsedLat] },
				properties: {}
			});
		}
		return this;
	}

	/**
	 * Detects the input type and delegates to `addApplications` or `addPoint`.
	 * Detection: an array whose first element is an object with a `LongLat` key is
	 * treated as an applications array; anything else is treated as a coordinate pair.
	 *
	 * @param {Object[]|Array} input  applications array or [lng, lat] pair
	 * @returns {this}
	 */
	add(input) {
		if (!Array.isArray(input) || input.length === 0) return this;
		if (input[0] !== null && typeof input[0] === 'object' && 'LongLat' in input[0]) {
			return this.addApplications(input);
		}
		return this.addPoint(input);
	}

	/** @returns {{ type: 'FeatureCollection', features: Object[] }} */
	build() {
		return { type: 'FeatureCollection', features: this.#features };
	}
}

module.exports = { GeoJSONBuilder: GeoJSONBuilder };
