const L = require('leaflet');
require('leaflet.markercluster');
const mapStateManager = require('../map/map-state-manager');

/**
 * TokenManager - Handles OAuth token acquisition from server
 * Fetches tokens for Bearer authentication to OS Maps API.
 *
 * @class TokenManager
 */
class TokenManager {
	/**
	 * Fetch OAuth token from server endpoint
	 *
	 * @param {string} [endpoint='/api/os-maps/token'] - Token endpoint URL
	 * @returns {Promise<string>} OAuth access token
	 * @throws {Error} If token fetch fails
	 */
	async fetch(endpoint = '/api/os-maps/token') {
		try {
			const response = await fetch(endpoint);
			if (!response.ok) {
				throw new Error(`Failed to fetch token: ${response.statusText}`);
			}
			const data = await response.json();
			return data.access_token;
		} catch (error) {
			if (error.message.includes('Failed to fetch token')) {
				throw error;
			}
			// Re-throw the original error for network failures
			throw error;
		}
	}
}

/**
 * TileLayerManager - Manages custom Leaflet tile layer
 * Creates a custom tile layer class that:
 * - Requests tiles from server-side proxy (handles auth and CORS)
 * - Checks in-memory cache before fetching
 * - Falls back to API fetch on cache miss or error
 *
 * @class TileLayerManager
 */
class TileLayerManager {
	/**
	 * Creates a new TileLayerManager instance
	 *
	 * @param {string} token - OAuth Bearer token for OS Maps API authentication
	 */
	constructor(token) {
		this.token = token;
	}

	/**
	 * Create custom BearerTileLayer class extending Leaflet TileLayer
	 * Returns a Leaflet TileLayer subclass that implements custom tile loading logic.
	 *
	 * @returns {L.TileLayer} Custom tile layer class with Bearer auth and caching
	 */
	createLayer() {
		const manager = this;

		return L.TileLayer.extend({
			/**
			 * Leaflet hook for creating tile elements
			 * Delegates to manager.loadTile for cache/fetch logic
			 *
			 * @param {Object} coords - Tile coordinates {z, x, y}
			 * @param {Function} done - Callback(error, tile)
			 * @returns {HTMLImageElement} Image element for the tile
			 */
			createTile(coords, done) {
				const tile = document.createElement('img');
				const { z, x, y } = coords;
				const tileUrl = this.getTileUrl(coords);

				manager.loadTile(z, x, y, tileUrl, tile, done);
				return tile;
			}
		});
	}

	/**
	 * Load tile from cache or fetch from API
	 * Unified tile loading logic: checks cache if available, falls back to API fetch.
	 *
	 * @param {number} z - Zoom level
	 * @param {number} x - Tile X coordinate
	 * @param {number} y - Tile Y coordinate
	 * @param {string} url - Full tile URL with coordinates interpolated
	 * @param {HTMLImageElement} tile - Image element to populate
	 * @param {Function} done - Callback(error, tile) for Leaflet
	 */
	loadTile(z, x, y, url, tile, done) {
		if (!mapStateManager.hasCache()) {
			this.fetchTile(url, z, x, y, tile, done);
			return;
		}

		mapStateManager
			.getTile(z, x, y)
			.then((cachedTile) => {
				if (cachedTile) {
					this.setTileImage(tile, cachedTile, done);
				} else {
					this.fetchTile(url, z, x, y, tile, done);
				}
			})
			.catch(() => {
				this.fetchTile(url, z, x, y, tile, done);
			});
	}

