'use strict';

const VectorSource = require('ol/source/Vector.js').default;
const Cluster = require('ol/source/Cluster.js').default;
const AnimatedCluster = require('ol-ext/src/layer/AnimatedCluster.js').default;
const SelectCluster = require('ol-ext/src/interaction/SelectCluster.js').default;
const { clusterStyle } = require('./cluster-style');
const { renderPopup } = require('./popup');
const { cssVar } = require('./utils');
const {
	CLUSTER_DISTANCE,
	ANIMATION_DURATION_MS,
	CLUSTER_CIRCLE_MAX_OBJECTS,
	CSS_VAR_CLUSTER_BG,
	CSS_VAR_CLUSTER_TEXT,
	FALLBACK_CLUSTER_BG,
	FALLBACK_CLUSTER_TEXT,
	OL_CLUSTER_FEATURES_KEY,
	OL_SELECT_CLUSTER_LINK_KEY,
	MAP_FIT_PADDING,
	MAX_ZOOM
} = require('./constants');

/**
 * Configures the map for multi-point cluster mode.
 *
 * Builds the `AnimatedCluster` layer and the `SelectCluster` interaction.
 * Sets up the required click, select, and map pan/zoom event handlers
 * for the popup overlay. Handles the `auto` or `fitAll` map fit strategies.
 *
 * @param {import('ol/Map').default} map OL Map instance
 * @param {import('ol').Feature[]} features OL point features
 * @param {string} fitStrategy User-specified bounding-box fit strategy
 * @param {import('ol-ext/src/overlay/Popup').default} popup OL-ext popup instance
 * @returns {import('ol-ext/src/layer/AnimatedCluster').default}
 */
function buildClusterLayer(map, features, fitStrategy, popup) {
	const vectorSource = new VectorSource({ features });
	const clusterSource = new Cluster({ distance: CLUSTER_DISTANCE, source: vectorSource });

	const MARKER_FILL = cssVar(CSS_VAR_CLUSTER_BG, FALLBACK_CLUSTER_BG);
	const MARKER_STROKE = cssVar(CSS_VAR_CLUSTER_TEXT, FALLBACK_CLUSTER_TEXT);
	const styleWithColours = (feature) => clusterStyle(feature, MARKER_FILL, MARKER_STROKE);

	const layer = new AnimatedCluster({
		source: clusterSource,
		animationDuration: ANIMATION_DURATION_MS,
		style: styleWithColours
	});

	map.addLayer(layer);
	map.addOverlay(popup);

	const selectCluster = new SelectCluster({
		animate: true,
		animationDuration: ANIMATION_DURATION_MS,
		spiral: true,
		circleMaxObjects: CLUSTER_CIRCLE_MAX_OBJECTS,
		style: styleWithColours,
		featureStyle: styleWithColours
	});
	map.addInteraction(selectCluster);

	selectCluster.on('select', (e) => {
		if (!e.selected.length) {
			popup.hide();
			return;
		}
		const feature = e.selected[0];
		if (feature.get(OL_SELECT_CLUSTER_LINK_KEY)) return;
		const clusterFeatures = feature.get(OL_CLUSTER_FEATURES_KEY);
		if (!clusterFeatures || clusterFeatures.length === 0) return;
		renderPopup(popup, clusterFeatures, feature.getGeometry().getCoordinates());
	});

	map.on('click', (e) => {
		if (!map.hasFeatureAtPixel(e.pixel)) popup.hide();
	});
	map.getView().on('change:resolution', () => popup.hide());

	if ((fitStrategy === 'auto' || fitStrategy === 'fitAll') && features.length > 0) {
		map.once('rendercomplete', () => {
			const extent = vectorSource.getExtent();
			if (extent.every(isFinite)) {
				map.getView().fit(extent, { padding: MAP_FIT_PADDING, maxZoom: MAX_ZOOM });
			}
		});
	}

	return layer;
}

module.exports = { buildClusterLayer };
