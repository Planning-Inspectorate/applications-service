/**
 * Map Tile Proxy Router
 *
 * Proxies tile requests to OS Maps API with OAuth Bearer token authentication.
 * This keeps API credentials server-side and secure.
 *
 * Supports EPSG:3857 (Web Mercator) projection only.
 *
 * Usage:
 *   GET /api/map-tile/{z}/{x}/{y}
 *   Returns: PNG tile image
 */

const express = require('express');
const fetch = require('node-fetch');
const logger = require('../../lib/logger');
const { getMapAccessToken } = require('../_services/os-maps-token.service');

const mapTileRouter = express.Router();

// In-memory tile cache (stores up to 1000 tiles)
const tileCache = new Map();
const MAX_CACHE_SIZE = 1000;

/**
 * Get cached tile or fetch from OS API
 */
const getCachedTile = async (cacheKey, fetchFn) => {
	if (tileCache.has(cacheKey)) {
		return tileCache.get(cacheKey);
	}

	const tile = await fetchFn();

	// Keep cache size manageable
	if (tileCache.size >= MAX_CACHE_SIZE) {
		const firstKey = tileCache.keys().next().value;
		tileCache.delete(firstKey);
	}

	tileCache.set(cacheKey, tile);
	return tile;
};

/**
 * GET /api/map-tile/:z/:x/:y
 *
 * Proxies a single OS Maps tile request with Bearer token authentication.
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
mapTileRouter.get('/:z/:x/:y', async (req, res) => {
	try {
		const { z, x, y } = req.params;

		// Validate tile coordinates
		if (!z || !x || !y) {
			return res.status(400).json({
				error: 'Invalid tile coordinates. Required: z, x, y'
			});
		}

		// Validate coordinates are numbers
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

		// Use cached tile if available
		const buffer = await getCachedTile(cacheKey, async () => {
			// Get OAuth token from backend service
			const mapAccessToken = await getMapAccessToken();
			if (!mapAccessToken) {
				throw new Error('Failed to obtain map access token');
			}

			// Construct OS Maps API URL for Light style, Web Mercator (3857)
			const url = `https://api.os.uk/maps/raster/v1/zxy/Light_3857/${zoomLevel}/${col}/${row}.png`;
			logger.info('Fetching from OS Maps', { url });

			// Fetch tile from OS Maps API with Bearer token
			const tileResponse = await fetch(url, {
				headers: {
					Authorization: `Bearer ${mapAccessToken}`
				}
			});

			logger.info('OS API response', {
				status: tileResponse.status,
				statusText: tileResponse.statusText
			});

			// Handle non-OK responses
			if (!tileResponse.ok) {
				const errorText = await tileResponse.text();
				logger.error('OS API error', {
					status: tileResponse.status,
					errorText: errorText.substring(0, 200)
				});

				// Throw error with status code for outer handler
				const error = new Error(`OS Maps API returned ${tileResponse.status}`);
				error.statusCode = tileResponse.status;
				throw error;
			}

			// Read tile data
			return await tileResponse.arrayBuffer();
		});

		logger.info('Tile loaded', { byteLength: buffer.byteLength });

		// Return tile with proper HTTP headers
		res.writeHead(200, {
			'Content-Type': 'image/png',
			'Content-Length': buffer.byteLength,
			'Cache-Control': 'public, max-age=86400', // Cache tiles for 1 day
			'Access-Control-Allow-Origin': '*'
		});

		res.end(Buffer.from(buffer));
	} catch (error) {
		logger.error('Tile proxy error', { error: error.message, stack: error.stack });
		const statusCode = error.statusCode || 500;
		res.status(statusCode).json({
			error: 'Failed to fetch map tile',
			message: error.message
		});
	}
});

module.exports = { mapTileRouter };
