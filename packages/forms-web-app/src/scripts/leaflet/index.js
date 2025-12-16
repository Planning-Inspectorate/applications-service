import L from 'leaflet';
import 'proj4leaflet';
import { MAP_CONFIG, MAP_STYLES } from './map-config.js';
import { createTileLayer } from './tile-layer.js';
import { loadProjectMarkers } from './geojson-loader.js';

// Fix Leaflet default icon paths
L.Icon.Default.mergeOptions({
	iconRetinaUrl: '/public/images/leaflet/marker-icon-2x.png',
	iconUrl: '/public/images/leaflet/marker-icon.png',
	shadowUrl: '/public/images/leaflet/marker-shadow.png'
});

/** @typedef {string|HTMLElement} MapContainer - Map container element or ID */

/**
 * Leaflet map factory for OS Maps integration
 */
function leafletMap() {
	/**
	 * Initializes a Leaflet map with OS Maps tiles and project markers
	 * @param {string} token - OAuth token for OS Maps API
	 * @param {MapContainer} container - Map container element or ID
	 * @param {number} lat - Initial latitude
	 * @param {number} lng - Initial longitude
	 * @param {number} zoom - Initial zoom level
	 * @returns {L.Map} Configured Leaflet map
	 */
	this.initiate = function (
		token,
		container,
		lat = MAP_CONFIG.DEFAULT_LAT,
		lng = MAP_CONFIG.DEFAULT_LNG,
		zoom = MAP_CONFIG.DEFAULT_ZOOM
	) {
		/** @type {L.Proj.CRS} */
		const crs27700 = new L.Proj.CRS('EPSG:27700', MAP_CONFIG.CRS_PROJ, {
			resolutions: MAP_CONFIG.RESOLUTIONS,
			origin: MAP_CONFIG.ORIGIN
		});

		/** @type {Object} */
		const mapOptions = {
			minZoom: 0,
			maxZoom: MAP_CONFIG.RESOLUTIONS.length - 1,
			center: [lat, lng],
			zoom: zoom,
			crs: crs27700,
			maxBounds: MAP_CONFIG.MAX_BOUNDS,
			attributionControl: false,
			zoomSnap: 1,
			zoomDelta: 1
		};

		/** @type {L.Map} */
		const map = L.map(container, mapOptions);

		// Add tile layer
		createTileLayer(token, MAP_STYLES[MAP_CONFIG.DEFAULT_STYLE]).addTo(map);

		// Load project markers
		loadProjectMarkers(map);

		return map;
	};
}

export default leafletMap;
