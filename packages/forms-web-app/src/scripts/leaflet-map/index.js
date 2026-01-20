const L = require('leaflet');
require('leaflet.markercluster');
require('proj4leaflet');
const mapStateManager = require('../map/map-state-manager');

// Constants
const DEFAULT_TOKEN_ENDPOINT = '/api/os-maps/token';
const MARKER_BATCH_SIZE = 5; // Smaller batches for snappier UI responsiveness
const TILE_CACHE_SIZE = 100;
const POPUP_MAX_WIDTH = 300;
const POPUP_MIN_WIDTH = 250;
const TEXT_WORD_LIMIT = 25;

/**
 * TokenManager - Handles OAuth token acquisition from server
 * Fetches tokens on-demand for Bearer authentication to OS Maps API.
 * Caches token in memory and fetches new one when expired.
 *
 * @class TokenManager
 */
class TokenManager {
	constructor() {
		this.token = null;
		this.expiresAt = null;
		this.endpoint = DEFAULT_TOKEN_ENDPOINT;
	}

	/**
	 * Get or fetch OAuth token from server
	 * Lazy loads token: fetches on-demand if expired or never fetched.
	 *
	 * @public
	 * @param {string} [endpoint='/api/os-maps/token'] - Token endpoint URL
	 * @returns {Promise<string>} OAuth access token
	 * @throws {Error} If token fetch fails
	 */
	async getToken(endpoint = DEFAULT_TOKEN_ENDPOINT) {
		this.endpoint = endpoint;

		// Return cached token if still valid
		if (this.token && this.expiresAt && Date.now() < this.expiresAt) {
			return this.token;
		}

		// Fetch new token if expired or not yet fetched
		return this.fetchToken(endpoint);
	}

	/**
	 * Fetch fresh OAuth token from server endpoint
	 * Internal method - use getToken() instead
	 *
	 * @private
	 * @param {string} endpoint - Token endpoint URL
	 * @returns {Promise<string>} OAuth access token
	 * @throws {Error} If token fetch fails
	 */
	async fetchToken(endpoint) {
		try {
			const response = await fetch(endpoint);
			if (!response.ok) {
				const statusCode = response.status || 'unknown';
				let errorDetail = response.statusText || 'Unknown error';

				// Try to extract error details from response body for better diagnostics
				try {
					const errorData = await response.json();
					if (errorData.error) {
						errorDetail = errorData.error;
					}
				} catch (e) {
					// Response wasn't JSON, use statusText
				}

				// Detect credentials error (missing OS_MAPS_API_KEY/OS_MAPS_API_SECRET env vars)
				// Error codes are vague for public but searchable in source code
				// OS_MAPS_ERR_CRED: Missing API credentials (see line 79)
				// OS_MAPS_ERR_AUTH: Authentication/authorization failure
				// OS_MAPS_ERR_ACC: Token response parsing failed (see line 94)
				const isCredentialsError =
					statusCode === 500 &&
					(errorDetail.includes('credentials') || errorDetail.includes('configured'));

				if (isCredentialsError) {
					console.error(
						'[OS_MAPS_ERR_CRED] Map service temporarily unavailable. Please try again later.'
					);
				} else if (statusCode !== 'unknown') {
					console.error(
						`[OS_MAPS_ERR_AUTH] Map service authentication failed. Please contact support.`
					);
				}

				throw new Error(`Failed to fetch token: ${errorDetail}`);
			}
			const data = await response.json();

			if (!data.access_token) {
				console.error(
					'[OS_MAPS_ERR_ACC] Map service access token retrieval failed. Please try again later.'
				);
				throw new Error('No access token in response');
			}

			this.token = data.access_token;

			// Track expiration: expires_in is in seconds
			if (data.expires_in) {
				this.expiresAt = Date.now() + data.expires_in * 1000;
			}

			return this.token;
		} catch (error) {
			window.pageDebug?.(`Failed to fetch OS Maps token: ${error.message}`);
			throw error;
		}
	}

	/**
	 * Cleanup: clear cached token
	 */
	destroy() {
		this.token = null;
		this.expiresAt = null;
	}
}

/**
 * TileLayerManager - Manages custom Leaflet tile layer
 * Creates a custom tile layer class that:
 * - Requests tiles from server-side proxy (handles auth and CORS)
 * - Checks in-memory cache before fetching
 * - Falls back to API fetch on cache miss or error
 * - Uses TokenManager to get current valid token
 *
 * @class TileLayerManager
 */
class TileLayerManager {
	/**
	 * Creates a new TileLayerManager instance
	 *
	 * @param {TokenManager} tokenManager - Token manager for Bearer authentication
	 */
	constructor(tokenManager) {
		this.tokenManager = tokenManager;
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
			.catch((error) => {
				window.pageDebug?.(`Cache lookup error for tile ${z}/${x}/${y}:`, error);
				this.fetchTile(url, z, x, y, tile, done);
			});
	}

