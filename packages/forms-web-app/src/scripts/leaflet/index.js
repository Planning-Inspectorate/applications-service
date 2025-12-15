import L from 'leaflet';
import 'proj4leaflet';

function leafletMap() {
	this.initiate = function (token, container, lat = 52.3, lng = -1.7, zoom = 0) {
		const mapResolutions = [896, 448, 224, 112, 56, 28, 14, 7, 3.5, 1.75];
		const crs27700 = new L.Proj.CRS(
			'EPSG:27700',
			'+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs',
			{
				resolutions: mapResolutions,
				origin: [-238375.0, 1376256.0]
			}
		);

		const mapOptions = {
			minZoom: 0,
			maxZoom: mapResolutions.length - 1,
			center: [lat, lng],
			zoom: zoom,
			crs: crs27700,
			maxBounds: [
				[49.56, -10.0],
				[62.0, 6.0]
			],
			attributionControl: false,
			zoomSnap: 1,
			zoomDelta: 1
		};

		const map = L.map(container, mapOptions);

		// Set up the tile layer with OAuth token
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

		// Add the custom tile layer to the map
		L.tileLayer
			.bearer('https://api.os.uk/maps/raster/v1/zxy/Light_27700/{z}/{x}/{y}.png', {
				maxZoom: 20,
				token: token
			})
			.addTo(map);

		// Load GeoJSON data
		this.loadGeoJsonFromAPI(map);

		return map;
	};

	this.loadGeoJsonFromAPI = async function (map) {
		try {
			const response = await fetch('/api/geojson');

			if (!response.ok) {
				throw new Error(`HTTP error while fetching geojson. status: ${response.status}`);
			}

			const geojsonData = await response.json();

			if (geojsonData && geojsonData.features) {
				L.geoJSON(geojsonData, {
					style: function () {
						return {
							color: '#e52c00',
							weight: 2,
							opacity: 0.8,
							fillOpacity: 0.2
						};
					},
					onEachFeature: function (feature, layer) {
						if (feature.properties) {
							const popupContent = Object.entries(feature.properties)
								.map(([key, value]) => `<strong>${key}:</strong> ${value}`)
								.join('<br>');
							layer.bindPopup(popupContent);
						}
					}
				}).addTo(map);

				console.log(`Loaded ${geojsonData.features.length} features`);
			}
		} catch (error) {
			console.error('Error loading GeoJSON:', error);
		}
	};
}

export default leafletMap;
