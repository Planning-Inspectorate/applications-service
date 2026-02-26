import proj4 from 'proj4/dist/proj4';
import { register } from 'ol/proj/proj4.js';
import { get as getProjection } from 'ol/proj.js';
import { transform } from 'ol/proj.js';
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
import Overlay from 'ol/Overlay.js';
import AnimatedCluster from 'ol-ext/src/layer/AnimatedCluster.js';
import SelectCluster from 'ol-ext/src/interaction/SelectCluster.js';
import { getMapWMTS } from '../map/get-map-wmts.js';
import { getControls } from '../map/get-controls.js';

// UK centre in EPSG:4326
const UK_CENTRE = [-2.5, 54.5];
const DEFAULT_ZOOM = 5;

const CLUSTER_FILL = '#1d70b8';
const SINGLE_FILL = '#ffdd00';
const SINGLE_STROKE = '#0b0c0c';

function clusterStyle(feature) {
	const features = feature.get('features') || [];
	const count = features.length;
	const isSingle = count === 1;

	return new Style({
		image: new Circle({
			radius: isSingle ? 8 : 12 + Math.min(count, 20),
			fill: new Fill({ color: isSingle ? SINGLE_FILL : CLUSTER_FILL }),
			stroke: new Stroke({ color: isSingle ? SINGLE_STROKE : '#fff', width: 2 })
		}),
		text: isSingle
			? null
			: new Text({
					text: String(count),
					fill: new Fill({ color: '#fff' }),
					font: 'bold 12px sans-serif'
			  })
	});
}

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

function buildTileLayer(accessToken, wmtsXml) {
	const parser = new WMTSCapabilities();
	const result = parser.read(wmtsXml);
	const wmtsOptions = optionsFromCapabilities(result, {
		layer: 'Outdoor_27700',
		matrixSet: 'EPSG:27700'
	});

	const tileSource = new WMTS({
		tileLoadFunction: async (tile, src) => {
			const res = await fetch(src, { headers: { Authorization: 'Bearer ' + accessToken } });
			const blob = await res.blob();
			const reader = new FileReader();
			reader.onloadend = () =>
				(tile.getImage().src = `data:image/png;base64,${btoa(reader.result)}`);
			reader.readAsBinaryString(blob);
		},
		...wmtsOptions
	});

	return { tileLayer: new TileLayer({ source: tileSource }), wmtsOptions };
}

function buildPopupOverlay(popupEl) {
	return new Overlay({
		element: popupEl,
		positioning: 'bottom-center',
		stopEvent: true,
		offset: [0, -10]
	});
}

function renderPopup(popupEl, features, coordinate, overlay) {
	const count = features.length;

	const heading = document.createElement('p');
	heading.className = 'govuk-body-s govuk-!-font-weight-bold govuk-!-margin-bottom-1';
	heading.textContent = `${count} ${count === 1 ? 'project' : 'projects'} selected`;

	const list = document.createElement('ul');
	list.className = 'govuk-list govuk-list--spaced govuk-!-margin-bottom-0';

	features.forEach((f) => {
		const props = f.getProperties();
		const li = document.createElement('li');
		li.className = 'govuk-body-s govuk-!-margin-bottom-0';

		const link = document.createElement('a');
		link.className = 'govuk-link';
		link.href = `/projects/${props.caseReference}`;
		link.textContent = props.projectName || props.caseReference;

		const stage = document.createElement('span');
		stage.className = 'govuk-!-margin-left-2 govuk-body-s';
		stage.textContent = props.stage || '';

		li.appendChild(link);
		li.appendChild(stage);
		list.appendChild(li);
	});

	popupEl.innerHTML = '';
	popupEl.appendChild(heading);
	popupEl.appendChild(list);
	popupEl.hidden = false;
	overlay.setPosition(coordinate);
}

function projectsMap() {
	this.initiate = async (accessToken, target, geojsonData) => {
		console.log('[projects-map] initiate called', {
			target,
			hasToken: !!accessToken,
			hasGeoJSON: !!geojsonData
		});
		try {
			const popupEl = document.getElementById('projects-map-popup');
			console.log('[projects-map] fetching WMTS...');
			const wmtsXml = await getMapWMTS(accessToken);
			console.log('[projects-map] WMTS fetched', { length: wmtsXml?.length });
			const epsg27700 = setupEpsg27700();
			const { tileLayer, wmtsOptions } = buildTileLayer(accessToken, wmtsXml);
			console.log('[projects-map] tile layer built');

			const centreEpsg27700 = transform(UK_CENTRE, 'EPSG:4326', 'EPSG:27700');

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

			// AnimatedCluster (ol-ext) — wraps cluster source with expand animation on click
			const clusterLayer = new AnimatedCluster({
				source: clusterSource,
				animationDuration: 300,
				style: clusterStyle
			});

			const popupOverlay = buildPopupOverlay(popupEl);

			const map = new Map({
				controls: getControls(),
				target,
				layers: [tileLayer, clusterLayer],
				overlays: [popupOverlay],
				view: new View({
					projection: 'EPSG:27700',
					extent: epsg27700.getExtent(),
					smoothResolutionConstraint: false,
					resolutions: wmtsOptions.tileGrid.getResolutions(),
					center: centreEpsg27700,
					minZoom: 0,
					maxZoom: 9,
					zoom: DEFAULT_ZOOM
				})
			});
			console.log('[projects-map] map created');

			// SelectCluster (ol-ext) — handles cluster click, fires 'select' with cluster feature
			const selectCluster = new SelectCluster({
				animate: true,
				animationDuration: 300,
				spiral: true,
				circleMaxObjects: 10,
				style: clusterStyle,
				featureStyle: clusterStyle
			});

			map.addInteraction(selectCluster);

			selectCluster.on('select', (e) => {
				if (!e.selected.length) {
					popupEl.hidden = true;
					popupOverlay.setPosition(undefined);
					return;
				}

				const feature = e.selected[0];
				// Skip link features drawn by SelectCluster during spiral expand
				if (feature.get('selectclusterlink')) return;

				const clusterFeatures = feature.get('features');
				if (!clusterFeatures || clusterFeatures.length === 0) return;

				const coordinate = feature.getGeometry().getCoordinates();
				renderPopup(popupEl, clusterFeatures, coordinate, popupOverlay);
			});

			// Close popup on map click outside a cluster
			map.on('click', (e) => {
				const hit = map.hasFeatureAtPixel(e.pixel);
				if (!hit) {
					popupEl.hidden = true;
					popupOverlay.setPosition(undefined);
				}
			});
		} catch (error) {
			console.error('[projects-map] initiate failed:', error);
		}
	};
}

export default projectsMap;
