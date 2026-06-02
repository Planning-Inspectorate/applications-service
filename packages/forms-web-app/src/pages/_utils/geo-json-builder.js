'use strict';

const { projectInfoProjectStages } = require('../../utils/project-stages');

/** Builds a GeoJSON FeatureCollection from application records or a coordinate pair. */
class GeoJSONBuilder {
	#features = [];

	/** @param {Object[]} applications list-endpoint shape (PascalCase: `LongLat`, `CaseReference`, etc.) */
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

	/** @param {Array} longLat [lng, lat] as strings or numbers */
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

	/** @param {Object[]|Array} input applications array or [lng, lat] pair */
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
