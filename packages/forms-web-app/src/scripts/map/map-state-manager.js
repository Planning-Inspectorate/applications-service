/**
 * Map State Manager
 *
 * Centralized store for map-related state:
 * - Leaflet map instance
 * - Dual-level tile caching (in-memory L1 + IndexedDB L2)
 * - Container resize handler for maintaining bounds
 *
 * Caching Strategy:
 * 1. getTile() checks in-memory cache first (instant)
 * 2. If miss → checks IndexedDB (persistent)
 * 3. If still miss → null (fetch from API)
 * 4. setTile() stores in both caches (non-blocking)
 *
 * Usage:
 *   const mapStateManager = require('./map-state-manager');
 *   mapStateManager.setMap(leafletMapInstance);
 *   mapStateManager.initCache(100); // max size
 *   await mapStateManager.getTile(z, x, y);
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
 * In-memory tile cache with LRU eviction
 */
class TileCache {
	constructor(maxSize = 100) {
		this.cache = new Map();
		this.maxSize = maxSize;
	}

	/**
	 * Retrieve a tile from memory cache
	 *
	 * @param {number} z - Zoom level
	 * @param {number} x - Tile X coordinate
	 * @param {number} y - Tile Y coordinate
	 * @returns {Promise<ArrayBuffer|null>} Tile data or null if not found
	 */
	async getTile(z, x, y) {
		const key = `${z}/${x}/${y}`;
		return this.cache.get(key) || null;
	}

	/**
	 * Store a tile in memory cache
	 * Implements simple LRU eviction when cache exceeds maxSize
	 *
	 * @param {number} z - Zoom level
	 * @param {number} x - Tile X coordinate
	 * @param {number} y - Tile Y coordinate
	 * @param {ArrayBuffer} arrayBuffer - Tile image data
	 * @returns {Promise<void>}
	 */
	async setTile(z, x, y, arrayBuffer) {
		const key = `${z}/${x}/${y}`;

		// If cache is full, remove oldest entry (first one in Map)
		if (this.cache.size >= this.maxSize) {
			const firstKey = this.cache.keys().next().value;
			this.cache.delete(firstKey);
		}

		this.cache.set(key, arrayBuffer);
	}

	/**
	 * Clear all cached tiles
	 *
	 * @returns {Promise<void>}
	 */
	async clear() {
		this.cache.clear();
	}

	/**
	 * Get cache statistics
	 *
	 * @returns {Promise<Object>} Cache stats
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
 * IndexedDB tile cache for persistent storage
 * Provides fall-back persistent caching across page reloads
 */
class IndexedDBTileCache {
	/**
	 * Initialize IndexedDB connection
	 * Creates database and tile object store if needed
	 *
	 * @returns {Promise<void>}
	 */
	async init() {
		// Gracefully skip initialization if IndexedDB is not available (e.g., Node.js tests)
		if (this.db || typeof indexedDB === 'undefined') return;

		return new Promise((resolve) => {
			const request = indexedDB.open(DB_NAME, DB_VERSION);

			request.onerror = () => {
				console.warn('IndexedDB initialization failed, tiles will not persist');
				resolve(); // Don't fail - graceful degradation
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
	 * Retrieve a tile from IndexedDB
	 *
	 * @param {number} z - Zoom level
	 * @param {number} x - Tile X coordinate
	 * @param {number} y - Tile Y coordinate
	 * @returns {Promise<ArrayBuffer|null>} Tile data or null if not found
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
	 * Store a tile in IndexedDB
	 * Non-blocking operation
	 *
	 * @param {number} z - Zoom level
	 * @param {number} x - Tile X coordinate
	 * @param {number} y - Tile Y coordinate
	 * @param {ArrayBuffer} arrayBuffer - Tile image data
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
			// Silently fail - cache is optional
			console.warn('Failed to cache tile in IndexedDB:', error);
		}
	}

	/**
	 * Clear all cached tiles from IndexedDB
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
	},

	/**
	 * Initialize tile cache with optional max size
	 * Sets up both in-memory (L1) and IndexedDB (L2) caches
	 *
	 * @param {number} maxSize - Maximum number of tiles to cache in memory (default: 100)
	 * @returns {Promise<void>}
	 */
	async initCache(maxSize = 100) {
		tileCache = new TileCache(maxSize);
		tileCacheIndexedDB = new IndexedDBTileCache();
		await tileCacheIndexedDB.init();
	},

	/**
	 * Retrieve a tile from cache
	 * Checks in-memory cache first (L1), then IndexedDB (L2)
	 *
	 * @param {number} z - Zoom level
	 * @param {number} x - Tile X coordinate
	 * @param {number} y - Tile Y coordinate
	 * @returns {Promise<ArrayBuffer|null>} Tile data or null if not found
	 */
	async getTile(z, x, y) {
		if (!tileCache) return null;

		// L1: Check in-memory cache first (instant)
		const inMemoryTile = await tileCache.getTile(z, x, y);
		if (inMemoryTile) return inMemoryTile;

		// L2: Check IndexedDB (persistent but slower)
		if (tileCacheIndexedDB) {
			const persistentTile = await tileCacheIndexedDB.getTile(z, x, y);
			if (persistentTile) {
				// Promote to in-memory cache for faster access
				await tileCache.setTile(z, x, y, persistentTile);
				return persistentTile;
			}
		}

		return null;
	},

	/**
	 * Store a tile in cache
	 * Stores in both in-memory (L1) and IndexedDB (L2) caches
	 * Non-blocking: IndexedDB write happens async
	 *
	 * @param {number} z - Zoom level
	 * @param {number} x - Tile X coordinate
	 * @param {number} y - Tile Y coordinate
	 * @param {ArrayBuffer} arrayBuffer - Tile image data
	 * @returns {Promise<void>}
	 */
	async setTile(z, x, y, arrayBuffer) {
		if (!tileCache) return;

		// L1: Store in in-memory cache (synchronous)
		await tileCache.setTile(z, x, y, arrayBuffer);

		// L2: Store in IndexedDB async (non-blocking)
		if (tileCacheIndexedDB) {
			tileCacheIndexedDB.setTile(z, x, y, arrayBuffer).catch(() => null);
		}
	},

	/**
	 * Check if cache is initialized
	 *
	 * @returns {boolean} True if cache is initialized
	 */
	hasCache() {
		return tileCache !== null;
	},

	/**
	 * Get cache statistics
	 *
	 * @returns {Promise<Object>} Cache stats
	 */
	async getCacheStats() {
		if (!tileCache) return null;
		return tileCache.getStats();
	},

	/**
	 * Clear cache instances (for cleanup/testing)
	 * Clears both in-memory and IndexedDB caches
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
	 * Handle container resize while preserving map bounds
	 * Waits for CSS transition to complete, then restores bounds and invalidates size
	 * Prevents loading out-of-bounds tiles during layout changes
	 *
	 * Usage:
	 *   mapStateManager.handleContainerResize(element, bounds);
	 *
	 * @param {HTMLElement} element - Element with CSS transition (sidebar, modal, etc)
	 * @param {L.LatLngBounds} bounds - Original bounds to restore after resize
	 * @throws {Error} If map is not initialized
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

			// fitBounds BEFORE invalidateSize to prevent loading tiles for expanded area
			mapInstance.fitBounds(bounds, { animate: false, padding: [0, 0] });
			mapInstance.invalidateSize(false);
		};

		// Fallback timeout in case transitionend doesn't fire reliably
		const timeoutId = setTimeout(onComplete, TRANSITION_TIMEOUT_MS);
		element.addEventListener('transitionend', onComplete, { once: true });
	}
};
