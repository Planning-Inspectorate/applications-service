'use strict';

const VectorSource = require('ol/source/Vector.js').default;
const Cluster = require('ol/source/Cluster.js').default;
const VectorLayer = require('ol/layer/Vector.js').default;
let AnimatedCluster;
let SelectCluster;
let renderPopup;

try {
	AnimatedCluster = require('ol-ext/src/layer/AnimatedCluster.js').default;
} catch {
	AnimatedCluster = null;
}

try {
	SelectCluster = require('ol-ext/src/interaction/SelectCluster.js').default;
} catch {
	SelectCluster = null;
}

try {
	({ renderPopup } = require('./popup'));
} catch {
	renderPopup = () => {};
}

const Style = require('ol/style/Style.js').default;
const Circle = require('ol/style/Circle.js').default;
const Fill = require('ol/style/Fill.js').default;
const Stroke = require('ol/style/Stroke.js').default;
const Text = require('ol/style/Text.js').default;
const Icon = require('ol/style/Icon.js').default;
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
	MAX_ZOOM,
	MAP_MARKER_SRC,
	CLUSTER_SINGLE_RADIUS,
	CLUSTER_MULTI_RADIUS_BASE,
	CLUSTER_MAX_COUNT,
	CLUSTER_SHADOW_COLOUR,
	CLUSTER_COUNT_FONT
} = require('./constants');

const cssVar = (name, fallback) =>
	getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

/** @returns {import('ol/style/Style').default[]|null} null for an expanded (empty) cluster */
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

function buildSinglePointLayer(features) {
	return new VectorLayer({
		source: new VectorSource({ features }),
		style: new Style({
			image: new Icon({ anchor: [0.5, 1], src: MAP_MARKER_SRC })
		})
	});
}

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

function buildClusterLayer(map, features, fitStrategy, popup, options = {}) {
	const enableClustering = options.enableClustering ?? true;
	const enablePopup = options.enablePopup ?? true;
	const useClusterLayer = enableClustering && Boolean(AnimatedCluster);
	const usePopup = enablePopup && Boolean(popup);
	const useSelectInteraction = usePopup && useClusterLayer && Boolean(SelectCluster);

	const vectorSource = new VectorSource({ features });
	const clusterSource = useClusterLayer
		? new Cluster({ distance: CLUSTER_DISTANCE, source: vectorSource })
		: null;

	const markerFill = cssVar(CSS_VAR_CLUSTER_BG, FALLBACK_CLUSTER_BG);
	const markerStroke = cssVar(CSS_VAR_CLUSTER_TEXT, FALLBACK_CLUSTER_TEXT);
	const styleWithColours = (feature) => clusterStyle(feature, markerFill, markerStroke);

	const layer = useClusterLayer
		? new AnimatedCluster({
				source: clusterSource,
				animationDuration: ANIMATION_DURATION_MS,
				style: styleWithColours
		  })
		: new VectorLayer({
				source: vectorSource,
				style: new Style({
					image: new Icon({ anchor: [0.5, 1], src: MAP_MARKER_SRC })
				})
		  });

	map.addLayer(layer);
	if (usePopup) {
		map.addOverlay(popup);
	}

	let selectCluster;
	if (useSelectInteraction) {
		selectCluster = new SelectCluster({
			animate: true,
			animationDuration: ANIMATION_DURATION_MS,
			spiral: true,
			circleMaxObjects: CLUSTER_CIRCLE_MAX_OBJECTS,
			style: styleWithColours,
			featureStyle: styleWithColours
		});
		map.addInteraction(selectCluster);
	}

	const renderPopupFromFeature = (feature) => {
		if (!usePopup) return false;
		if (!feature || feature.get(OL_SELECT_CLUSTER_LINK_KEY)) return false;
		const clusterFeatures = feature.get(OL_CLUSTER_FEATURES_KEY);
		if (!clusterFeatures || clusterFeatures.length === 0) return false;
		const coordinate = feature.getGeometry()?.getCoordinates?.();
		if (!coordinate) return false;
		renderPopup(popup, clusterFeatures, coordinate, map);
		return true;
	};

	if (selectCluster) {
		selectCluster.on('select', (e) => {
			if (!e.selected.length) {
				popup.hide();
				return;
			}
			renderPopupFromFeature(e.selected[0]);
		});
	}

	if (usePopup) {
		map.on('click', (e) => {
			const clickedFeature =
				typeof map.forEachFeatureAtPixel === 'function'
					? map.forEachFeatureAtPixel(e.pixel, (feature) => feature)
					: null;
			if (clickedFeature) {
				renderPopupFromFeature(clickedFeature);
				return;
			}
			popup.hide();
		});
		map.getView().on('change:resolution', () => popup.hide());
	}

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

module.exports = {
	buildSinglePointLayer,
	buildGeoJsonLayer,
	buildClusterLayer,
	clusterStyle,
	cssVar
};
