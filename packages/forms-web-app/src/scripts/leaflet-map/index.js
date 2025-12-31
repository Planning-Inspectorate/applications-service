const L = require('leaflet');
require('leaflet.markercluster');
const mapStateManager = require('../map/map-state-manager');

/**
 * Leaflet Map Component
 *
 * Reusable map initialization script that works with any mapConfig.
 * Handles:
 * - Map initialization with customizable options
 * - Tile layer setup with OAuth token proxy
 * - GeoJSON marker loading with clustering
 * - Rich popups with project information
 * - Error handling and logging
 *
 * Usage:
 *   const leafletMap = new leafletMap();
 *   leafletMap.initiate(window.APP_MAP_CONFIG);
 */
function leafletMap() {
	// Debug configuration - set to true to enable console logging
	const DEBUG = false;

	/**
	 * Debug logging function
	 * Only logs if DEBUG is true
	 *
	 * @param {...any} args - Arguments to log
	 */
	const debug = (...args) => {
		if (DEBUG) {
			console.log(...args);
		}
	};

	const debugError = (...args) => {
		if (DEBUG) {
			console.error(...args);
		}
	};
	/**
	 * Initialize the map with provided configuration
	 *
	 * @param {Object} config - Map configuration object
	 * @param {string} config.elementId - DOM element ID for map container
	 * @param {Object} config.mapOptions - Leaflet map options (center, zoom, bounds, etc.)
	 * @param {Object} config.tileLayer - Tile layer configuration (url, options)
	 * @param {Array} config.markers - GeoJSON Feature array
	 * @param {boolean} config.clustered - Whether to use marker clustering
	 * @param {number} config.totalProjects - Total project count
	 * @param {string} config.token - OAuth2 access token for tiles
	 *
	 * @returns {L.Map} Leaflet map instance
	 */
	this.initiate = function (config) {
		try {
			debug('Initializing Leaflet map with config:', config);

			// Create map instance
			const map = L.map(config.elementId, config.mapOptions);
			debug('Map created:', map.getZoom(), 'zoom level');
			debug('Map center after creation:', map.getCenter());
			debug('Map bounds:', map.getBounds());

			// Store in state manager (replaces global window.leafletMapInstance)
			mapStateManager.setMap(map);

			// Add tile layer with proxy URL (token added by backend proxy)
			L.tileLayer(config.tileLayer.url, config.tileLayer.options).addTo(map);
			debug('Tile layer added:', config.tileLayer.url);

			// Customize attribution control to remove "Leaflet" prefix
			if (config.mapOptions.attributionControl) {
				map.attributionControl.setPrefix(false);
				debug('Attribution control customized');
			}

			// Load markers if available
			if (config.markers && Array.isArray(config.markers) && config.markers.length > 0) {
				this.loadMarkers(map, config);
			}

			return map;
		} catch (error) {
			debugError('Error initializing map:', error);
			throw error;
		}
	};

	/**
	 * Load markers onto map with clustering support
	 *
	 * @param {L.Map} map - Leaflet map instance
	 * @param {Object} config - Configuration object with markers and clustering flag
	 */
	this.loadMarkers = function (map, config) {
		try {
			const markers = config.markers || [];

			if (!Array.isArray(markers) || markers.length === 0) {
				debug('No markers to display');
				return;
			}

			debug(`Starting to load ${markers.length} markers...`);

			// Create marker container (clustering or feature group)
			let markerGroup;
			if (config.clustered) {
				// Use markercluster defaults (same as cluster project)
				markerGroup = L.markerClusterGroup({
					showCoverageOnHover: false // Disable blue boundary on hover
				});
				debug('Created marker cluster group');
			} else {
				markerGroup = L.featureGroup();
				debug('Created feature group (no clustering)');
			}

			// Process markers in batches to prevent UI freezing
			const BATCH_SIZE = 10;
			let successCount = 0;
			let skippedCount = 0;
			const addMarkerBatch = (startIndex) => {
				const endIndex = Math.min(startIndex + BATCH_SIZE, markers.length);

				for (let i = startIndex; i < endIndex; i++) {
					const feature = markers[i];
					try {
						const markerAdded = this.addMarker(map, markerGroup, feature);
						if (markerAdded) {
							successCount++;
						} else {
							skippedCount++;
						}
					} catch (e) {
						debugError(`Error processing marker ${i + 1}:`, e.message);
						skippedCount++;
					}
				}

				debug(
					`Processed ${endIndex}/${markers.length} markers (${successCount} added, ${skippedCount} skipped)`
				);

				// Continue with next batch in next animation frame
				if (endIndex < markers.length) {
					requestAnimationFrame(() => addMarkerBatch(endIndex));
				} else {
					// All markers processed, add group to map
					map.addLayer(markerGroup);
					const totalProcessed = successCount + skippedCount;
					debug(
						`Marker loading complete: ${successCount}/${totalProcessed} projects loaded on map`
					);
					if (skippedCount > 0) {
						debug(
							`Skipped ${skippedCount} markers due to invalid data (check browser console for details)`
						);
					}

					// Keep initial center/zoom from mapOptions instead of fitting to markers
					// This allows viewing all UK projects with clustering at zoom 7
				}
			};

			// Start batch processing
			requestAnimationFrame(() => addMarkerBatch(0));
		} catch (error) {
			debugError('Error loading markers:', error);
		}
	};

	/**
	 * Add individual marker to marker group
	 *
	 * @param {L.Map} map - Leaflet map instance
	 * @param {L.MarkerClusterGroup|L.FeatureGroup} markerGroup - Target marker container
	 * @param {Object} feature - GeoJSON Feature object
	 * @returns {boolean} True if marker was added successfully, false if skipped
	 */
	this.addMarker = function (map, markerGroup, feature) {
		try {
			// Validate feature structure
			if (!feature || !feature.geometry || !feature.geometry.coordinates || !feature.properties) {
				debug('Skipped marker: Invalid feature structure');
				return false;
			}

			const [lng, lat] = feature.geometry.coordinates;
			const props = feature.properties;

			// Validate coordinates
			if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
				debug('Skipped marker: Invalid coordinates', { lat, lng, caseRef: props.caseRef });
				return false;
			}

			// Create marker with custom icon
			const marker = L.marker([lat, lng], {
				icon: this.getMarkerIcon()
			});

			// Bind popup with project information
			const popupContent = this.createPopupContent(props);
			marker.bindPopup(popupContent, {
				className: 'cluster-popup',
				maxWidth: 300,
				minWidth: 250
			});

			// Add marker to group
			markerGroup.addLayer(marker);
			return true;
		} catch (error) {
			debugError('Error adding marker:', error);
			return false;
		}
	};

	/**
	 * Get custom marker icon
	 * Red marker icon matching GOV.UK design
	 *
	 * @returns {L.Icon} Leaflet icon
	 */
	this.getMarkerIcon = function () {
		return L.divIcon({
			className: 'projects-marker',
			html: `<div class="projects-marker-icon"></div>`,
			iconSize: [25, 41],
			iconAnchor: [12.5, 41],
			popupAnchor: [0, -35]
		});
	};

	/**
	 * Create popup HTML content for a project marker
	 *
	 * @param {Object} properties - GeoJSON feature properties
	 * @returns {string} HTML popup content
	 */
	this.createPopupContent = function (properties) {
		const {
			projectName = 'Unknown Project',
			caseRef = '#',
			stage = 'Unknown Stage',
			summary = ''
		} = properties;

		return `
			<div class="cluster-popup-container">
				<h2 class="cluster-popup-header">1 project selected</h2>
				<table class="cluster-popup-table">
					<tr class="cluster-popup-row">
						<td class="cluster-popup-cell-name">
							<a href="/projects/${caseRef}" class="cluster-popup-link">${projectName}</a>
						</td>
						<td class="cluster-popup-cell-stage">
							${stage}
						</td>
					</tr>
					${
						summary
							? `<tr class="cluster-popup-row cluster-popup-last-row">
						<td class="cluster-popup-cell-name">
							${this.truncateSummary(summary, 25)}
						</td>
					</tr>`
							: ''
					}
				</table>
			</div>
		`;
	};

	/**
	 * Truncate summary text to specified word limit
	 *
	 * @param {string} text - Text to truncate
	 * @param {number} wordLimit - Maximum words
	 * @returns {string} Truncated text with ellipsis if needed
	 */
	this.truncateSummary = function (text, wordLimit = 25) {
		if (typeof text !== 'string') return '';

		const words = text.trim().split(/\s+/);
		if (words.length <= wordLimit) return text.trim();

		return words.slice(0, wordLimit).join(' ') + '...';
	};
}

module.exports = leafletMap;
