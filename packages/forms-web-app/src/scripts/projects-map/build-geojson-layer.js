'use strict';

const VectorSource = require('ol/source/Vector.js').default;
const VectorLayer = require('ol/layer/Vector.js').default;
const Style = require('ol/style/Style.js').default;
const Fill = require('ol/style/Fill.js').default;
const Stroke = require('ol/style/Stroke.js').default;
const { MAP_FIT_PADDING, MAX_ZOOM } = require('./constants');

/**
 * Builds an OL `VectorLayer` for GeoJSON mode (polygon fill + stroke).
 *
 * Also wires a one-time `rendercomplete` handler that fits the map view to the
 * full extent of the boundary features once they have been rendered.
 *
 * @param {import('ol/Map').default} map OL Map instance
 * @param {import('ol').Feature[]} features OL features parsed from the GeoJSON input
 * @returns {import('ol/layer/Vector').default}
 */
function buildGeoJsonLayer(map, features) {
	const boundarySource = new VectorSource({ features });

	const layer = new VectorLayer({
		source: boundarySource,
		style: new Style({
			fill: new Fill({ color: 'rgba(0, 112, 184, 0.15)' }),
			stroke: new Stroke({ color: '#0070B8', width: 2 })
		})
	});

	map.once('rendercomplete', () => {
		const extent = boundarySource.getExtent();
		if (extent.every(isFinite)) {
			map.getView().fit(extent, { padding: MAP_FIT_PADDING, maxZoom: MAX_ZOOM });
		}
	});

	return layer;
}

module.exports = { buildGeoJsonLayer };