	/**
	 * Fetch tile from OS Maps API
	 * Gets OAuth token on-demand, fetches tile data, caches it, then displays it.
	 *
	 * @param {string} url - Tile URL
	 * @param {number} z - Zoom level
	 * @param {number} x - Tile X coordinate
	 * @param {number} y - Tile Y coordinate
	 * @param {HTMLImageElement} tile - Image element to populate
	 * @param {Function} done - Callback(error, tile) for Leaflet
	 */
	async fetchTile(url, z, x, y, tile, done) {
		window.pageDebug?.(`Fetching tile: ${url}`);
		try {
			const token = await this.tokenManager.getToken();
			const response = await fetch(url, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (!response.ok) {
				throw new Error(`Tile fetch failed: ${response.statusText}`);
			}

			const arrayBuffer = await response.arrayBuffer();

			if (mapStateManager.hasCache()) {
				mapStateManager.setTile(z, x, y, arrayBuffer).catch((cacheError) => {
					window.pageDebug?.(`Failed to cache tile ${z}/${x}/${y}:`, cacheError);
				});
			}

			this.setTileImage(tile, arrayBuffer, done);
		} catch (error) {
			window.pageDebug?.(`Tile fetch error for ${url}:`, error);
			done(error, tile);
		}
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
						${this.truncateText(summary, TEXT_WORD_LIMIT)}
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
		this.isTouchDevice = this.detectTouchDevice();
		this.prefersReducedMotion = this.detectReducedMotion();
	}

	/**
	 * Detect if device supports touch (mobile/tablet)
	 * Uses media query to detect hover capability
	 *
	 * @returns {boolean} True if device supports touch
	 */
	detectTouchDevice() {
		if (typeof window === 'undefined' || !window.matchMedia) {
			return false;
		}
		try {
			return window.matchMedia('(hover: none)').matches;
		} catch (error) {
			return false;
		}
	}

	/**
	 * Detect if user prefers reduced motion
	 * Respects accessibility preference for motion-sensitive users
	 *
	 * @returns {boolean} True if prefers-reduced-motion is set
	 */
	detectReducedMotion() {
		if (typeof window === 'undefined' || !window.matchMedia) {
			return false;
		}
		try {
			return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		} catch (error) {
			return false;
		}
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
			? L.markerClusterGroup({
					showCoverageOnHover: false,
					iconCreateFunction: (cluster) => this.getClusterIcon(cluster)
			  })
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
		const endIndex = Math.min(startIndex + MARKER_BATCH_SIZE, markers.length);

		for (let i = startIndex; i < endIndex; i++) {
			this.addMarker(markerGroup, markers[i]);
		}

		if (endIndex < markers.length) {
			requestAnimationFrame(() => this.processBatch(map, markerGroup, markers, endIndex));
		} else {
			map.addLayer(markerGroup);
			// Zoom to fit all markers if we have filtered data
			this.zoomToMarkers(map, markerGroup, markers);
		}
	}

	/**
	 * Calculate bounds from markers and zoom map to fit them
	 * Implements Scenario 7: Auto-zoom to filtered results
	 *
	 * Algorithm:
	 * 1. Check if user has applied any filters via hasActiveFilters flag
	 * 2. If no filters: keep default UK-wide view
	 * 3. If filters active: use Leaflet's fitBounds() to optimize zoom + pan
	 * 4. Determine max zoom based on marker count (1 marker: 12, multiple: 10)
	 * 5. Respect accessibility preference: prefers-reduced-motion
	 * 6. Open popup on first marker for context
	 *
	 * @param {L.Map} map - Leaflet map instance
	 * @param {L.FeatureGroup|L.MarkerClusterGroup} markerGroup - Marker group on map
	 * @param {Array<Object>} markers - GeoJSON features (filtered)
	 * @returns {void}
	 */
	zoomToMarkers(map, markerGroup, markers) {
		if (!markerGroup || markers.length === 0) {
			return;
		}

		// Check if user has applied any filters
		const mapConfig = window._applicationService?.mapConfig;
		const hasActiveFilters = mapConfig?.hasActiveFilters || false;
		const enableAnimation = mapConfig?.animateWhenZoomed !== false;

		window.pageDebug?.(
			`zoomToMarkers - hasActiveFilters: ${hasActiveFilters}, markers.length: ${markers.length}, animate: ${enableAnimation}`
		);

		// Only zoom to filtered results if user has applied filters
		// This prevents zooming on page load when no filters are selected
		if (hasActiveFilters) {
			try {
				// Calculate bounding box from all currently visible markers
				const bounds = markerGroup.getBounds();
				if (bounds && bounds.isValid()) {
					// Determine max zoom based on number of filtered projects
					// If only 1 project: use level 12 (consistent with individual project pages)
					// If multiple projects: use level 10 (comfortable multi-project view)
					const maxZoomLevel = markers.length === 1 ? 12 : 10;

					// Fit map to show all filtered markers with comfortable padding
					// Padding: 50px on all sides ensures text/controls are readable
					map.fitBounds(bounds, {
						padding: [50, 50],
						animate: enableAnimation,
						maxZoom: maxZoomLevel
					});

					// Open popup on first marker when auto-zooming to filtered results
					// Provides immediate context about the filtered data
					// Delay popup only if animation is enabled
					if (enableAnimation) {
						const delay = this.prefersReducedMotion ? 0 : 600;
						setTimeout(() => {
							this.showFirstMarkerPopup(markerGroup);
						}, delay);
					} else {
						this.showFirstMarkerPopup(markerGroup);
					}

					window.pageDebug?.(
						`Zoomed to ${markers.length} filtered markers due to active filters (maxZoom: ${maxZoomLevel})`
					);
				}
			} catch (error) {
				window.pageDebug?.('Error calculating marker bounds:', error.message);
				// Silently fail - don't break map if bounds calculation fails
				// Map will remain at default zoom level
			}
		}
	}

	/**
	 * Show popup on the first visible marker in the map
	 * Used to provide immediate context when auto-zooming to filtered results
	 *
	 * @param {L.FeatureGroup|L.MarkerClusterGroup} markerGroup - Marker group containing markers
	 * @returns {void}
	 */
	showFirstMarkerPopup(markerGroup) {
		try {
			if (!markerGroup) return;

			// Get the first layer (marker) from the marker group
			const firstMarker = markerGroup.getLayers()[0];
			if (firstMarker && typeof firstMarker.openPopup === 'function') {
				firstMarker.openPopup();
				window.pageDebug?.('Opened popup for first filtered marker');
			}
		} catch (error) {
			window.pageDebug?.('Error opening first marker popup:', error.message);
			// Silently fail - popup not critical for map functionality
		}
	}

	/**
	 * Add single marker to marker group
	 * Validates GeoJSON feature, creates marker with popup, and adds to group.
	 * Skips invalid features (missing geometry, invalid coordinates, etc.).
	 *
	 * @param {L.MarkerClusterGroup|L.FeatureGroup} markerGroup - Target marker container
	 * @param {Object} feature - GeoJSON Feature object
	 * @param {Object} feature.geometry - GeoJSON geometry
	 * @param {Array<number>} feature.geometry.coordinates - [lng, lat] coordinates
	 * @param {Object} feature.properties - Feature properties for popup
	 * @returns {L.Marker|null} Created marker or null if invalid
	 */
	addMarker(markerGroup, feature) {
		try {
			if (!feature?.geometry?.coordinates || !feature.properties) {
				return null;
			}

			const [lng, lat] = feature.geometry.coordinates;

			if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
				return null;
			}

			const marker = L.marker([lat, lng], {
				icon: this.getIcon(),
				properties: feature.properties // Store properties for keyboard accessibility
			});

			// Lazy-load popup: build HTML only when popup opens
			const popupOptions = {
				className: 'cluster-popup',
				maxWidth: POPUP_MAX_WIDTH,
				minWidth: POPUP_MIN_WIDTH,
				direction: 'top',
				offset: [0, -10],
				animate: !this.prefersReducedMotion
			};

			marker.bindPopup(() => this.popupBuilder.build(feature.properties), popupOptions);

			// Make marker keyboard accessible
			const markerElement = marker.getElement();
			if (markerElement) {
				markerElement.setAttribute('tabindex', '0');
				markerElement.setAttribute('role', 'button');
				markerElement.setAttribute('aria-label', this.getMarkerLabel(feature.properties));
			}

			markerGroup.addLayer(marker);
			return marker;
		} catch (error) {
			return null;
		}
	}

