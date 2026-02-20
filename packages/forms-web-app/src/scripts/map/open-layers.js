const proj4 = require('proj4/dist/proj4');
const { register } = require('ol/proj/proj4.js');
const { get: getProjection } = require('ol/proj.js');
const WMTS = require('ol/source/WMTS.js').default;
const { optionsFromCapabilities } = require('ol/source/WMTS.js');
const WMTSCapabilities = require('ol/format/WMTSCapabilities.js').default;
const TileLayer = require('ol/layer/Tile.js').default;
const Map = require('ol/Map.js').default;
const View = require('ol/View.js').default;
const { transform } = require('ol/proj');
const { createEmpty, extend } = require('ol/extent');
const VectorSource = require('ol/source/Vector').default;
const Cluster = require('ol/source/Cluster').default;
const Style = require('ol/style/Style').default;
const Circle = require('ol/style/Circle').default;
const Text = require('ol/style/Text').default;
const Fill = require('ol/style/Fill').default;
const Stroke = require('ol/style/Stroke').default;
const Feature = require('ol/Feature').default;
const Point = require('ol/geom/Point').default;
const TileState = require('ol/TileState.js').default;
const AnimatedCluster = require('ol-ext/layer/AnimatedCluster').default;
const Popup = require('ol-ext/overlay/Popup').default;
const { getMapWMTS } = require('./get-map-wmts');
const { getControls } = require('./get-controls');

/**
 * OpenLayers Map - Basic map implementation
 * Handles initialization of OpenLayers map with OS Maps tile layer
 *
 * @class OpenLayersMap
 */
