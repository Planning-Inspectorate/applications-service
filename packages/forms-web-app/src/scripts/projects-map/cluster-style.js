'use strict';

const Style = require('ol/style/Style.js').default;
const Circle = require('ol/style/Circle.js').default;
const Fill = require('ol/style/Fill.js').default;
const Stroke = require('ol/style/Stroke.js').default;
const Text = require('ol/style/Text.js').default;
const {
	OL_CLUSTER_FEATURES_KEY,
	CLUSTER_SINGLE_RADIUS,
	CLUSTER_MULTI_RADIUS_BASE,
	CLUSTER_MAX_COUNT,
	CLUSTER_SHADOW_COLOUR,
	CLUSTER_COUNT_FONT
} = require('./constants');

/**
 * Computes an OL `Style` array for a cluster feature.
 *
 * A single feature gets a fixed-radius circle; multiple features get a
 * larger radius and a text label showing the count.
 * Returns `null` for a cluster with 0 features — OL-ext's `SelectCluster`
 * renders those expanded individual features independently.
 *
 * @param {import('ol').Feature} feature Cluster feature from `ol/source/Cluster`
 * @param {string} markerFill  CSS colour for the circle fill
 * @param {string} markerStroke CSS colour for the circle stroke and count label
 * @returns {import('ol/style/Style').default[]|null}
 */
function clusterStyle(feature, markerFill, markerStroke) {
	const features = feature.get(OL_CLUSTER_FEATURES_KEY) || [];
	const count = features.length;
	if (count === 0) return null;

	const isSingle = count === 1;
	const radius = isSingle
		? CLUSTER_SINGLE_RADIUS
		: CLUSTER_MULTI_RADIUS_BASE + Math.min(count, CLUSTER_MAX_COUNT);

	const shadow = new Style({
		image: new Circle({
			radius: radius + 1,
			fill: new Fill({ color: CLUSTER_SHADOW_COLOUR }),
			displacement: [2, -2]
		})
	});

	const marker = new Style({
		image: new Circle({
			radius,
			fill: new Fill({ color: markerFill }),
			stroke: new Stroke({ color: markerStroke, width: 2 })
		}),
		text: isSingle
			? null
			: new Text({
					text: String(count),
					fill: new Fill({ color: markerStroke }),
					font: CLUSTER_COUNT_FONT
			  })
	});

	return [shadow, marker];
}

module.exports = { clusterStyle };
