import L from 'leaflet';
import 'proj4leaflet';

function leafletMap() {
	this.initiate = function (token, container, lat = 52.3, lng = -1.7, zoom = 5) {
		const crs27700 = new L.Proj.CRS(
			'EPSG:27700',
			'+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs',
			{
				resolutions: [896, 448, 224, 112, 56, 28, 14, 7, 3.5, 1.75],
				origin: [-238375.0, 1376256.0]
			}
		);

		const mapOptions = {
			minZoom: 0,
			maxZoom: 9, //max zoom available for Light_27700 tile set
			center: [lat, lng], //rough center of UK in WGS84, will be converted by CRS to BNG
			zoom: zoom || 0,
			crs: crs27700,
			//format for max bounds [[southLat, westLon], [northLat, eastLon]]
			maxBounds: [
				[49.56, -10.0],
				[62.0, 6.0]
			],
			attributionControl: false,
			zoomSnap: 1, //prevents fractional zoom levels
			zoomDelta: 1 //controls zoom increments
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
						// Convert to base64 data URL instead of blob URL
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

		//Add the custom tile layer to the map
		L.tileLayer
			.bearer('https://api.os.uk/maps/raster/v1/zxy/Light_27700/{z}/{x}/{y}.png', {
				maxZoom: 20,
				token: token
			})
			.addTo(map);
		//use geojson and show project boundaries if available, otherwise fallback to lng/lat and use pins
		//for now load from public
		this.loadGeoJsonFromFile(map);

		return map;
	};
	this.loadGeoJsonFromFile = async function (map) {
		try {
			//loading indicator
			const loadingControl = L.control({ position: 'topright' });
			loadingControl.onAdd = function () {
				const div = L.DomUtil.create('div', 'loading-control');
				//TODO: move into dedicated CSS file
				div.innerHTML = 'Loading boundaries...';
				div.style.backgroundColor = 'white';
				div.style.padding = '5px';
				div.style.borderRadius = '3px';
				return div;
			};
			loadingControl.addTo(map);

			//const response = await fetch('/public/master_geojson.json'); //local file for testing
			const response = await fetch('/api/geojson');

			console.log(response);

			if (!response.ok) {
				throw new Error(`HTTP error while fetching geojson. status: ${response.status}`);
			}

			const geojsonData = await response.json();

			if (geojsonData && geojsonData.features) {
				//geojson layer with styling and popups
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
						//popup with feature properties if available
						if (feature.properties) {
							const popupContent = Object.entries(feature.properties)
								.map(([key, value]) => `<strong>${key}:</strong> ${value}`)
								.join('<br>');
							layer.bindPopup(popupContent);
						}
					}
				}).addTo(map);

				map.removeControl(loadingControl);

				console.log(`Loaded ${geojsonData.features.length} features`);
			}
		} catch (error) {
			console.error('Error loading GeoJSON from file:', error);

			//remove indicator on error
			try {
				map.eachLayer(function (layer) {
					if (layer.options && layer.options.position === 'topright') {
						map.removeControl(layer);
					}
				});
			} catch (e) {
				console.error('Error removing loading indicator:', e);
			}
		}
	};
}

export default leafletMap;