function OpenLayersMap() {
	/**
	 * Initialize OpenLayers map with configuration
	 *
	 * @param {Object} config - Map configuration
	 * @param {string} config.elementId - DOM element ID for map container
	 * @param {string} config.accessToken - OAuth token for OS Maps API
	 * @param {Array<number>} config.center - Center coordinates [lng, lat] in WGS84
	 * @param {number} config.zoom - Zoom level (0-9)
	 * @param {Object} config.crs - CRS configuration (code, proj4String, extent)
	 * @returns {Promise<Map>} Initialized OpenLayers Map instance
	 */
	this.initiate = async (config) => {
		try {
			const { elementId, accessToken, center, zoom, markers = [], crs } = config;

			// Validate required configuration
			if (!crs || !crs.code || !crs.proj4String || !crs.extent) {
				throw new Error(
					'Missing required CRS configuration. Expected: { code, proj4String, extent }'
				);
			}

			// Fetch WMTS capabilities from OS Maps API
			const mapWMTS = await getMapWMTS(accessToken);

			// Register projection with proj4
			try {
				proj4.defs(crs.code, crs.proj4String);
				register(proj4);
			} catch (error) {
				window.pageDebug?.(`Failed to register ${crs.code} projection:`, error);
				throw new Error(`Unable to initialize ${crs.code} map projection`);
			}

			// Configure projection extent
			const projection = getProjection(crs.code);
			if (!projection) {
				throw new Error(`${crs.code} projection failed to load. Verify proj4 definitions.`);
			}

			projection.setExtent(crs.extent);

			// Parse WMTS capabilities and extract layer options
			const parser = new WMTSCapabilities();
			const result = parser.read(mapWMTS);

			const options = optionsFromCapabilities(result, {
				layer: 'Outdoor_27700',
				matrixSet: 'EPSG:27700'
			});

			// Create WMTS tile source with Bearer token authentication
			const tileSource = new WMTS({
				attributions: '&copy; Crown Copyright and Database Right',
				tileLoadFunction: (tile, src) => {
					fetch(src, {
						headers: {
							Authorization: 'Bearer ' + accessToken
						}
					})
						.then((response) => {
							if (!response.ok) {
								throw new Error(`Tile fetch failed with status ${response.status}`);
							}
							return response.blob();
						})
						.then((blob) => {
							tile.getImage().src = URL.createObjectURL(blob);
						})
						.catch((error) => {
							window.pageDebug?.('Tile load failed for:', src, error);
							tile.setState(TileState.ERROR);
						});
				},
				...options
			});

			// Create tile layer
			const tileLayer = new TileLayer({ source: tileSource });

			// Transform center from WGS84 to EPSG:27700
			const centerEpsg27700 = center
				? transform(center, 'EPSG:4326', 'EPSG:27700')
				: [400000, 200000];

			// Create and configure map
			const map = new Map({
				controls: getControls(),
				target: elementId,
				layers: [tileLayer],
				view: new View({
					projection: crs.code,
					extent: projection.getExtent(),
					smoothResolutionConstraint: false,
					resolutions: options.tileGrid.getResolutions(),
					center: centerEpsg27700,
					minZoom: zoom,
					maxZoom: 9,
					zoom
				})
			});

			// Create vector source for markers
			const markerSource = new VectorSource();

			// Create cluster source (groups nearby markers)
			const clusterSource = new Cluster({
				distance: 40, // Cluster radius in pixels
				source: markerSource
			});

			// Style function for cluster layer
			const getClusterStyle = (feature) => {
				const size = feature.get('features').length;

				// Single marker style - red dot with white border and shadow
				if (size === 1) {
					return [
						// Shadow layer (slightly offset, semi-transparent gray)
						new Style({
							image: new Circle({
								radius: 10,
								fill: new Fill({
									color: 'rgba(0, 0, 0, 0.15)'
								})
							})
						}),
						// Main marker (red with white border)
						new Style({
							image: new Circle({
								radius: 9,
								fill: new Fill({
									color: '#dc2626' // Red
								}),
								stroke: new Stroke({
									color: '#ffffff', // White border
									width: 3
								})
							})
						})
					];
				}

				// Cluster style - red with white border and shadow, shows count
				return [
					// Shadow layer
					new Style({
						image: new Circle({
							radius: 28,
							fill: new Fill({
								color: 'rgba(0, 0, 0, 0.15)'
							})
						})
					}),
					// Main cluster circle (red with white border)
					new Style({
						image: new Circle({
							radius: 26,
							fill: new Fill({
								color: '#dc2626' // Red
							}),
							stroke: new Stroke({
								color: '#ffffff', // White border
								width: 3
							})
						}),
						text: new Text({
							text: size.toString(),
							fill: new Fill({
								color: '#ffffff'
							}),
							font: 'bold 16px sans-serif'
						})
					})
				];
			};

			// Create animated cluster layer
			const markerLayer = new AnimatedCluster({
				source: clusterSource,
				animationDuration: 700,
				style: getClusterStyle
			});

			map.addLayer(markerLayer);

			// Create ol-ext Popup overlay for displaying marker information
			const popup = new Popup({
				popupClass: 'default',
				closeBox: true,
				onshow: function () {
					window.pageDebug?.('Popup opened');
				},
				onclose: function () {
					window.pageDebug?.('Popup closed');
				},
				positioning: 'auto',
				autoPan: {
					animation: { duration: 250 }
				}
			});

			map.addOverlay(popup);

			// Add all markers from GeoJSON features
			if (markers && Array.isArray(markers)) {
				const coordMap = new Map(); // Track coordinates to handle duplicates

				markers.forEach((feature) => {
					try {
						if (feature.geometry && feature.geometry.coordinates) {
							// Transform coordinates from WGS84 to EPSG:27700
							const coords = feature.geometry.coordinates;
							const transformedCoords = transform(coords, 'EPSG:4326', 'EPSG:27700');

							// Create a key for tracking duplicate coordinates
							const coordKey = transformedCoords.map((c) => c.toFixed(2)).join(',');
							const count = coordMap.get(coordKey) || 0;

							// Add slight random offset to prevent exact overlaps
							let offsetCoords = [...transformedCoords];
							if (count > 0) {
								const offsetDistance = 50 * (count + 1); // 50m per duplicate
								const angle = Math.random() * Math.PI * 2; // Random direction
								offsetCoords[0] += Math.cos(angle) * offsetDistance;
								offsetCoords[1] += Math.sin(angle) * offsetDistance;
							}

							coordMap.set(coordKey, count + 1);

							// Create marker feature with properties
							const marker = new Feature({
								geometry: new Point(offsetCoords),
								...feature.properties
							});

							// Add to underlying markerSource (clustering is handled by clusterSource)
							markerSource.addFeature(marker);
						}
					} catch (error) {
						window.pageDebug?.('Error adding marker:', error, 'Feature:', feature);
					}
				});
			}

			// Get actual DOM element for map container
			const mapContainer = document.getElementById(elementId);

			// Change cursor to pointer when hovering over markers
			map.on('pointermove', (evt) => {
				const pixel = map.getEventPixel(evt.originalEvent);
				const hit = map.hasFeatureAtPixel(pixel, {
					layerFilter: (layer) => layer === markerLayer
				});
				if (mapContainer) {
					mapContainer.style.cursor = hit ? 'pointer' : '';
				}
			});

			// Keyboard accessibility - allow Enter/Space to interact with map
			if (mapContainer) {
				mapContainer.addEventListener('keydown', (evt) => {
					if (evt.key === 'Enter' || evt.key === ' ') {
						// Get map center and check for features there
						const centerPixel = [mapContainer.offsetWidth / 2, mapContainer.offsetHeight / 2];
						const features = map.getFeaturesAtPixel(centerPixel, {
							layerFilter: (layer) => layer === markerLayer
						});

						if (features.length > 0) {
							// Trigger same behavior as click
							const feature = features[0];
							const clusteredFeatures = feature.get('features');

							if (clusteredFeatures && clusteredFeatures.length === 1) {
								const f = clusteredFeatures[0];
								popup.show(f.getGeometry().getFirstCoordinate(), getPopupContent(f));
							}
						}
					}
				});
			}

			// Helper function to generate popup content HTML (matches old Leaflet structure)
			const getPopupContent = (feature) => {
				const props = feature.getProperties();
				const projectName = props.projectName || 'Unknown Project';
				const caseRef = props.caseRef || '';
				const stage = props.stage || '';

				return `<div class="cluster-popup-container">
					<h2 class="cluster-popup-header">1 project selected</h2>
					<table class="cluster-popup-table">
						<tr class="cluster-popup-row">
							<td class="cluster-popup-cell-name">
								<a href="/projects/${caseRef}" class="cluster-popup-link">${projectName}</a>
							</td>
							<td class="cluster-popup-cell-stage">
								${stage}
							</td>
						</tr>
					</table>
				</div>`;
			};

			// Handle marker/cluster click (works on both desktop and touch)
			map.on('singleclick', (evt) => {
				const features = map.getFeaturesAtPixel(evt.pixel, {
					layerFilter: (layer) => layer === markerLayer
				});

				if (features.length > 0) {
					const feature = features[0];
					const clusteredFeatures = feature.get('features');

					// Check if this is a cluster (multiple features)
					if (clusteredFeatures && clusteredFeatures.length > 1) {
						// Calculate extent of all features in cluster
						const extent = createEmpty();
						clusteredFeatures.forEach((f) => {
							const coords = f.getGeometry().getCoordinates();
							extend(extent, [coords[0], coords[1], coords[0], coords[1]]);
						});

						const view = map.getView();
						// Fit view to cluster extent with padding
						view.fit(extent, {
							padding: [50, 50, 50, 50],
							duration: 500,
							maxZoom: 9
						});

						// Hide popup when clicking cluster
						popup.hide();
					} else if (clusteredFeatures && clusteredFeatures.length === 1) {
						// Single feature in cluster - show popup for actual feature
						const feature = clusteredFeatures[0];
						popup.show(feature.getGeometry().getFirstCoordinate(), getPopupContent(feature));
					} else {
						// Fallback to cluster feature if no clustered features found
						popup.show(feature.getGeometry().getFirstCoordinate(), getPopupContent(feature));
					}
				} else {
					// Hide popup when clicking empty area
					popup.hide();
				}
			});

			// Expose map on window for global access
			if (typeof window !== 'undefined') {
				window._applicationService = window._applicationService || {};
				window._applicationService.map = map;
			}

			return map;
		} catch (error) {
			window.pageDebug?.('Error initializing OpenLayers map:', error);
			throw error;
		}
	};
}

module.exports = OpenLayersMap;
