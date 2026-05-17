'use strict';

const WMTSCapabilities = require('ol/format/WMTSCapabilities.js').default;
const { default: WMTS, optionsFromCapabilities } = require('ol/source/WMTS.js');
const TileLayer = require('ol/layer/Tile.js').default;
const { EPSG_27700, OS_MAPS_LAYER_NAME, BEARER_TOKEN_PREFIX } = require('./constants');

const logger = (typeof window !== 'undefined' && window.appLogger) || {
	debug: () => {},
	error: console.error
};

/**
 * Parses WMTS capabilities XML and builds an authenticated OL tile layer
 * for the OS Maps `Outdoor_27700` layer in the EPSG:27700 matrix set.
 *
 * Tile requests are authenticated with the provided bearer token.
 * Individual tile load failures are logged and do not interrupt the map.
 *
 * @param {string} accessToken OS Maps bearer token
 * @param {string} wmtsXml Raw capabilities XML from {@link module:get-map-wmts}
 * @returns {{ tileLayer: import('ol/layer/Tile').default, wmtsOptions: Object }}
 */
function buildTileLayer(accessToken, wmtsXml) {
	const parser = new WMTSCapabilities();
	const result = parser.read(wmtsXml);
	const wmtsOptions = optionsFromCapabilities(result, {
		layer: OS_MAPS_LAYER_NAME,
		matrixSet: EPSG_27700
	});

	const tileSource = new WMTS({
		attributions: [`&copy; Crown copyright and database rights ${new Date().getFullYear()}`],
		tileLoadFunction: async (tile, src) => {
			try {
				const res = await fetch(src, {
					headers: { Authorization: BEARER_TOKEN_PREFIX + accessToken }
				});
				if (!res.ok) throw new Error(`Tile fetch failed: ${res.status}`);
				const arrayBuffer = await res.arrayBuffer();
				const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
				tile.getImage().src = `data:image/png;base64,${base64}`;
			} catch (err) {
				logger.error('[projects-map] tile load error:', err);
			}
		},
		...wmtsOptions
	});

	return { tileLayer: new TileLayer({ source: tileSource }), wmtsOptions };
}

module.exports = { buildTileLayer };
