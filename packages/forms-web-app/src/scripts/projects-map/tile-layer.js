import WMTS, { optionsFromCapabilities } from 'ol/source/WMTS.js';
import WMTSCapabilities from 'ol/format/WMTSCapabilities.js';
import TileLayer from 'ol/layer/Tile.js';
import { WMTS_LAYER, WMTS_MATRIX_SET, WMTS_CAPABILITIES_URL } from './constants.js';

const logger = window.appLogger || { debug: () => {}, error: console.error };

/** Fetches WMTS capabilities XML from the OS Maps API. */
async function fetchCapabilities(accessToken) {
	const response = await fetch(WMTS_CAPABILITIES_URL, {
		headers: { Authorization: 'Bearer ' + accessToken }
	});
	return await response.text();
}

/** Builds an authenticated OS Maps WMTS tile layer. */
export async function buildTileLayer(accessToken) {
	const wmtsXml = await fetchCapabilities(accessToken);

	const parser = new WMTSCapabilities();
	const result = parser.read(wmtsXml);
	const wmtsOptions = optionsFromCapabilities(result, {
		layer: WMTS_LAYER,
		matrixSet: WMTS_MATRIX_SET
	});

	const tileSource = new WMTS({
		attributions: [`&copy; Crown copyright and database rights ${new Date().getFullYear()}`],
		tileLoadFunction: async (tile, src) => {
			try {
				const res = await fetch(src, { headers: { Authorization: 'Bearer ' + accessToken } });
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