	/**
	 * Fetch tile from server-side proxy
	 * Retrieves tile data from proxy, caches it if cache is available, then displays it.
	 *
	 * @param {string} url - Tile proxy URL
	 * @param {number} z - Zoom level
	 * @param {number} x - Tile X coordinate
	 * @param {number} y - Tile Y coordinate
	 * @param {HTMLImageElement} tile - Image element to populate
	 * @param {Function} done - Callback(error, tile) for Leaflet
	 */
	fetchTile(url, z, x, y, tile, done) {
		window.pageDebug(`Fetching tile: ${url}`);
		fetch(url, {
			headers: {
				Authorization: `Bearer ${this.token}`
			}
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Tile fetch failed: ${response.statusText}`);
				}
				return response.arrayBuffer();
			})
			.then((arrayBuffer) => {
				if (mapStateManager.hasCache()) {
					mapStateManager.setTile(z, x, y, arrayBuffer).catch(() => null);
				}
				this.setTileImage(tile, arrayBuffer, done);
			})
			.catch((error) => {
				window.pageDebug(`Tile fetch error for ${url}:`, error);
				done(error, tile);
			});
	}

	/**
	 * Set tile image source from ArrayBuffer data
	 * Converts image data to blob, creates object URL, and sets as tile source.
	 *
	 * @param {HTMLImageElement} tile - Image element to populate
	 * @param {ArrayBuffer} arrayBuffer - PNG image data
	 * @param {Function} done - Callback(error, tile) for Leaflet
	 */
	setTileImage(tile, arrayBuffer, done) {
		const blob = new Blob([arrayBuffer], { type: 'image/png' });
		const url = URL.createObjectURL(blob);
		tile.src = url;
		done(null, tile);
	}

	/**
	 * Add tile layer to map with Bearer authentication factory
	 * Registers the custom tile layer factory and adds layer to map.
	 *
	 * @param {L.Map} map - Leaflet map instance
	 * @param {Object} config - Tile layer configuration
	 * @param {string} config.url - Tile URL template (e.g., https://api.os.uk/.../zxy/{z}/{x}/{y}.png)
	 * @param {Object} config.options - Leaflet tile layer options (maxZoom, attribution, etc.)
	 */
	addToMap(map, config) {
		const LayerClass = this.createLayer();

		L.tileLayer.bearer = (url, options) => new LayerClass(url, options);
		L.tileLayer.bearer(config.url, config.options).addTo(map);
	}
}

/**
 * PopupBuilder - Builds popup HTML content for map markers
 * Generates consistent popup HTML with project information and optional summaries.
 *
 * @class PopupBuilder
 */
class PopupBuilder {
	/**
	 * Build popup HTML content for a marker
	 * Creates HTML table with project name, case reference, stage, and optional summary.
	 *
	 * @param {Object} properties - GeoJSON feature properties
	 * @param {string} [properties.projectName='Unknown Project'] - Project name
	 * @param {string} [properties.caseRef='#'] - Case reference identifier
	 * @param {string} [properties.stage='Unknown Stage'] - Project stage
	 * @param {string} [properties.summary=''] - Project summary (truncated to 25 words)
	 * @returns {string} HTML popup content
	 */
	build(properties) {
		const {
			projectName = 'Unknown Project',
			caseRef = '#',
			stage = 'Unknown Stage',
			summary = ''
		} = properties;

		const summaryRow = summary
			? `
				<tr class="cluster-popup-row cluster-popup-last-row">
					<td class="cluster-popup-cell-name">
						${this.truncateText(summary, 25)}
					</td>
				</tr>
			`
			: '';

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
					${summaryRow}
				</table>
			</div>
		`;
	}

	/**
	 * Truncate text to word limit
	 * Returns text as-is if within limit, otherwise truncates and adds ellipsis.
	 *
	 * @param {string} text - Text to truncate
	 * @param {number} wordLimit - Maximum word count
	 * @returns {string} Truncated text with ellipsis if needed
	 */
	truncateText(text, wordLimit) {
		if (typeof text !== 'string') return '';

		const words = text.trim().split(/\s+/);
		if (words.length <= wordLimit) return text.trim();

		return words.slice(0, wordLimit).join(' ') + '...';
	}
}

/**
 * MarkerLoader - Loads markers onto map with optional clustering
 * Processes markers in batches to prevent UI blocking,
 * validates GeoJSON features, and supports both clustered and flat marker groups.
 *
 * @class MarkerLoader
 */
class MarkerLoader {
	/**
	 * Creates a new MarkerLoader instance
	 *
	 * @param {PopupBuilder} popupBuilder - Popup builder for creating marker popups
	 */
	constructor(popupBuilder) {
		this.popupBuilder = popupBuilder;
		this.BATCH_SIZE = 10;
	}

	/**
	 * Load markers onto map
	 * Creates marker group (clustered or flat), validates markers, and processes in batches.
	 *
	 * @param {L.Map} map - Leaflet map instance
	 * @param {Object} config - Configuration object
	 * @param {Array<Object>} config.markers - GeoJSON Feature array
	 * @param {boolean} [config.clustered=false] - Use marker clustering
	 * @returns {void}
	 */
	load(map, config) {
		const markers = config.markers || [];

		if (!Array.isArray(markers) || markers.length === 0) {
			return;
		}

		const markerGroup = config.clustered
			? L.markerClusterGroup({ showCoverageOnHover: false })
			: L.featureGroup();

		this.processBatch(map, markerGroup, markers, 0);
	}

	/**
	 * Process markers in batches using requestAnimationFrame
	 * Prevents UI freezing by processing markers asynchronously in chunks.
	 *
	 * @param {L.Map} map - Leaflet map instance
	 * @param {L.MarkerClusterGroup|L.FeatureGroup} markerGroup - Target marker container
	 * @param {Array<Object>} markers - All GeoJSON features to load
	 * @param {number} startIndex - Index to start processing from
	 */
	processBatch(map, markerGroup, markers, startIndex) {
		const endIndex = Math.min(startIndex + this.BATCH_SIZE, markers.length);

		for (let i = startIndex; i < endIndex; i++) {
			this.addMarker(markerGroup, markers[i]);
		}

		if (endIndex < markers.length) {
			requestAnimationFrame(() => this.processBatch(map, markerGroup, markers, endIndex));
		} else {
			map.addLayer(markerGroup);
		}
	}

	/**
	 * Add single marker to marker group
	 * Validates GeoJSON feature, creates marker with popup, and adds to group.
	 * S invalid features (missing geometry, invalid coordinates, etc.).
	 *
	 * @param {L.MarkerClusterGroup|L.FeatureGroup} markerGroup - Target marker container
	 * @param {Object} feature - GeoJSON Feature object
	 * @param {Object} feature.geometry - GeoJSON geometry
	 * @param {Array<number>} feature.geometry.coordinates - [lng, lat] coordinates
	 * @param {Object} feature.properties - Feature properties for popup
	 * @returns {void}
	 */
	addMarker(markerGroup, feature) {
		try {
			if (!feature?.geometry?.coordinates || !feature.properties) {
				return;
			}

			const [lng, lat] = feature.geometry.coordinates;

			if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
				return;
			}

			const marker = L.marker([lat, lng], {
				icon: this.getIcon()
			});

			const popupHtml = this.popupBuilder.build(feature.properties);
			marker.bindPopup(popupHtml, {
				className: 'cluster-popup',
				maxWidth: 300,
				minWidth: 250
			});

			markerGroup.addLayer(marker);
		} catch (error) {
			null;
		}
	}

	/**
	 * Get custom marker icon
	 * Returns Leaflet divIcon configured for project markers with custom styling.
	 *
	 * @returns {L.Icon} Leaflet icon instance
	 */
	getIcon() {
		return L.divIcon({
			className: 'projects-marker',
			html: '<div class="projects-marker-icon"></div>',
			iconSize: [25, 41],
			iconAnchor: [12.5, 41],
			popupAnchor: [0, -35]
		});
	}
}

/**
 * LeafletMap - Main orchestrator for map initialization
 *
 * Coordinates initialization of:
 * - Leaflet map instance with custom options
 * - In-memory tile cache (100 tiles max)
 * - Custom Bearer token tile layer with caching
 * - GeoJSON marker loading with optional clustering
 * - Map state persistence via mapStateManager
 * - Each component handles a single responsibility
 *
 * @class LeafletMap
 * @example
 * const map = new LeafletMap();
 * map.initiate(window._applicationService.mapConfig);
 */
class LeafletMap {
	/**
	 * Creates a new LeafletMap instance with dependency managers
	 */
	constructor() {
		this.tokenManager = new TokenManager();
		this.token = null;
		this.tileLayerManager = null;
		this.popupBuilder = new PopupBuilder();
		this.markerLoader = new MarkerLoader(this.popupBuilder);
	}

