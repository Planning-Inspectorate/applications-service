'use strict';

module.exports = Object.freeze({
	/** EPSG code string for British National Grid. */
	EPSG_27700: 'EPSG:27700',

	/** EPSG code string for WGS84 geographic coordinates. */
	EPSG_4326: 'EPSG:4326',

	/** proj4 definition string for EPSG:27700 (British National Grid). */
	EPSG27700_PROJ4_DEF:
		'+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs',

	/** Valid extent for EPSG:27700 in metres: [minX, minY, maxX, maxY]. */
	EPSG27700_EXTENT: [-238375.0, 0.0, 900000.0, 1376256.0],

	/** Map centre for the UK in EPSG:27700 coordinates. */
	UK_CENTRE_EPSG27700: [366154, 289239],

	/** Default zoom level when no zoom option is provided. */
	DEFAULT_ZOOM: 0,

	/** OS Maps WMTS GetCapabilities endpoint. */
	WMTS_CAPABILITIES_URL:
		'https://api.os.uk/maps/raster/v1/wmts?request=GetCapabilities&service=WMTS',

	/** HTTP Authorization prefix for bearer token requests. */
	BEARER_TOKEN_PREFIX: 'Bearer ',

	/** GeoJSON FeatureCollection type sentinel. */
	GEOJSON_FEATURE_COLLECTION: 'FeatureCollection',

	/** OL property key used by ol/source/Cluster to store constituent features. */
	OL_CLUSTER_FEATURES_KEY: 'features',

	/** OL property key set by ol-ext/SelectCluster on spiderfied link features. */
	OL_SELECT_CLUSTER_LINK_KEY: 'selectclusterlink',

	/** OS Maps WMTS layer identifier for the British National Grid raster tileset. */
	OS_MAPS_LAYER_NAME: 'Outdoor_27700',

	/** Render mode: a single coordinate shown with a pin marker. */
	RENDER_MODE_SINGLE_POINT: 'singlePoint',

	/** Render mode: multiple coordinates shown as an animated cluster. */
	RENDER_MODE_MULTI_POINT: 'multiPoint',

	/** Render mode: a GeoJSON FeatureCollection shown as an animated cluster. */
	RENDER_MODE_GEOJSON: 'geojson',

	/** Minimum OL map zoom level. */
	MIN_ZOOM: 0,

	/** Maximum OL map zoom level. */
	MAX_ZOOM: 9,

	/** Inset padding (px) applied when fitting the view to a feature extent. */
	MAP_FIT_PADDING: [50, 50, 50, 50],

	/** Pixel distance at which nearby features merge into a cluster. */
	CLUSTER_DISTANCE: 40,

	/** Duration (ms) for cluster expand/collapse animations. */
	ANIMATION_DURATION_MS: 300,

	/** Duration (ms) for the popup auto-pan animation. */
	POPUP_ANIMATION_DURATION_MS: 250,

	/** Maximum features laid out in a circle before switching to a spiral. */
	CLUSTER_CIRCLE_MAX_OBJECTS: 10,

	/** Circle radius (px) for a cluster containing a single feature. */
	CLUSTER_SINGLE_RADIUS: 8,

	/** Base radius (px) added to the scaled count for multi-feature clusters. */
	CLUSTER_MULTI_RADIUS_BASE: 12,

	/** Feature count at which the cluster radius stops growing. */
	CLUSTER_MAX_COUNT: 20,

	/** Fill colour for the cluster drop-shadow circle. */
	CLUSTER_SHADOW_COLOUR: 'rgba(0,0,0,0.25)',

	/** Font descriptor for the cluster count label. */
	CLUSTER_COUNT_FONT: 'bold 12px sans-serif',

	/** CSS custom property name for the cluster circle fill colour. */
	CSS_VAR_CLUSTER_BG: '--cluster-bg',

	/** CSS custom property name for the cluster circle stroke/text colour. */
	CSS_VAR_CLUSTER_TEXT: '--cluster-text',

	/** Fallback fill colour when the CSS variable is not set. */
	FALLBACK_CLUSTER_BG: '#d4351c',

	/** Fallback stroke/text colour when the CSS variable is not set. */
	FALLBACK_CLUSTER_TEXT: 'white',

	/** Public path to the map pin marker image used in single-point mode. */
	MAP_MARKER_SRC: '/public/images/ol-map-marker.png',

	/** CSS class toggled on zoom buttons when the map is at min or max zoom. */
	CSS_CLASS_ZOOM_DISABLED: 'no-zoom'
});
