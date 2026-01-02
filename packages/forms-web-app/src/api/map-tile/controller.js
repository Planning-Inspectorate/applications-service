/**
 * Map Tile Proxy Controller
 *
 * Proxies tile requests to OS Maps API with OAuth Bearer token authentication.
 * This keeps API credentials server-side and secure.
 *
 * Supports EPSG:3857 (Web Mercator) projection only.
 */

const fetch = require('node-fetch');
const logger = require('../../lib/logger');
const { getMapAccessToken } = require('../_services/os-maps-token-oauth.service');

// In-memory tile cache (stores up to 1000 tiles)
const tileCache = new Map();
const MAX_CACHE_SIZE = 1000;

/**
 * Retrieves a tile from cache or fetches it from OS Maps API
 * Implements LRU-like eviction to keep cache size manageable
 *
 * @param {string} cacheKey - Cache key in format "z-x-y"
 * @param {Function} fetchFn - Async function that fetches the tile from OS Maps
 * @returns {Buffer} PNG tile image data
 */
const getCachedTile = async (cacheKey, fetchFn) => {
	// Return cached tile if available
	if (tileCache.has(cacheKey)) {
		return tileCache.get(cacheKey);
	}

	// Fetch tile from OS Maps API
	const tile = await fetchFn();

	// Evict oldest entry if cache is full (simple FIFO, not true LRU)
	if (tileCache.size >= MAX_CACHE_SIZE) {
		const firstKey = tileCache.keys().next().value;
		tileCache.delete(firstKey);
	}

	// Store in cache for future requests
	tileCache.set(cacheKey, tile);
	return tile;
};

/**
 * GET /api/map-tile/:z/:x/:y
 *
 * Proxies a single OS Maps tile request with Bearer token authentication.
 * Supports EPSG:3857 (Web Mercator) projection and caches tiles in memory.
 *
 * @param {number} z - Zoom level (0-20)
 * @param {number} x - Tile column
 * @param {number} y - Tile row
 * @returns {Buffer} PNG tile image
 *
 * Error responses:
 *   400 - Invalid tile coordinates
 *   500 - Failed to fetch tile from OS API
 */
const getMapTile = async (req, res) => {
	try {
		const { z, x, y } = req.params;

		// Validate required tile coordinate parameters
		if (!z || !x || !y) {
			return res.status(400).json({
				error: 'Invalid tile coordinates. Required: z, x, y'
			});
		}

		// Parse and validate coordinates are integers
		const zoomLevel = parseInt(z, 10);
		const col = parseInt(x, 10);
		const row = parseInt(y, 10);

		if (isNaN(zoomLevel) || isNaN(col) || isNaN(row)) {
			return res.status(400).json({
				error: 'Tile coordinates must be valid integers'
			});
		}

		const cacheKey = `${zoomLevel}-${col}-${row}`;
		logger.info('Tile request', { z: zoomLevel, x: col, y: row });

		// Fetch tile from cache or OS Maps API
		const buffer = await getCachedTile(cacheKey, async () => {
			// Obtain OAuth token for authentication
			const mapAccessToken = await getMapAccessToken();
			if (!mapAccessToken) {
				throw new Error('Failed to obtain map access token');
			}

			// Construct OS Maps API URL (Light style, Web Mercator projection)
			const url = `https://api.os.uk/maps/raster/v1/zxy/Light_3857/${zoomLevel}/${col}/${row}.png`;
			logger.info('Fetching from OS Maps', { url });

			// Request tile from OS Maps with Bearer token authentication using default HTTPS certificate verification
			const tileResponse = await fetch(url, {
				headers: {
					Authorization: `Bearer ${mapAccessToken}`
				}
			});

			logger.info('OS Maps API response', {
				status: tileResponse.status,
				statusText: tileResponse.statusText
			});

			// Check for HTTP errors from OS Maps API
			if (!tileResponse.ok) {
				const errorText = await tileResponse.text();
				logger.error({
					msg: 'OS Maps API error response',
					status: tileResponse.status,
					statusText: tileResponse.statusText,
					errorBody: errorText.substring(0, 200)
				});

				// Preserve HTTP status code for client response
				const error = new Error(
					`OS Maps API returned ${tileResponse.status} ${tileResponse.statusText}`
				);
				error.statusCode = tileResponse.status;
				throw error;
			}

			// Convert tile response to buffer for streaming
			return await tileResponse.arrayBuffer();
		});

		logger.info('Tile loaded from cache or API', { byteLength: buffer.byteLength });

		// Return tile with proper HTTP headers for browser caching
		res.writeHead(200, {
			'Content-Type': 'image/png',
			'Content-Length': buffer.byteLength,
			'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
			'Access-Control-Allow-Origin': '*'
		});

		res.end(Buffer.from(buffer));
	} catch (error) {
		// Log error details for debugging
		logger.error({
			msg: 'Tile proxy error - failed to fetch or serve tile',
			error: error.message,
			stack: error.stack
		});

		// Return appropriate HTTP status code and error details to client
		const statusCode = error.statusCode || 500;
		res.status(statusCode).json({
			error: 'Failed to fetch map tile',
			message: error.message
		});
	}
};

module.exports = { getMapTile };