	/**
	 * Get custom marker icon
	 * Returns Leaflet divIcon configured for project markers with custom styling.
	 * On touch devices, creates larger hit area (44x44px) for easier interaction.
	 *
	 * @returns {L.Icon} Leaflet icon instance
	 */
	getIcon() {
		const iconConfig = this.isTouchDevice
			? {
					className: 'projects-marker projects-marker-touch',
					html: '<div class="projects-marker-icon" role="img" aria-label="Project location marker"></div>',
					iconSize: [44, 44],
					iconAnchor: [22, 44],
					popupAnchor: [0, -44]
			  }
			: {
					className: 'projects-marker',
					html: '<div class="projects-marker-icon" role="img" aria-label="Project location marker"></div>',
					iconSize: [25, 41],
					iconAnchor: [12.5, 41],
					popupAnchor: [0, -35]
			  };

		return L.divIcon(iconConfig);
	}

	/**
	 * Get accessible label for marker
	 *
	 * @param {Object} properties - Feature properties
	 * @param {string} properties.projectName - Project name
	 * @param {string} properties.stage - Project stage
	 * @returns {string} Accessible label
	 */
	getMarkerLabel(properties) {
		return `Project: ${properties.projectName || 'Unknown'} (${
			properties.stage || 'Unknown Stage'
		})`;
	}

