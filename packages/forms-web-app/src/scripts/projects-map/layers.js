import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Cluster from 'ol/source/Cluster.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import Style from 'ol/style/Style.js';
import Circle from 'ol/style/Circle.js';
import Fill from 'ol/style/Fill.js';
import Stroke from 'ol/style/Stroke.js';
import Text from 'ol/style/Text.js';
import Icon from 'ol/style/Icon.js';
import AnimatedCluster from 'ol-ext/src/layer/AnimatedCluster.js';
import {
	CLUSTER_DISTANCE,
	ANIMATION_DURATION,
	BOUNDARY_STROKE_COLOUR,
	BOUNDARY_FILL_COLOUR,
	BOUNDARY_STROKE_WIDTH,
	CSS_VAR_CLUSTER_BG,
	CSS_VAR_CLUSTER_TEXT,
	DEFAULT_CLUSTER_BG,
	DEFAULT_CLUSTER_TEXT,
	MARKER_ICON_URL
} from './constants.js';

/** @param {string} name @param {string} fallback @returns {string} */
const cssVar = (name, fallback) =>
	getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

/** Returns cluster style array. Null for count=0 (SelectCluster handles those). */
function clusterStyle(feature) {
	const MARKER_FILL = cssVar(CSS_VAR_CLUSTER_BG, DEFAULT_CLUSTER_BG);
	const MARKER_STROKE = cssVar(CSS_VAR_CLUSTER_TEXT, DEFAULT_CLUSTER_TEXT);

	const features = feature.get('features') || [];
	const count = features.length;
	if (count === 0) return null;
	const isSingle = count === 1;
	const radius = isSingle ? 8 : 12 + Math.min(count, 20);

	const shadow = new Style({
		image: new Circle({
			radius: radius + 1,
			fill: new Fill({ color: 'rgba(0,0,0,0.25)' }),
			displacement: [2, -2]
		})
	});

	const marker = new Style({
		image: new Circle({
			radius,
			fill: new Fill({ color: MARKER_FILL }),
			stroke: new Stroke({ color: MARKER_STROKE, width: 2 })
		}),
		text: isSingle
			? null
			: new Text({
					text: String(count),
					fill: new Fill({ color: MARKER_STROKE }),
					font: 'bold 12px sans-serif'
			  })
	});

	return [shadow, marker];
}

/** Builds an AnimatedCluster layer from a vector source. */
export function buildClusterLayer(source) {
	const clusterSource = new Cluster({
		distance: CLUSTER_DISTANCE,
		source
	});

	const clusterLayer = new AnimatedCluster({
		source: clusterSource,
		animationDuration: ANIMATION_DURATION,
		style: clusterStyle
	});

	return { clusterLayer, clusterSource };
}

/** Builds a boundary polygon layer styled with red stroke/fill. */
export function buildBoundaryLayer(features) {
	const boundarySource = new VectorSource({ features });

	return new VectorLayer({
		source: boundarySource,
		style: new Style({
			stroke: new Stroke({
				color: BOUNDARY_STROKE_COLOUR,
				width: BOUNDARY_STROKE_WIDTH
			}),
			fill: new Fill({
				color: BOUNDARY_FILL_COLOUR
			})
		})
	});
}

/** Builds a single-point marker layer at the given coordinate. */
export function buildMarkerLayer(coordinateEpsg27700) {
	const markerFeature = new Feature(new Point(coordinateEpsg27700));
	const markerSource = new VectorSource({ features: [markerFeature] });

	return new VectorLayer({
		source: markerSource,
		style: new Style({
			image: new Icon({
				anchor: [0.5, 1],
				src: MARKER_ICON_URL
			})
		})
	});
}
