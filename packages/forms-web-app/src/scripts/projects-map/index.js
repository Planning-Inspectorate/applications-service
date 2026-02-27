import proj4 from 'proj4/dist/proj4';
import { register } from 'ol/proj/proj4.js';
import { get as getProjection } from 'ol/proj.js';
import WMTS, { optionsFromCapabilities } from 'ol/source/WMTS.js';
import WMTSCapabilities from 'ol/format/WMTSCapabilities.js';
import TileLayer from 'ol/layer/Tile.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import VectorSource from 'ol/source/Vector.js';
import Cluster from 'ol/source/Cluster.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Style from 'ol/style/Style.js';
import Circle from 'ol/style/Circle.js';
import Fill from 'ol/style/Fill.js';
import Stroke from 'ol/style/Stroke.js';
import Text from 'ol/style/Text.js';
import AnimatedCluster from 'ol-ext/src/layer/AnimatedCluster.js';
import SelectCluster from 'ol-ext/src/interaction/SelectCluster.js';
import Popup from 'ol-ext/src/overlay/Popup.js';
import { getMapWMTS } from '../map/get-map-wmts.js';
import { getControls } from '../map/get-controls.js';

const UK_CENTRE_EPSG27700 = [366154, 289239];
const DEFAULT_ZOOM = 0;
const logger = window.appLogger || { debug: () => {}, error: console.error };

/** @param {string} name @param {string} fallback @returns {string} */
const cssVar = (name, fallback) =>
	getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

/**
 * Returns an OL Style array for a cluster feature.
 * Returns null for count=0 (expanded individual features — SelectCluster handles those).
 * @param {import('ol').Feature} feature
 * @param {string} MARKER_FILL
 * @param {string} MARKER_STROKE
 * @returns {import('ol/style').Style[]|null}
 */
function clusterStyle(feature, MARKER_FILL, MARKER_STROKE) {
	const features = feature.get('features') || [];
	const count = features.length;
	if (count === 0) return null;
	const isSingle = count === 1;
	const radius = isSingle ? 8 : 12 + Math.min(count, 20);

	const shadow = new Style({
		image: new Circle({
			radius: radius + 1,
			fill: new Fill({ color: 'rgba(0,0,0,0.25)' }),
			displacement: [2, -2]
		})
	});

	const marker = new Style({
		image: new Circle({
			radius,
			fill: new Fill({ color: MARKER_FILL }),
			stroke: new Stroke({ color: MARKER_STROKE, width: 2 })
		}),
		text: isSingle
			? null
			: new Text({
					text: String(count),
					fill: new Fill({ color: MARKER_STROKE }),
					font: 'bold 12px sans-serif'
			  })
	});

	return [shadow, marker];
}

/** Registers EPSG:27700 projection with proj4 and returns the OL projection object. */
function setupEpsg27700() {
	proj4.defs(
		'EPSG:27700',
		'+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs'
	);
	register(proj4);
	const epsg27700 = getProjection('EPSG:27700');
	epsg27700.setExtent([-238375.0, 0.0, 900000.0, 1376256.0]);
	return epsg27700;
}

/**
 * Builds the OS Maps WMTS tile layer.
 * @param {string} accessToken
 * @param {string} wmtsXml
 */
