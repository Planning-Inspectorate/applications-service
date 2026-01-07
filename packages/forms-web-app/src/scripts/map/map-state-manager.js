/**
 * Map State Manager
 *
 * Provides centralized management for all map-related application state:
 * - Leaflet map instance lifecycle
 * - Two-tier tile caching system (L1: in-memory, L2: IndexedDB persistence)
 * - Container resize synchronization with map bounds preservation
 *
 * Cache Lookup Strategy:
 * getTile() → L1 cache (session-fast) → L2 cache (persistent) → null (client fetch)
 * setTile() → L1 (synchronous) + L2 (asynchronous, non-blocking)
 *
 * Usage:
 *   const mapStateManager = require('./map-state-manager');
 *   mapStateManager.setMap(leafletMapInstance);
 *   await mapStateManager.initCache(100);
 *   const tile = await mapStateManager.getTile(z, x, y);
 *   await mapStateManager.setTile(z, x, y, arrayBuffer);
 *   mapStateManager.handleContainerResize(element, bounds);
 */

let mapInstance = null;
let tileCache = null;
let tileCacheIndexedDB = null;

const TRANSITION_TIMEOUT_MS = 350;
const DB_NAME = 'PinsMapTiles';
const DB_STORE = 'tiles';
const DB_VERSION = 1;

/**
 * Session-scoped tile cache with Least Recently Used eviction.
 * Bounded memory footprint via configurable maximum tile capacity.
 * @class TileCache
 */
class TileCache {
	constructor(maxSize = 100) {
		this.cache = new Map();
		this.maxSize = maxSize;
	}

	/**
	 * Retrieves cached tile data by geographic coordinates.
	 *
	 * @param {number} z - Zoom level
	 * @param {number} x - Tile column coordinate
	 * @param {number} y - Tile row coordinate
	 * @returns {Promise<ArrayBuffer|null>} Tile image buffer or null if not cached
	 */
	async getTile(z, x, y) {
		const key = `${z}/${x}/${y}`;
		return this.cache.get(key) || null;
	}

	/**
	 * Stores tile data in cache with automatic eviction of oldest entry
	 * when cache capacity is exceeded. Implements FIFO eviction policy
	 * to maintain bounded memory consumption.
	 *
	 * @param {number} z - Zoom level
	 * @param {number} x - Tile column coordinate
	 * @param {number} y - Tile row coordinate
	 * @param {ArrayBuffer} arrayBuffer - Raw tile image data
	 * @returns {Promise<void>}
	 */
	async setTile(z, x, y, arrayBuffer) {
		const key = `${z}/${x}/${y}`;

		if (this.cache.size >= this.maxSize) {
			const firstKey = this.cache.keys().next().value;
			this.cache.delete(firstKey);
		}

		this.cache.set(key, arrayBuffer);
	}

	/**
	 * Purges all cached tiles and resets cache state.
	 *
	 * @returns {Promise<void>}
	 */
	async clear() {
		this.cache.clear();
	}

	/**
	 * Returns cache utilization metrics for monitoring and diagnostics.
	 *
	 * @returns {Promise<{size: number, maxSize: number, filled: string}>} Cache statistics object
	 */
	async getStats() {
		return {
			size: this.cache.size,
			maxSize: this.maxSize,
			filled: `${Math.round((this.cache.size / this.maxSize) * 100)}%`
		};
	}
}

/**
 * Persistent tile cache backed by IndexedDB for cross-session resilience.
 * Survives page reloads and browser restarts. Failures degrade gracefully
 * without impacting application functionality.
 * @class IndexedDBTileCache
 */
