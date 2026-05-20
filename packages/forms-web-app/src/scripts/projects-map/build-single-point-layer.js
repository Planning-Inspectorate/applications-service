'use strict';

const VectorSource = require('ol/source/Vector.js').default;
const VectorLayer = require('ol/layer/Vector.js').default;
const Style = require('ol/style/Style.js').default;
const Icon = require('ol/style/Icon.js').default;
const { MAP_MARKER_SRC } = require('./constants');

/**
 * Builds an OL `VectorLayer` for single-point mode.
 *
 * Renders the supplied feature with a pin-marker icon anchored at the
 * bottom-centre of the image.
 *
 * @param {import('ol').Feature[]} features OL features (typically one point feature)
 * @returns {import('ol/layer/Vector').default}
 */
function buildSinglePointLayer(features) {
	return new VectorLayer({
		source: new VectorSource({ features }),
		style: new Style({
			image: new Icon({ anchor: [0.5, 1], src: MAP_MARKER_SRC })
		})
	});
}

module.exports = { buildSinglePointLayer };
