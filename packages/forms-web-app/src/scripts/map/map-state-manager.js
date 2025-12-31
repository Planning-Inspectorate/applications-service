/**
 * Map State Manager
 *
 * Centralized store for Leaflet map instance.
 * Replaces global window.leafletMapInstance with a proper module-based state manager.
 *
 * Usage:
 *   const mapStateManager = require('./map-state-manager');
 *   mapStateManager.setMap(leafletMapInstance);
 *   const map = mapStateManager.getMap();
 */

let mapInstance = null;

module.exports = {
	/**
	 * Store map instance
	 *
	 * @param {L.Map} map - Leaflet map instance
	 * @throws {Error} If map is not a valid Leaflet map object
	 */
	setMap(map) {
		if (map && typeof map.getZoom === 'function') {
			mapInstance = map;
		} else {
			throw new Error('Invalid Leaflet map instance provided to mapStateManager');
		}
	},

	/**
	 * Retrieve map instance
	 *
	 * @returns {L.Map|null} Leaflet map instance or null if not initialized
	 */
	getMap() {
		return mapInstance;
	},

	/**
	 * Check if map is initialized
	 *
	 * @returns {boolean} True if map instance is set
	 */
	hasMap() {
		return mapInstance !== null;
	},

	/**
	 * Clear map instance (for cleanup/testing)
	 */
	clearMap() {
		mapInstance = null;
	}
};
