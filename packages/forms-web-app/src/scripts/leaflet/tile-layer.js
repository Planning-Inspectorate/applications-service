import L from 'leaflet';

/**
 * Custom Leaflet tile layer with Bearer token authentication for OS Maps API
 */
L.TileLayer.Bearer = L.TileLayer.extend({
	initialize: function (url, options) {
		L.TileLayer.prototype.initialize.call(this, url, options);
		this.token = options.token;
	},

	createTile: function (coords, done) {
		const tile = document.createElement('img');
		const url = this.getTileUrl(coords);

		fetch(url, {
			headers: {
				Authorization: `Bearer ${this.token}`
			}
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.arrayBuffer();
			})
			.then((buffer) => {
				const base64 = btoa(
					new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
				);
				tile.src = `data:image/png;base64,${base64}`;
				done(null, tile);
			})
			.catch((error) => {
				console.error('Error loading tile:', error);
				done(error);
			});

		return tile;
	}
});

L.tileLayer.bearer = function (url, options) {
	return new L.TileLayer.Bearer(url, options);
};

/**
 * Creates a tile layer with Bearer token authentication
 * @param {string} token - OAuth token for OS Maps API
 * @param {string} url - Tile server URL
 * @returns {L.TileLayer.Bearer} Configured tile layer
 */
export function createTileLayer(token, url) {
	return L.tileLayer.bearer(url, {
		maxZoom: 20,
		token: token
	});
}
