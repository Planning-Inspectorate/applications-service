/**
 * Map Tile Proxy Router
 *
 * Proxies tile requests to OS Maps API with OAuth Bearer token authentication
 * This keeps API credentials server-side and secure
 */

const express = require('express');
const fetch = require('node-fetch');
const { getMapAccessToken } = require('../_services/os-maps-token.service');

const mapTileRouter = express.Router();

/**
 * GET /api/map-tile/:z/:x/:y
 * Proxies a single OS Maps tile request with Bearer token authentication
 *
 * @param {number} z - Zoom level
 * @param {number} x - Tile column
 * @param {number} y - Tile row
 * @returns {Buffer} PNG tile image
 */
mapTileRouter.get('/:z/:x/:y', async (req, res) => {
	try {
		const { z, x, y } = req.params;
		console.log(`[map-tile] Received request for z=${z} x=${x} y=${y}`);

		// Validate tile coordinates
		if (!z || !x || !y) {
			return res.status(400).json({ error: 'Invalid tile coordinates' });
		}

		// Get OAuth token from backend service
		console.log('[map-tile] Getting OAuth token...');
		const mapAccessToken = await getMapAccessToken();
		console.log(`[map-tile] Got token: ${mapAccessToken ? 'success' : 'null'}`);

		// Fetch tile from OS Maps API with Bearer token
		// Using Light_27700 (British National Grid projection - accurate for UK mapping)
		const url = `https://api.os.uk/maps/raster/v1/zxy/Light_27700/${z}/${x}/${y}.png`;
		console.log(`[map-tile] Fetching from: ${url}`);
		const tileResponse = await fetch(url, {
			headers: {
				Authorization: `Bearer ${mapAccessToken}`
			}
		});
		console.log(`[map-tile] Response status: ${tileResponse.status}`);

		if (!tileResponse.ok) {
			const errorText = await tileResponse.text();
			throw new Error(
				`Failed to fetch tile: ${tileResponse.status} ${tileResponse.statusText} - ${errorText}`
			);
		}

		const buffer = await tileResponse.arrayBuffer();
		console.log(`[map-tile] Got buffer, size: ${buffer.byteLength} bytes`);

		// Return tile with proper headers
		res.writeHead(200, {
			'Content-Type': 'image/png',
			'Content-Length': buffer.byteLength,
			'Cache-Control': 'public, max-age=86400' // Cache tiles for 1 day
		});

		res.end(Buffer.from(buffer));
		console.log(`[map-tile] Sent tile successfully`);
	} catch (error) {
		console.error('[map-tile] Error:', error.message, error.stack);
		res.status(500).json({ error: 'Failed to fetch map tile' });
	}
});

module.exports = { mapTileRouter };
