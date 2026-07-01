import Map from 'ol/Map.js';
import View from 'ol/View.js';
import VectorSource from 'ol/source/Vector.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import {
	UK_CENTRE_EPSG27700,
	DEFAULT_ZOOM,
	MIN_ZOOM,
	MAX_ZOOM,
	SOURCE_PROJECTION,
	TARGET_PROJECTION,
	PROP_CASE_REFERENCE,
	FIT_PADDING,
	FIT_EXTENT,
	ALL_PROJECTS_MAP,
	PROJECT_MAP,
	BOUNDARIES_MAP_VIEW,
	MARKERS_MAP_VIEW,
	MULTI_POINT,
	SINGLE_POINT,
	GEOJSON
} from './constants.js';
import { buildTileLayer } from './tile-layer.js';
import { registerProjection, buildControls, bindZoomButtonState } from './map-setup.js';
import { buildClusterLayer, buildBoundaryLayer, buildMarkerLayer } from './layers.js';
import { createPopup, getBoundariesPopup, getMarkersPopup } from './popup.js';
import { normalizeMapInput } from './normalize-map-input.js';

const logger = window.appLogger || { debug: () => {}, error: console.error };

export const getCaseReference = (feature) => feature.get(PROP_CASE_REFERENCE) || undefined;

/**
 * Fetches boundary polygons from the server, removes duplicate point markers
 * for projects that have polygon boundaries on the individual project map, and adds the boundary layer to the map.
 */
async function loadMasterBoundaries(map, pointSource, boundaryGeoJsonUrl, target) {
	try {
		const response = await fetch(boundaryGeoJsonUrl);

		if (!response.ok) {
			throw new Error(`Boundary fetch failed: ${response.status}`);
		}

		const boundaryFeatures = new GeoJSON().readFeatures(await response.json(), {
			dataProjection: SOURCE_PROJECTION,
			featureProjection: TARGET_PROJECTION
		});

		if (target === PROJECT_MAP) {
			const polygonProjects = new Set(
				boundaryFeatures.map((feature) => getCaseReference(feature)).filter(Boolean)
			);

			pointSource.getFeatures().forEach((feature) => {
				if (polygonProjects.has(getCaseReference(feature))) {
					pointSource.removeFeature(feature);
				}
			});
		}

		map.addLayer(buildBoundaryLayer(boundaryFeatures));
	} catch (error) {
		logger.error('[projects-map] failed loading boundaries:', error);
	}
}

async function loadFilteredBoundaries(map, pointSource) {
	const caseRefs = pointSource.getFeatures().map((f) => f.get(PROP_CASE_REFERENCE));

	const boundarySource = new VectorSource();

	const boundaryLayer = buildBoundaryLayer([], boundarySource);

	map.addLayer(boundaryLayer);

	caseRefs.forEach(async (caseRef) => {
		try {
			const response = await fetch(`/projects/${caseRef}/boundary-geojson`);

			// some cases do not have boundaries
			if (response.status === 204) {
				logger.debug(`[projects-map] no boundary found for ${caseRef}`);
				return;
			}

			if (!response.ok) {
				return;
			}

			const geoJson = await response.json();

			const features = new GeoJSON().readFeatures(geoJson, {
				dataProjection: SOURCE_PROJECTION,
				featureProjection: TARGET_PROJECTION
			});

			boundarySource.addFeatures(features);
		} catch (error) {
			logger.error(`[projects-map] failed loading boundary ${caseRef}`, error);
		}
	});
}

