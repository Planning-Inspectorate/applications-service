/**
 * Map State Manager
 *
 * Centralized state management for OpenLayers map:
 * - Map instance lifecycle management
 * - View state (center, zoom, rotation)
 * - Popup state tracking
 * - Container resize handling with smooth animations
 *
 * Usage:
 *   const manager = require('./map-state-manager');
 *   manager.setMap(olMap);
 *   manager.updateViewState(center, zoom);
 *   manager.togglePopup(feature);
 *   manager.handleContainerResize(element);
 */

let mapInstance = null;
let viewState = {
	center: null,
	zoom: 5,
	rotation: 0
};
let popupState = {
	visible: false,
	feature: null,
	coordinate: null
};

const RESIZE_TRANSITION_MS = 350;

/**
 * Validates and stores OpenLayers Map instance
 * @param {ol.Map} map - OpenLayers map instance
 * @throws {Error} If map is not a valid OpenLayers instance
 */
function setMap(map) {
	if (!map || typeof map.getView !== 'function' || typeof map.getSize !== 'function') {
		throw new Error('Invalid OpenLayers Map instance provided');
	}
	mapInstance = map;
	captureViewState();
}

/**
 * Returns the current OpenLayers Map instance
 * @returns {ol.Map|null} Map instance or null if not initialized
 */
function getMap() {
	return mapInstance;
}

/**
 * Checks if map is initialized
 * @returns {boolean}
 */
function hasMap() {
	return mapInstance !== null;
}

/**
 * Clears map reference (teardown/testing)
 * @returns {void}
 */
function clearMap() {
	mapInstance = null;
	viewState = { center: null, zoom: 5, rotation: 0 };
	popupState = { visible: false, feature: null, coordinate: null };
}

/**
 * Captures current map view state (center, zoom, rotation)
 * @returns {Object} View state object
 */
function captureViewState() {
	if (!mapInstance) return viewState;

	const view = mapInstance.getView();
	if (!view) return viewState;

	viewState = {
		center: view.getCenter(),
		zoom: view.getZoom(),
		rotation: view.getRotation()
	};

	return { ...viewState };
}

/**
 * Gets current view state
 * @returns {Object} {center, zoom, rotation}
 */
function getViewState() {
	return { ...viewState };
}

/**
 * Updates map view state with smooth animation
 * @param {Array<number>} [center] - [x, y] coordinates
 * @param {number} [zoom] - zoom level
 * @param {number} [rotation] - rotation in radians (0-2π)
 * @param {Object} [options] - animation options {duration: ms, easing: fn}
 */
function updateViewState(center, zoom, rotation, options = {}) {
	if (!mapInstance) return;

	const view = mapInstance.getView();
	const {
		duration = 500,
		easing = null // Will use default OpenLayers easing
	} = options;

	const animationOptions = { duration };
	if (easing) {
		animationOptions.easing = easing;
	}

	if (center) {
		view.animate({ center, ...animationOptions });
		viewState.center = center;
	}

	if (zoom !== undefined) {
		view.animate({ zoom, ...animationOptions });
		viewState.zoom = zoom;
	}

	if (rotation !== undefined) {
		view.animate({ rotation, ...animationOptions });
		viewState.rotation = rotation;
	}
}

/**
 * Restores previously captured view state
 * @param {Object} [state] - State to restore (defaults to saved state)
 * @param {Object} [options] - Animation options
 */
function restoreViewState(state = viewState, options = {}) {
	if (!mapInstance || !state) return;

	const { center, zoom, rotation } = state;
	updateViewState(center, zoom, rotation, options);
}

/**
 * Updates popup state
 * @param {boolean} visible - Is popup visible
 * @param {ol.Feature} [feature] - Feature associated with popup
 * @param {Array<number>} [coordinate] - Map coordinate
 */
function setPopupState(visible, feature = null, coordinate = null) {
	popupState = {
		visible,
		feature,
		coordinate
	};
}

/**
 * Gets current popup state
 * @returns {Object} {visible, feature, coordinate}
 */
function getPopupState() {
	return { ...popupState };
}

