import Map from 'ol/Map.js';
import View from 'ol/View.js';
import VectorSource from 'ol/source/Vector.js';
import Cluster from 'ol/source/Cluster.js';
import Style from 'ol/style/Style.js';
import Fill from 'ol/style/Fill.js';
import Stroke from 'ol/style/Stroke.js';
import VectorLayer from 'ol/layer/Vector.js';
import Icon from 'ol/style/Icon.js';
import AnimatedCluster from 'ol-ext/src/layer/AnimatedCluster.js';
import SelectCluster from 'ol-ext/src/interaction/SelectCluster.js';
import { getMapWMTS } from './get-map-wmts.js';
import { getControls } from './get-controls.js';
import { setupEpsg27700 } from './setup-epsg27700.js';
import { buildTileLayer } from './build-tile-layer.js';
import { clusterStyle } from './cluster-style.js';
import { buildPopup, renderPopup } from './popup.js';
import { normalizeMapInput } from './normalize-map-input.js';
import {
	EPSG_27700,
	UK_CENTRE_EPSG27700,
	DEFAULT_ZOOM,
	RENDER_MODE_SINGLE_POINT,
	RENDER_MODE_GEOJSON,
	OL_CLUSTER_FEATURES_KEY,
	OL_SELECT_CLUSTER_LINK_KEY,
	MIN_ZOOM,
	MAX_ZOOM,
	MAP_FIT_PADDING,
	CLUSTER_DISTANCE,
	ANIMATION_DURATION_MS,
	CLUSTER_CIRCLE_MAX_OBJECTS,
	CSS_VAR_CLUSTER_BG,
	CSS_VAR_CLUSTER_TEXT,
	FALLBACK_CLUSTER_BG,
	FALLBACK_CLUSTER_TEXT,
	MAP_MARKER_SRC,
	CSS_CLASS_ZOOM_DISABLED
} from './constants.js';

const logger = window.appLogger || { debug: () => {}, error: console.error };

/**
 * Reads a CSS custom property from the document root.
 * @param {string} name CSS variable name (e.g. `'--cluster-bg'`)
 * @param {string} fallback Value to use when the property is not set
 * @returns {string}
 */
const cssVar = (name, fallback) =>
	getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

