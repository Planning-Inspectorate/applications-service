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

		// Validate tile coordinates
		if (!z || !x || !y) {
			return res.status(400).json({ error: 'Invalid tile coordinates' });
		}

		// Get OAuth token from backend service
		const mapAccessToken = await getMapAccessToken();

		// Fetch tile from OS Maps API with Bearer token
		const tileResponse = await fetch(
			`https://api.os.uk/maps/raster/v1/zxy/Light_27700/${z}/${x}/${y}.png`,
			{
				headers: {
					Authorization: `Bearer ${mapAccessToken}`
				}
			}
		);

		if (!tileResponse.ok) {
			throw new Error(`Failed to fetch tile: ${tileResponse.status} ${tileResponse.statusText}`);
		}

		const buffer = await tileResponse.arrayBuffer();

		// Return tile with proper headers
		res.writeHead(200, {
			'Content-Type': 'image/png',
			'Content-Length': buffer.byteLength,
			'Cache-Control': 'public, max-age=86400' // Cache tiles for 1 day
		});

		res.end(Buffer.from(buffer));
	} catch (error) {
		console.error('Error fetching map tile:', error.message);
		res.status(500).json({ error: 'Failed to fetch map tile' });
	}
});

module.exports = { mapTileRouter };