/**
 * Toggles popup visibility
 * @param {ol.Feature} feature - Feature to show in popup
 * @param {Array<number>} coordinate - Popup position
 */
function togglePopup(feature, coordinate) {
	if (popupState.visible && popupState.feature === feature) {
		// Close if clicking same feature
		setPopupState(false);
	} else {
		// Open for this feature
		setPopupState(true, feature, coordinate);
	}
}

/**
 * Closes popup
 */
function closePopup() {
	setPopupState(false);
}

/**
 * Handles map container resize with smooth transition
 * Recalculates map size after CSS transitions complete
 * @param {HTMLElement} element - Container element with transition
 * @param {Object} [options] - {restoreCenter: boolean, margin: number}
 */
function handleContainerResize(element, options = {}) {
	if (!mapInstance) {
		throw new Error('Map not initialized. Call setMap() first.');
	}

	const { restoreCenter = false, margin = 0 } = options;

	// Save current center if requested
	const savedCenter = restoreCenter ? captureViewState().center : null;

	let handled = false;

	const onResizeComplete = () => {
		if (handled) return;
		handled = true;

		element.removeEventListener('transitionend', onResizeComplete);
		clearTimeout(timeoutId);

		// Recalculate map size after transition
		mapInstance.updateSize();

		// Restore center if requested
		if (savedCenter && margin > 0) {
			updateViewState(savedCenter, undefined, undefined, {
				duration: 300
			});
		}
	};

	// Set timeout as fallback (in case transitionend doesn't fire)
	const timeoutId = setTimeout(onResizeComplete, RESIZE_TRANSITION_MS);

	// Listen for transition completion
	element.addEventListener('transitionend', onResizeComplete, { once: true });
}

/**
 * Gets map extent (bounding box)
 * @returns {Array<number>} [minX, minY, maxX, maxY] or null
 */
function getExtent() {
	if (!mapInstance) return null;

	const view = mapInstance.getView();
	const extent = view.calculateExtent(mapInstance.getSize());
	return extent;
}

/**
 * Fits map to extent with animation
 * @param {Array<number>} extent - [minX, minY, maxX, maxY]
 * @param {Object} [options] - {padding: [top, right, bottom, left], duration: ms}
 */
function fitToExtent(extent, options = {}) {
	if (!mapInstance) return;

	const view = mapInstance.getView();
	const { padding = [0, 0, 0, 0], duration = 500 } = options;

	view.fit(extent, {
		padding,
		duration,
		maxZoom: 15 // Prevent over-zooming
	});
}

/**
 * Gets visible layers
 * @returns {Array<ol.layer.Layer>} Array of visible layers
 */
function getVisibleLayers() {
	if (!mapInstance) return [];

	return mapInstance
		.getLayers()
		.getArray()
		.filter((layer) => layer.getVisible());
}

/**
 * Sets layer visibility
 * @param {ol.layer.Layer} layer - Layer to toggle
 * @param {boolean} visible - Visibility state
 */
function setLayerVisible(layer, visible) {
	if (layer && typeof layer.setVisible === 'function') {
		layer.setVisible(visible);
	}
}

/**
 * Gets map debug information
 * @returns {Object} Debug data
 */
function getDebugInfo() {
	if (!mapInstance) return {};

	const view = mapInstance.getView();
	return {
		mapReady: true,
		center: view.getCenter(),
		zoom: view.getZoom(),
		rotation: view.getRotation(),
		size: mapInstance.getSize(),
		extent: getExtent(),
		layers: mapInstance.getLayers().getLength(),
		overlays: mapInstance.getOverlays().getLength(),
		viewState: { ...viewState },
		popupState: { ...popupState }
	};
}

module.exports = {
	// Map lifecycle
	setMap,
	getMap,
	hasMap,
	clearMap,

	// View state
	captureViewState,
	getViewState,
	updateViewState,
	restoreViewState,

	// Popup state
	setPopupState,
	getPopupState,
	togglePopup,
	closePopup,

	// Container and layout
	handleContainerResize,

	// Extent and bounds
	getExtent,
	fitToExtent,

	// Layers
	getVisibleLayers,
	setLayerVisible,

	// Debugging
	getDebugInfo
};
