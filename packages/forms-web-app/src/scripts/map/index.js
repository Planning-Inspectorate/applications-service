import proj4 from 'proj4/dist/proj4';
import { register } from 'ol/proj/proj4.js';
import { get as getProjection } from 'ol/proj.js';
import WMTS, { optionsFromCapabilities } from 'ol/source/WMTS.js';
import WMTSCapabilities from 'ol/format/WMTSCapabilities.js';
import TileLayer from 'ol/layer/Tile.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { transform } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { getMapWMTS } from './get-map-wmts';
import { getControls } from './get-controls';

function map() {
	this.initiate = async (accessToken, target, center, zoom = 0) => {
		try {
			const mapWMTS = await getMapWMTS(accessToken);

			proj4.defs(
				'EPSG:27700',
				'+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs'
			);

			register(proj4);

			const epsg27700 = getProjection('EPSG:27700');
			epsg27700.setExtent([-238375.0, 0.0, 900000.0, 1376256.0]);

			const parser = new WMTSCapabilities();

			const result = parser.read(mapWMTS);

			const options = optionsFromCapabilities(result, {
				layer: 'Outdoor_27700',
				matrixSet: 'EPSG:27700'
			});

			const tileSource = new WMTS({
				tileLoadFunction: async (tile, src) => {
					const tileLoadResponse = await fetch(src, {
						headers: {
							Authorization: 'Bearer ' + accessToken
						}
					});

					const tileLoadBlob = await tileLoadResponse.blob();

					const reader = new FileReader();

					reader.onloadend = () =>
						(tile.getImage().src = `data:image/png;base64,${btoa(reader.result)}`);

					reader.readAsBinaryString(tileLoadBlob);
				},
				...options
			});

			const tileLayer = new TileLayer({ source: tileSource });

			const centerEpsg27700 = transform(center, 'EPSG:4326', 'EPSG:27700');

			const map = new Map({
				controls: getControls(),
				target,
				layers: [tileLayer],
				view: new View({
					projection: 'EPSG:27700',
					extent: epsg27700.getExtent(),
					smoothResolutionConstraint: false,
					resolutions: options.tileGrid.getResolutions(),
					center: centerEpsg27700,
					minZoom: 0,
					maxZoom: 9,
					zoom
				})
			});

			const markers = new VectorLayer({
				source: new VectorSource(),
				style: new Style({
					image: new Icon({
						anchor: [0.5, 1],
						src: '/public/images/ol-map-marker.png'
					})
				})
			});

			map.addLayer(markers);

			const marker = new Feature(new Point(centerEpsg27700));
			markers.getSource().addFeature(marker);
		} catch (error) {
			console.log('yoyo:>>', error);
		}
	};
}

export default map;
