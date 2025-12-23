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

		// Store map instance globally for filter toggle
		window.leafletMapInstance = map;

		// Add tile layer via proxy endpoint
		L.tileLayer('/api/map-tile/{z}/{x}/{y}', {
			maxZoom: 20,
			tileSize: 256,
			attribution: '© Crown Copyright and database right'
		}).addTo(map);

		// Load project markers from API
		this.loadProjectMarkers(map);

		return map;
	};

	this.loadProjectMarkers = async function (map) {
		try {
			console.log('Loading project markers...');

			const response = await fetch('/api/projects-map');

			if (!response.ok) {
				throw new Error(`Failed to fetch projects: ${response.status}`);
			}

			const projects = await response.json();
			console.log(`Fetched ${projects.length} projects`);

			// Create markers for each project
			projects.forEach((project) => {
				const [lat, lng] = project.coordinates;

				const marker = L.marker([lat, lng], {
					title: project.projectName
				});

				const popupContent = `
					<strong>${project.projectName}</strong><br/>
					Case: ${project.caseReference}<br/>
					Stage: ${project.stage}<br/>
					Region: ${project.region}
				`;

				marker.bindPopup(popupContent);
				marker.addTo(map);
			});

			console.log(`Added ${projects.length} markers to map`);
		} catch (error) {
			console.error('Error loading project markers:', error);
		}
	};

	this.loadGeoJsonFromFile = async function (map) {
		try {
			const loadingControl = L.control({ position: 'topright' });
			loadingControl.onAdd = function () {
				const div = L.DomUtil.create('div', 'loading-control');
				div.innerHTML = 'Loading boundaries...';
				div.style.backgroundColor = 'white';
				div.style.padding = '5px';
				div.style.borderRadius = '3px';
				return div;
			};
			loadingControl.addTo(map);

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

				map.removeControl(loadingControl);
				console.log(`Loaded ${geojsonData.features.length} features`);
			}
		} catch (error) {
			console.error('Error loading GeoJSON from file:', error);

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