function projectsMap() {
	/**
	 * Initialises the projects map.
	 * @param {string} accessToken OS Maps Bearer token
	 * @param {string} target DOM element id for the map
	 * @param {Object|number[]} mapData GeoJSON FeatureCollection or [lng, lat] coordinate
	 * @param {Object} [options] Configuration options
	 */
	this.initiate = async (accessToken, target, mapData, options = {}) => {
		const mapElement = document.getElementById(target);

		let popupText = { projectSelected: '', projectsSelected: '' };
		let activeMapView = '';

		if (target === ALL_PROJECTS_MAP) {
			if (mapElement) {
				popupText = {
					projectSelected: mapElement.dataset?.projectSelected || '',
					projectsSelected: mapElement.dataset?.projectsSelected || ''
				};
			}

			activeMapView =
				mapElement.dataset?.activeMapView === BOUNDARIES_MAP_VIEW
					? BOUNDARIES_MAP_VIEW
					: MARKERS_MAP_VIEW;
		}

		const {
			zoom,
			fitStrategy = 'center',
			enableClustering = true,
			enablePopup = true,
			loadBoundaries: shouldLoadBoundaries = true,
			boundaryGeoJsonUrl
		} = options;

		try {
			const epsg27700 = registerProjection();
			const { tileLayer, wmtsOptions } = await buildTileLayer(accessToken);
			const { features, mode } = normalizeMapInput(mapData);
			const layers = [tileLayer];
			const pointSource = new VectorSource({ features });

			if (target === PROJECT_MAP) {
				if (mode === MULTI_POINT && enableClustering) {
					layers.push(buildClusterLayer(pointSource).clusterLayer);
				} else if (mode === SINGLE_POINT) {
					const coordinate = features[0]?.getGeometry().getCoordinates();
					if (coordinate) layers.push(buildMarkerLayer(coordinate));
				} else if (mode === GEOJSON) {
					layers.push(buildBoundaryLayer(features));
				}
			} else if (target === ALL_PROJECTS_MAP) {
				if (activeMapView === BOUNDARIES_MAP_VIEW) {
					if (mode === GEOJSON) {
						layers.push(buildBoundaryLayer(features));
					}
				} else {
					if (mode === MULTI_POINT && enableClustering) {
						layers.push(buildClusterLayer(pointSource).clusterLayer);
					} else if (mode === SINGLE_POINT) {
						const coordinate = features[0]?.getGeometry().getCoordinates();
						if (coordinate) layers.push(buildMarkerLayer(coordinate));
					}
				}
			}

			const center =
				mode === SINGLE_POINT && features[0]
					? features[0].getGeometry().getCoordinates()
					: UK_CENTRE_EPSG27700;

			const map = new Map({
				controls: buildControls(),
				target,
				layers,
				view: new View({
					projection: TARGET_PROJECTION,
					extent: epsg27700.getExtent(),
					smoothResolutionConstraint: false,
					resolutions: wmtsOptions.tileGrid.getResolutions(),
					center,
					minZoom: MIN_ZOOM,
					maxZoom: MAX_ZOOM,
					zoom: zoom ?? DEFAULT_ZOOM
				})
			});

			if (mode === GEOJSON || fitStrategy === FIT_EXTENT) {
				map.getView().fit(pointSource.getExtent(), { padding: FIT_PADDING });
			}

			const popup = enablePopup ? createPopup() : null;
			if (popup) map.addOverlay(popup);

			const searchParams = new URLSearchParams(window.location.search);
			searchParams.delete('lang');

			const hasActiveFilters = searchParams.toString().length > 0;

			if (target === PROJECT_MAP) {
				if (shouldLoadBoundaries && boundaryGeoJsonUrl) {
					await loadMasterBoundaries(map, pointSource, boundaryGeoJsonUrl, target);
				}
			} else if (target === ALL_PROJECTS_MAP) {
				if (activeMapView === BOUNDARIES_MAP_VIEW) {
					if (shouldLoadBoundaries) {
						if (hasActiveFilters) {
							await loadFilteredBoundaries(map, pointSource);
						} else if (boundaryGeoJsonUrl) {
							await loadMasterBoundaries(map, pointSource, boundaryGeoJsonUrl, target);
						}
						getBoundariesPopup(map, popup, popupText);
					}
				} else {
					if (mode === MULTI_POINT && enableClustering && popup) {
						getMarkersPopup(map, layers, popup, popupText);
					}
				}
			}

			map.on('pointermove', (event) => {
				map.getTargetElement().style.cursor = map.hasFeatureAtPixel(event.pixel) ? 'pointer' : '';
			});

			bindZoomButtonState(map);
		} catch (error) {
			logger.error('[projects-map] initiate failed:', error);
		}
	};
}

export default projectsMap;