function projectsMap() {
	/**
	 * Reads all map configuration from an element's dataset and calls `initiate`.
	 * Expects the element to have: data-token, data-geojson, and optionally data-zoom.
	 * @param {string} elementId
	 */
	this.initiateFromElement = (el) => {
		if (!el) {
			logger.error('[projects-map] initiateFromElement: element not found');
			return;
		}
		const { token, geojson, longlat, zoom } = el.dataset;
		if (!token) {
			logger.error('[projects-map] initiateFromElement: missing data-token on #' + el.id);
			return;
		}
		let parsedGeojson = null;
		if (geojson && geojson !== 'null') {
			try {
				parsedGeojson = JSON.parse(geojson);
			} catch {
				logger.error('[projects-map] initiateFromElement: malformed data-geojson on #' + el.id);
			}
		}
		const coords = longlat ? longlat.split(',').map(Number) : null;
		const parsedLonglat = coords && coords.every(isFinite) ? coords : null;
		const mapInput = parsedGeojson || parsedLonglat;
		const options = { zoom: zoom !== undefined ? Number(zoom) : undefined };
		return this.initiate(token, el.id, mapInput, options);
	};

	/**
	 * Initialises the map on the given DOM element.
	 *
	 * Accepts a GeoJSON FeatureCollection, a single `[lng, lat]` coordinate, or an array
	 * of `[lng, lat]` pairs. The render mode (single-point icon vs animated cluster) is
	 * chosen automatically from the detected input shape.
	 *
	 * @param {string} accessToken OS Maps bearer token
	 * @param {string} target DOM element id that will contain the map
	 * @param {Object|number[]} mapInput GeoJSON FeatureCollection | [lng,lat] | [[lng,lat],...]
	 * @param {{ zoom?: number, fitStrategy?: 'auto'|'fitAll'|'centerOnly' }} [options]
	 */
	this.initiate = async (accessToken, target, mapInput, options = {}) => {
		try {
			const wmtsXml = await getMapWMTS(accessToken);
			const epsg27700 = setupEpsg27700();
			const { tileLayer, wmtsOptions } = buildTileLayer(accessToken, wmtsXml);

			const { features, mode, warnings } = normalizeMapInput(mapInput);
			// normalizeMapInput returns warnings rather than logging them directly
			// because it has no access to window.appLogger (it's a CJS module used in
			// both the browser bundle and Jest). We log them here where the logger is available.
			warnings.forEach((w) => logger.error(w));

			const fitStrategy = options.fitStrategy ?? 'centerOnly';
			const initialCenter =
				mode === RENDER_MODE_SINGLE_POINT && features.length > 0
					? features[0].getGeometry().getCoordinates()
					: UK_CENTRE_EPSG27700;
			const initialZoom = options.zoom ?? DEFAULT_ZOOM;

			const map = new Map({
				controls: getControls(),
				target,
				layers: [tileLayer],
				overlays: [],
				view: new View({
					projection: EPSG_27700,
					extent: epsg27700.getExtent(),
					smoothResolutionConstraint: false,
					resolutions: wmtsOptions.tileGrid.getResolutions(),
					center: initialCenter,
					minZoom: MIN_ZOOM,
					maxZoom: MAX_ZOOM,
					zoom: initialZoom
				})
			});

			if (mode === RENDER_MODE_SINGLE_POINT) {
				map.addLayer(
					new VectorLayer({
						source: new VectorSource({ features }),
						style: new Style({
							image: new Icon({ anchor: [0.5, 1], src: MAP_MARKER_SRC })
						})
					})
				);
			} else if (mode === RENDER_MODE_GEOJSON) {
				const boundarySource = new VectorSource({ features });
				map.addLayer(
					new VectorLayer({
						source: boundarySource,
						style: new Style({
							fill: new Fill({ color: 'rgba(0, 112, 184, 0.15)' }),
							stroke: new Stroke({ color: '#0070B8', width: 2 })
						})
					})
				);
				map.once('rendercomplete', () => {
					const extent = boundarySource.getExtent();
					if (extent.every(isFinite)) {
						map.getView().fit(extent, { padding: MAP_FIT_PADDING, maxZoom: MAX_ZOOM });
					}
				});
			} else {
				const vectorSource = new VectorSource({ features });
				const clusterSource = new Cluster({ distance: CLUSTER_DISTANCE, source: vectorSource });

				const MARKER_FILL = cssVar(CSS_VAR_CLUSTER_BG, FALLBACK_CLUSTER_BG);
				const MARKER_STROKE = cssVar(CSS_VAR_CLUSTER_TEXT, FALLBACK_CLUSTER_TEXT);
				const styleWithColours = (feature) => clusterStyle(feature, MARKER_FILL, MARKER_STROKE);

				map.addLayer(
					new AnimatedCluster({
						source: clusterSource,
						animationDuration: ANIMATION_DURATION_MS,
						style: styleWithColours
					})
				);

				const popup = buildPopup();
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
			}

			map.on('pointermove', (e) => {
				map.getTargetElement().style.cursor = map.hasFeatureAtPixel(e.pixel) ? 'pointer' : '';
			});

			const updateZoomButtons = () => {
				const view = map.getView();
				const zoom = view.getZoom();
				const el = map.getTargetElement();
				el.querySelector('.ol-zoom-in')?.classList.toggle(
					CSS_CLASS_ZOOM_DISABLED,
					zoom >= view.getMaxZoom()
				);
				el.querySelector('.ol-zoom-out')?.classList.toggle(
					CSS_CLASS_ZOOM_DISABLED,
					zoom <= view.getMinZoom()
				);
			};
			map.getView().on('change:resolution', updateZoomButtons);
			map.once('rendercomplete', updateZoomButtons);
		} catch (error) {
			logger.error('[projects-map] initiate failed:', error);
		}
	};
}

export default projectsMap;
