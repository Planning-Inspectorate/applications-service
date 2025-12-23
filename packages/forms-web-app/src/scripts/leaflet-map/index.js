import L from 'leaflet';
import 'proj4leaflet';

function leafletMap() {
	// Map configuration constants
	const MAP_CONFIG = {
		// Default center (UK center point)
		DEFAULT_CENTER_LAT: 52.3,
		DEFAULT_CENTER_LNG: -1.7,
		DEFAULT_ZOOM: -8,

		// EPSG:27700 (British National Grid) projection
		RESOLUTIONS: [896, 448, 224, 112, 56, 28, 14, 7, 3.5, 1.75],
		PROJECTION_ORIGIN: [-238375.0, 1376256.0],
		PROJECTION_STRING:
			'+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs',

		// Map bounds (UK boundaries)
		MAX_BOUNDS_SW: [49.56, -10.0], // Southwest corner
		MAX_BOUNDS_NE: [62.0, 6.0], // Northeast corner

		// Tile layer config
		TILE_MAX_ZOOM: 20,
		TILE_SIZE: 256,
		TILE_ATTRIBUTION: '© Crown Copyright and database right'
	};

	this.initiate = function (
		token,
		container,
		lat = MAP_CONFIG.DEFAULT_CENTER_LAT,
		lng = MAP_CONFIG.DEFAULT_CENTER_LNG,
		zoom = MAP_CONFIG.DEFAULT_ZOOM
	) {
		console.log(
			'leafletMap.initiate called with container:',
			container,
			'lat:',
			lat,
			'lng:',
			lng,
			'zoom:',
			zoom
		);

		// Setup EPSG:27700 (British National Grid) projection
		const crs27700 = new L.Proj.CRS('EPSG:27700', MAP_CONFIG.PROJECTION_STRING, {
			resolutions: MAP_CONFIG.RESOLUTIONS,
			origin: MAP_CONFIG.PROJECTION_ORIGIN
		});

		const mapOptions = {
			minZoom: 0,
			maxZoom: MAP_CONFIG.RESOLUTIONS.length - 1,
			center: [lat, lng],
			zoom: zoom,
			crs: crs27700,
			maxBounds: [MAP_CONFIG.MAX_BOUNDS_SW, MAP_CONFIG.MAX_BOUNDS_NE],
			attributionControl: false,
			zoomSnap: 1,
			zoomDelta: 1
		};

		const map = L.map(container, mapOptions);

		// Store map instance globally for filter toggle
		window.leafletMapInstance = map;

		// Add tile layer via proxy endpoint (Light_27700 - accurate OS Maps with EPSG:27700)
		L.tileLayer('/api/map-tile/{z}/{x}/{y}', {
			maxZoom: MAP_CONFIG.TILE_MAX_ZOOM,
			tileSize: MAP_CONFIG.TILE_SIZE,
			attribution: MAP_CONFIG.TILE_ATTRIBUTION
		}).addTo(map);

		// Load project markers from API
		this.loadProjectMarkers(map);

		return map;
	};

	this.getMarkerIcon = function () {
		return L.divIcon({
			className: 'project-marker',
			html: `<div class="project-marker-icon"></div>`,
			iconSize: [25, 41],
			iconAnchor: [12.5, 41],
			popupAnchor: [0, -35]
		});
	};

	this.trimSummary = function (text, wordLimit = 20) {
		// Validate input
		if (typeof text !== 'string') {
			throw new TypeError('Input must be a string.');
		}
		if (!Number.isInteger(wordLimit) || wordLimit <= 0) {
			throw new RangeError('Word limit must be a positive integer.');
		}

		// Remove extra spaces and split into words
		const words = text.trim().split(/\s+/);

		// If within limit, return as is
		if (words.length <= wordLimit) {
			return text.trim();
		}

		// Join only the allowed number of words and add ellipsis
		return words.slice(0, wordLimit).join(' ') + '...';
	};

	this.createPopupContent = function (project) {
		return `
			<div class="cluster-popup-container">
				<h2 class="cluster-popup-header">1 project selected</h2>
				<table class="cluster-popup-table">
					<tr class="cluster-popup-row">
						<td class="cluster-popup-cell-name">
							<a href="/projects/${project.caseReference}" class="cluster-popup-link">${project.projectName}</a>
						</td>
						<td class="cluster-popup-cell-stage">
							${project.stageName}
						</td>
					</tr>
					${
						project.summary
							? `<tr class="cluster-popup-row cluster-popup-last-row">
						<td class="cluster-popup-cell-name">
							${this.trimSummary(project.summary)}
						</td>
					</tr>`
							: ''
					}
				</table>
			</div>
		`;
	};

	this.loadProjectMarkers = async function (map) {
		try {
			console.log('Loading project markers...');

			const response = await fetch('/api/projects-map');
			if (!response.ok) {
				throw new Error(`Failed to fetch projects: ${response.status}`);
			}

			const projects = await response.json();
			if (!projects || projects.length === 0) {
				console.warn('No projects returned from API');
				return;
			}

			// Create markers for each project
			const markerGroup = L.featureGroup();
			projects.forEach((project) => {
				try {
					const [lat, lng] = project.coordinates;
					const marker = L.marker([lat, lng], { icon: this.getMarkerIcon() });
					marker.bindPopup(this.createPopupContent(project), { className: 'cluster-popup' });
					markerGroup.addLayer(marker);
				} catch (error) {
					console.error('Error creating marker:', error);
				}
			});

			markerGroup.addTo(map);
			map.fitBounds(markerGroup.getBounds());
			console.log(`✅ ${projects.length} projects on map`);
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
