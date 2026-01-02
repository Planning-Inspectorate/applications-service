/**
 * Map Tile Proxy Router
 *
 * Routes for proxying tile requests to OS Maps API with OAuth Bearer token authentication.
 *
 * Usage:
 *   GET /api/map-tile/{z}/{x}/{y}
 *   Returns: PNG tile image
 */

const express = require('express');
const { getMapTile } = require('./controller');

const mapTileRouter = express.Router();

mapTileRouter.get('/:z/:x/:y', getMapTile);

module.exports = { mapTileRouter };