	/**
	 * Initialize map with full configuration
	 *
	 * Initialization sequence:
	 * 1. Initialize in-memory tile cache (100 tile max)
	 * 2. Create Leaflet map instance
	 * 3. Store map in global state manager
	 * 4. Customize attribution control
	 * 5. Setup tile layer with server-side proxy
	 * 6. Load markers with optional clustering
	 *
	 * @param {Object} config - Map configuration object
	 * @param {string} config.elementId - DOM element ID for map container
	 * @param {Object} config.mapOptions - Leaflet map constructor options
	 * @param {number} config.mapOptions.minZoom - Minimum zoom level
	 * @param {number} config.mapOptions.maxZoom - Maximum zoom level
	 * @param {Array<number>} config.mapOptions.center - Initial center [lat, lng]
	 * @param {number} config.mapOptions.zoom - Initial zoom level
	 * @param {boolean} config.mapOptions.attributionControl - Show attribution control
	 * @param {Object} config.tileLayer - Tile layer configuration
	 * @param {string} config.tileLayer.url - Tile proxy URL template with {z}/{x}/{y} placeholders
	 * @param {Object} config.tileLayer.options - Leaflet tile layer options
	 * @param {Array<Object>} config.markers - GeoJSON Feature array for markers
	 * @param {boolean} config.clustered - Use marker clustering (default: false)
	 * @param {number} config.totalProjects - Total project count (metadata)
	 * @returns {Promise<L.Map>} Initialized Leaflet map instance
	 * @throws {Error} If map initialization fails
	 */
	async initiate(config) {
		await mapStateManager.initCache(100);

		// Fetch token from configured or default endpoint
		const tokenEndpoint = config.tileLayer.tokenEndpoint || '/api/os-maps/token';
		this.token = await this.tokenManager.fetch(tokenEndpoint);

		const map = L.map(config.elementId, config.mapOptions);
		mapStateManager.setMap(map);

		// Expose map and mapStateManager on window for callbacks (e.g., sidebar toggle)
		if (typeof window !== 'undefined') {
			window._applicationService = window._applicationService || {};
			window._applicationService.map = map;
			window._applicationService.mapStateManager = mapStateManager;
		}

		if (config.mapOptions.attributionControl) {
			map.attributionControl.setPrefix(false);
		}

		this.tileLayerManager = new TileLayerManager(this.token);
		this.tileLayerManager.addToMap(map, config.tileLayer);

		this.markerLoader.load(map, config);

		return map;
	}
}

module.exports = LeafletMap;
