import Map from 'ol/Map.js';
import View from 'ol/View.js';
import VectorSource from 'ol/source/Vector.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Feature from 'ol/Feature.js';
import SelectCluster from 'ol-ext/src/interaction/SelectCluster.js';
import {
	UK_CENTRE_EPSG27700,
	DEFAULT_ZOOM,
	MIN_ZOOM,
	MAX_ZOOM,
	ANIMATION_DURATION,
	SOURCE_PROJECTION,
	TARGET_PROJECTION,
	PROP_CASE_REF,
	PROP_CASE_REFERENCE,
	PROP_PROJECT_NAME,
	PROP_STAGE,
	CIRCLE_MAX_OBJECTS,
	FIT_PADDING
} from './constants.js';
import { buildTileLayer } from './tile-layer.js';
import { registerProjection, buildControls, bindZoomButtonState } from './map-setup.js';
import { buildClusterLayer, buildBoundaryLayer, buildMarkerLayer } from './layers.js';
import { createPopup, showProjectPopup } from './popup.js';
import { normalizeMapInput } from './normalize-map-input.js';

const logger = window.appLogger || { debug: () => {}, error: console.error };

/**
 * Fetches boundary polygons from the server, removes duplicate point markers
 * for projects that have polygon boundaries for individual project map, and adds the boundary layer to the map.
 */
async function loadBoundaries(map, pointSource, boundaryGeoJsonUrl, target) {
	try {
		const projectMap = 'map';
		const response = await fetch(boundaryGeoJsonUrl);

		if (!response.ok) {
			throw new Error(`Boundary fetch failed: ${response.status}`);
		}

		const boundaryFeatures = new GeoJSON().readFeatures(await response.json(), {
			dataProjection: SOURCE_PROJECTION,
			featureProjection: TARGET_PROJECTION
		});

		if (target === projectMap) {
			const polygonProjects = new Set(
				boundaryFeatures.map((feature) => feature.get(PROP_CASE_REF))
			);

			pointSource.getFeatures().forEach((feature) => {
				if (polygonProjects.has(feature.get(PROP_CASE_REFERENCE))) {
					pointSource.removeFeature(feature);
				}
			});
		}

		map.addLayer(buildBoundaryLayer(boundaryFeatures));
	} catch (error) {
		logger.error('[projects-map] failed loading boundaries:', error);
	}
}

function getBoundariesPopup(map, popup, popupText) {
	if (popup) {
		map.on('singleclick', (event) => {
			let featureClicked = false;

			map.forEachFeatureAtPixel(event.pixel, (feature) => {
				const geometryType = feature.getGeometry()?.getType();

				if (geometryType === 'Polygon' || geometryType === 'MultiPolygon') {
					featureClicked = true;
					const popupFeature = new Feature({
						caseReference: feature.get(PROP_CASE_REF),
						projectName: feature.get(PROP_PROJECT_NAME),
						stage: feature.get(PROP_STAGE)
					});
					showProjectPopup(popup, [popupFeature], event.coordinate, popupText);
				}
			});

			if (!featureClicked) popup.hide();
		});

		map.getView().on('change:resolution', () => popup.hide());
	}
}

function getMarkersPopup(map, layers, popup, popupText) {
	const selectCluster = new SelectCluster({
		layers: [layers[1]],
		animate: true,
		animationDuration: ANIMATION_DURATION,
		spiral: true,
		circleMaxObjects: CIRCLE_MAX_OBJECTS
	});

	map.addInteraction(selectCluster);

	selectCluster.on('select', (event) => {
		if (!event.selected.length) {
			popup.hide();
			return;
		}

		const selectedFeature = event.selected[0];
		if (selectedFeature.get('selectclusterlink')) return;

		const clusterFeatures = selectedFeature.get('features');
		if (clusterFeatures?.length) {
			showProjectPopup(
				popup,
				clusterFeatures,
				selectedFeature.getGeometry().getCoordinates(),
				popupText
			);
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
		const allProjectsMap = 'projects-map';
		const projectMap = 'map';
		const boundariesMapView = 'boundaries';
		const markersMapView = 'markers';

		let popupText = { projectSelected: '', projectsSelected: '' };
		let activeMapView = '';

		if (target === allProjectsMap) {
			if (mapElement) {
				popupText = {
					projectSelected: mapElement.dataset?.projectSelected || '',
					projectsSelected: mapElement.dataset?.projectsSelected || ''
				};
			}

			activeMapView =
				mapElement.dataset?.activeMapView === boundariesMapView
					? boundariesMapView
					: markersMapView;
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

			if (target === projectMap) {
				if (mode === 'multiPoint' && enableClustering) {
					layers.push(buildClusterLayer(pointSource).clusterLayer);
				} else if (mode === 'singlePoint') {
					const coordinate = features[0]?.getGeometry().getCoordinates();
					if (coordinate) layers.push(buildMarkerLayer(coordinate));
				} else if (mode === 'geojson') {
					layers.push(buildBoundaryLayer(features));
				}
			} else if (target === allProjectsMap) {
				if (activeMapView === boundariesMapView) {
					if (mode === 'geojson') {
						layers.push(buildBoundaryLayer(features));
					}
				} else {
					if (mode === 'multiPoint' && enableClustering) {
						layers.push(buildClusterLayer(pointSource).clusterLayer);
					} else if (mode === 'singlePoint') {
						const coordinate = features[0]?.getGeometry().getCoordinates();
						if (coordinate) layers.push(buildMarkerLayer(coordinate));
					}
				}
			}

			const center =
				mode === 'singlePoint' && features[0]
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

			if (mode === 'geojson' || fitStrategy === 'fitExtent') {
				map.getView().fit(pointSource.getExtent(), { padding: FIT_PADDING });
			}

			const popup = enablePopup ? createPopup() : null;
			if (popup) map.addOverlay(popup);

			if (target === projectMap) {
				if (shouldLoadBoundaries && boundaryGeoJsonUrl) {
					await loadBoundaries(map, pointSource, boundaryGeoJsonUrl, target);
				}
			} else if (target === allProjectsMap) {
				if (activeMapView === boundariesMapView) {
					if (shouldLoadBoundaries && boundaryGeoJsonUrl) {
						await loadBoundaries(map, pointSource, boundaryGeoJsonUrl, target);
						getBoundariesPopup(map, popup, popupText);
					}
				} else {
					if (mode === 'multiPoint' && enableClustering && popup) {
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