	/**
	 * Get responsive cluster icon
	 * Returns divIcon with responsive sizing based on device type
	 *
	 * @param {L.MarkerCluster} cluster - Marker cluster object
	 * @returns {L.Icon} Leaflet divIcon instance with cluster count
	 */
	getClusterIcon(cluster) {
		const count = cluster.getChildCount();

		const iconConfig = this.isTouchDevice
			? {
					className: 'cluster-icon cluster-icon-touch',
					html: `<div class="cluster-icon-inner">${count}</div>`,
					iconSize: [44, 44],
					iconAnchor: [22, 44]
			  }
			: {
					className: 'cluster-icon',
					html: `<div class="cluster-icon-inner">${count}</div>`,
					iconSize: [40, 40],
					iconAnchor: [20, 40]
			  };

		return L.divIcon(iconConfig);
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
		this.tileLayerManager = null;
		this.popupBuilder = new PopupBuilder();
		this.markerLoader = new MarkerLoader(this.popupBuilder);
	}

	/**
	 * Initialize map with full configuration
	 *
	 * Initialization sequence:
	 * 1. Initialize in-memory tile cache (100 tile max)
	 * 2. Create Leaflet map instance with EPSG:27700 CRS
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
	 * @param {Object} config.crs - Coordinate Reference System configuration
	 * @param {string} config.crs.code - EPSG code (e.g., 'EPSG:27700')
	 * @param {string} config.crs.proj4String - Proj4 definition string
	 * @param {Array<number>} config.crs.resolutions - Tile resolutions for each zoom level
	 * @param {Array<number>} config.crs.origin - Origin point [x, y] in CRS coordinates
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
		try {
			await mapStateManager.initCache(TILE_CACHE_SIZE);

			// Fetch token from configured or default endpoint
			const tokenEndpoint = config.tileLayer.tokenEndpoint || DEFAULT_TOKEN_ENDPOINT;
			try {
				await this.tokenManager.getToken(tokenEndpoint);
			} catch (error) {
				window.pageDebug?.(
					'Warning: Failed to fetch OS Maps token, continuing without tiles:',
					error.message
				);
				// Continue without tiles - map will still render with CRS
			}
		} catch (error) {
			window.pageDebug?.('Error initializing map cache:', error.message);
			throw new Error(`Failed to initialize map: ${error.message}`);
		}

		// Initialize EPSG:27700 (British National Grid) CRS
		if (!config.crs) {
			throw new Error('CRS configuration is required for map initialization');
		}

		window.pageDebug?.(
			'Initializing CRS:',
			config.crs.code,
			'L.Proj available:',
			typeof L.Proj !== 'undefined'
		);
		let crs;
		try {
			crs = new L.Proj.CRS(config.crs.code, config.crs.proj4String, {
				resolutions: config.crs.resolutions,
				origin: config.crs.origin
			});
			window.pageDebug?.('CRS initialized successfully:', crs);
		} catch (error) {
			window.pageDebug?.('Error initializing CRS:', error.message);
			throw error;
		}

		const mapOptions = {
			...config.mapOptions,
			crs: crs,
			animate: !this.markerLoader.prefersReducedMotion,
			animateZoom: !this.markerLoader.prefersReducedMotion
		};

		// Apply maxBounds if provided to restrict panning
		if (config.mapOptions.maxBounds) {
			mapOptions.maxBounds = config.mapOptions.maxBounds;
			mapOptions.maxBoundsViscosity = 1.0; // Make bounds sticky - prevents dragging outside bounds
		}

		const map = L.map(config.elementId, mapOptions);
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

		this.tileLayerManager = new TileLayerManager(this.tokenManager);
		this.tileLayerManager.addToMap(map, config.tileLayer);

		this.markerLoader.load(map, config);

		// Trigger map size recalculation after DOM has been fully rendered
		// This ensures Leaflet knows the correct container dimensions
		requestAnimationFrame(() => {
			map.invalidateSize();
			window.pageDebug?.('Map size invalidated and recalculated');
		});

		return map;
	}
}

module.exports = LeafletMap;
module.exports.TokenManager = TokenManager;
module.exports.TileLayerManager = TileLayerManager;
module.exports.MarkerLoader = MarkerLoader;
module.exports.PopupBuilder = PopupBuilder;