function buildTileLayer(accessToken, wmtsXml) {
	const parser = new WMTSCapabilities();
	const result = parser.read(wmtsXml);
	const wmtsOptions = optionsFromCapabilities(result, {
		layer: 'Outdoor_27700',
		matrixSet: 'EPSG:27700'
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

/** @returns {import('ol-ext/src/overlay/Popup').default} */
function buildPopup() {
	return new Popup({
		popupClass: 'default',
		closeBox: true,
		positioning: 'auto',
		autoPan: { animation: { duration: 250 } }
	});
}

/**
 * Renders the cluster popup with a list of projects.
 * @param {import('ol-ext/src/overlay/Popup').default} popup
 * @param {import('ol').Feature[]} features
 * @param {number[]} coordinate EPSG:27700 coordinate
 */
function renderPopup(popup, features, coordinate) {
	const count = features.length;
	const rows = features
		.map((f) => {
			const { caseReference, projectName, stage } = f.getProperties();
			return `<tr class="cluster-popup-row">
				<td class="cluster-popup-cell-name">
					<a href="/projects/${caseReference}" class="cluster-popup-link">${projectName || caseReference}</a>
				</td>
				<td class="cluster-popup-cell-stage">${stage || ''}</td>
			</tr>`;
		})
		.join('');

	popup.show(
		coordinate,
		`<div class="cluster-popup-container">
			<h2 class="cluster-popup-header">${count} ${count === 1 ? 'project' : 'projects'} selected</h2>
			<table class="cluster-popup-table">${rows}</table>
		</div>`
	);
}

function projectsMap() {
	/**
	 * Initialises the projects map.
	 * @param {string} accessToken OS Maps Bearer token
	 * @param {string} target DOM element id for the map
	 * @param {Object} geojsonData GeoJSON FeatureCollection
	 */
	this.initiate = async (accessToken, target, geojsonData) => {
		try {
			const wmtsXml = await getMapWMTS(accessToken);
			const epsg27700 = setupEpsg27700();
			const { tileLayer, wmtsOptions } = buildTileLayer(accessToken, wmtsXml);

			const geojsonFeatures = geojsonData
				? new GeoJSON().readFeatures(geojsonData, {
						dataProjection: 'EPSG:4326',
						featureProjection: 'EPSG:27700'
				  })
				: [];

			const vectorSource = new VectorSource({ features: geojsonFeatures });

			const clusterSource = new Cluster({
				distance: 40,
				source: vectorSource
			});

			const MARKER_FILL = cssVar('--cluster-bg', '#d4351c');
			const MARKER_STROKE = cssVar('--cluster-text', 'white');
			const styleWithColours = (feature) => clusterStyle(feature, MARKER_FILL, MARKER_STROKE);

			// AnimatedCluster (ol-ext) — wraps cluster source with expand animation on click
			const clusterLayer = new AnimatedCluster({
				source: clusterSource,
				animationDuration: 300,
				style: styleWithColours
			});

			const map = new Map({
				controls: getControls(),
				target,
				layers: [tileLayer, clusterLayer],
				overlays: [],
				view: new View({
					projection: 'EPSG:27700',
					extent: epsg27700.getExtent(),
					smoothResolutionConstraint: false,
					resolutions: wmtsOptions.tileGrid.getResolutions(),
					center: UK_CENTRE_EPSG27700,
					minZoom: 0,
					maxZoom: 9,
					zoom: DEFAULT_ZOOM
				})
			});
			const popup = buildPopup();
			map.addOverlay(popup);

			// SelectCluster (ol-ext) — handles cluster click, fires 'select' with cluster feature
			const selectCluster = new SelectCluster({
				animate: true,
				animationDuration: 300,
				spiral: true,
				circleMaxObjects: 10,
				style: styleWithColours,
				featureStyle: styleWithColours
			});

			map.on('pointermove', (e) => {
				map.getTargetElement().style.cursor = map.hasFeatureAtPixel(e.pixel) ? 'pointer' : '';
			});

			map.addInteraction(selectCluster);

			selectCluster.on('select', (e) => {
				if (!e.selected.length) {
					popup.hide();
					return;
				}

				const feature = e.selected[0];
				if (feature.get('selectclusterlink')) return;

				const clusterFeatures = feature.get('features');
				if (!clusterFeatures || clusterFeatures.length === 0) return;

				const coordinate = feature.getGeometry().getCoordinates();
				renderPopup(popup, clusterFeatures, coordinate);
			});

			// Close popup on map click outside a cluster
			map.on('click', (e) => {
				if (!map.hasFeatureAtPixel(e.pixel)) popup.hide();
			});

			map.getView().on('change:resolution', () => popup.hide());

			const updateZoomButtons = () => {
				const view = map.getView();
				const zoom = view.getZoom();
				const el = map.getTargetElement();
				el.querySelector('.ol-zoom-in')?.classList.toggle('no-zoom', zoom >= view.getMaxZoom());
				el.querySelector('.ol-zoom-out')?.classList.toggle('no-zoom', zoom <= view.getMinZoom());
			};
			map.getView().on('change:resolution', updateZoomButtons);
			map.once('rendercomplete', updateZoomButtons);
		} catch (error) {
			logger.error('[projects-map] initiate failed:', error);
		}
	};
}

export default projectsMap;