class IndexedDBTileCache {
	/**
	 * Establishes connection to persistent tile database and creates
	 * object store if needed. Silently succeeds or fails without exception.
	 *
	 * @returns {Promise<void>}
	 */
	async init() {
		if (this.db || typeof indexedDB === 'undefined') return;

		return new Promise((resolve) => {
			const request = indexedDB.open(DB_NAME, DB_VERSION);

			request.onerror = () => {
				console.warn('IndexedDB initialization failed, tiles will not persist');
				resolve();
			};

			request.onsuccess = () => {
				this.db = request.result;
				resolve();
			};

			request.onupgradeneeded = (event) => {
				const db = event.target.result;
				if (!db.objectStoreNames.contains(DB_STORE)) {
					db.createObjectStore(DB_STORE);
				}
			};
		});
	}

	/**
	 * Retrieves cached tile data by geographic coordinates from persistent storage.
	 *
	 * @param {number} z - Zoom level
	 * @param {number} x - Tile column coordinate
	 * @param {number} y - Tile row coordinate
	 * @returns {Promise<ArrayBuffer|null>} Tile image buffer or null if not found
	 */
	async getTile(z, x, y) {
		if (!this.db) return null;

		const key = `${z}/${x}/${y}`;

		return new Promise((resolve) => {
			try {
				const transaction = this.db.transaction([DB_STORE], 'readonly');
				const store = transaction.objectStore(DB_STORE);
				const request = store.get(key);

				request.onsuccess = () => {
					resolve(request.result || null);
				};

				request.onerror = () => {
					resolve(null);
				};
			} catch (error) {
				resolve(null);
			}
		});
	}

	/**
	 * Persists tile data to IndexedDB without blocking the main thread.
	 * Failures are logged but suppressed to prevent cache errors from
	 * impacting tile display functionality.
	 *
	 * @param {number} z - Zoom level
	 * @param {number} x - Tile column coordinate
	 * @param {number} y - Tile row coordinate
	 * @param {ArrayBuffer} arrayBuffer - Raw tile image data
	 * @returns {Promise<void>}
	 */
	async setTile(z, x, y, arrayBuffer) {
		if (!this.db) return;

		const key = `${z}/${x}/${y}`;

		try {
			const transaction = this.db.transaction([DB_STORE], 'readwrite');
			const store = transaction.objectStore(DB_STORE);
			store.put(arrayBuffer, key);
		} catch (error) {
			console.warn('Failed to cache tile in IndexedDB:', error);
		}
	}

	/**
	 * Purges all persistent tile data and resets database connection.
	 *
	 * @returns {Promise<void>}
	 */
	async clear() {
		if (!this.db) return;

		return new Promise((resolve) => {
			try {
				const transaction = this.db.transaction([DB_STORE], 'readwrite');
				const store = transaction.objectStore(DB_STORE);
				store.clear();
				transaction.oncomplete = () => resolve();
				transaction.onerror = () => resolve();
			} catch (error) {
				resolve();
			}
		});
	}
}

