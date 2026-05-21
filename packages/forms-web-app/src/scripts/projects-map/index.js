import Map from 'ol/Map.js';
import View from 'ol/View.js';

import { getMapWMTS } from './get-map-wmts.js';
import { getControls, updateZoomButtons } from './get-controls.js';
import { setupEpsg27700 } from './setup-epsg27700.js';
import { buildTileLayer } from './build-tile-layer.js';
import { buildPopup } from './popup.js';
import { normalizeMapInput } from './normalize-map-input.js';
import { buildSinglePointLayer, buildGeoJsonLayer, buildClusterLayer } from './layers.js';
import {
	EPSG_27700,
	UK_CENTRE_EPSG27700,
	DEFAULT_ZOOM,
	RENDER_MODE_SINGLE_POINT,
	RENDER_MODE_GEOJSON,
	MIN_ZOOM,
	MAX_ZOOM
} from './constants.js';

const logger = window.appLogger || { debug: () => {}, error: console.error };

function projectsMap() {
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
	 * @param {{ zoom?: number, fitStrategy?: 'auto'|'fitAll'|'centerOnly', enableClustering?: boolean, enablePopup?: boolean }} [options]
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
			const enableClustering = options.enableClustering ?? true;
			const enablePopup = options.enablePopup ?? true;
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
				map.addLayer(buildSinglePointLayer(features));
			} else if (mode === RENDER_MODE_GEOJSON) {
				map.addLayer(buildGeoJsonLayer(map, features));
			} else {
				const popup = enablePopup ? buildPopup() : null;
				buildClusterLayer(map, features, fitStrategy, popup, {
					enableClustering,
					enablePopup
				});
			}

			map.on('pointermove', (e) => {
				map.getTargetElement().style.cursor = map.hasFeatureAtPixel(e.pixel) ? 'pointer' : '';
			});

			const handleZoom = () => updateZoomButtons(map);
			map.getView().on('change:resolution', handleZoom);
			map.once('rendercomplete', handleZoom);
		} catch (error) {
			logger.error('[projects-map] initiate failed:', error);
		}
	};
}

export default projectsMap;