module.exports = {
	/**
	 * Stores Leaflet map instance for global access. Validates instance
	 * is a valid map object before assignment.
	 *
	 * @param {L.Map} map - Leaflet map instance
	 * @throws {Error} When provided object is not a valid Leaflet map
	 */
	setMap(map) {
		if (map && typeof map.getZoom === 'function') {
			mapInstance = map;
		} else {
			throw new Error('Invalid Leaflet map instance provided to mapStateManager');
		}
	},

	/**
	 * Retrieves the current Leaflet map instance.
	 *
	 * @returns {L.Map|null} Active map instance or null if not initialized
	 */
	getMap() {
		return mapInstance;
	},

	/**
	 * Determines whether a map instance is currently initialized.
	 *
	 * @returns {boolean} True if map has been initialized
	 */
	hasMap() {
		return mapInstance !== null;
	},

	/**
	 * Clears map instance reference during teardown or testing.
	 *
	 * @returns {void}
	 */
	clearMap() {
		mapInstance = null;
	},

	/**
	 * Initializes dual-level tile cache system. Creates in-memory L1 cache
	 * with configurable capacity and establishes persistent L2 cache connection.
	 *
	 * @param {number} maxSize - Maximum tiles held in memory (default: 100)
	 * @returns {Promise<void>}
	 */
	async initCache(maxSize = 100) {
		tileCache = new TileCache(maxSize);
		tileCacheIndexedDB = new IndexedDBTileCache();
		await tileCacheIndexedDB.init();
	},

	/**
	 * Retrieves cached tile by geographic coordinates using layered lookup:
	 * Session cache (L1) → Persistent cache (L2) → Cache miss. Promotes L2
	 * hits to L1 for subsequent session requests.
	 *
	 * @param {number} z - Zoom level
	 * @param {number} x - Tile column coordinate
	 * @param {number} y - Tile row coordinate
	 * @returns {Promise<ArrayBuffer|null>} Tile image buffer or null if not in cache
	 */
	async getTile(z, x, y) {
		if (!tileCache) return null;

		const inMemoryTile = await tileCache.getTile(z, x, y);
		if (inMemoryTile) return inMemoryTile;

		if (tileCacheIndexedDB) {
			const persistentTile = await tileCacheIndexedDB.getTile(z, x, y);
			if (persistentTile) {
				await tileCache.setTile(z, x, y, persistentTile);
				return persistentTile;
			}
		}

		return null;
	},

	/**
	 * Stores tile in both cache layers synchronously for L1 and
	 * asynchronously for L2 without blocking the main thread.
	 *
	 * @param {number} z - Zoom level
	 * @param {number} x - Tile column coordinate
	 * @param {number} y - Tile row coordinate
	 * @param {ArrayBuffer} arrayBuffer - Raw tile image data
	 * @returns {Promise<void>}
	 */
	async setTile(z, x, y, arrayBuffer) {
		if (!tileCache) return;

		await tileCache.setTile(z, x, y, arrayBuffer);

		if (tileCacheIndexedDB) {
			tileCacheIndexedDB.setTile(z, x, y, arrayBuffer).catch(() => null);
		}
	},

	/**
	 * Determines whether the tile cache system is initialized and ready.
	 *
	 * @returns {boolean} True if cache has been initialized
	 */
	hasCache() {
		return tileCache !== null;
	},

	/**
	 * Returns current cache utilization and capacity information for
	 * monitoring and diagnostics.
	 *
	 * @returns {Promise<{size: number, maxSize: number, filled: string}|null>} Cache metrics or null if not initialized
	 */
	async getCacheStats() {
		if (!tileCache) return null;
		return tileCache.getStats();
	},

	/**
	 * Resets all cache state and releases database resources. Clears
	 * both session and persistent layers completely.
	 *
	 * @returns {Promise<void>}
	 */
	async clearCache() {
		if (tileCache) {
			await tileCache.clear();
		}
		if (tileCacheIndexedDB) {
			await tileCacheIndexedDB.clear();
		}
		tileCache = null;
		tileCacheIndexedDB = null;
	},

	/**
	 * Synchronizes map bounds with container resize transitions. Waits for
	 * layout animation to complete before recalculating viewport, preventing
	 * unnecessary tile loads during intermediate states. Applies bounds before
	 * size invalidation to avoid loading tiles in temporarily expanded areas.
	 *
	 * @param {HTMLElement} element - Container element undergoing CSS transition
	 * @param {L.LatLngBounds} bounds - Geographic bounds to restore post-transition
	 * @throws {Error} When map instance has not been initialized
	 */
	handleContainerResize(element, bounds) {
		if (!mapInstance) {
			throw new Error('Map not initialized. Call setMap() first.');
		}

		let handled = false;

		const onComplete = () => {
			if (handled) return;
			handled = true;
			element.removeEventListener('transitionend', onComplete);
			clearTimeout(timeoutId);

			mapInstance.fitBounds(bounds, { animate: false, padding: [0, 0] });
			mapInstance.invalidateSize(false);
		};

		const timeoutId = setTimeout(onComplete, TRANSITION_TIMEOUT_MS);
		element.addEventListener('transitionend', onComplete, { once: true });
	}
};
