import proj4 from 'proj4/dist/proj4';
import { register } from 'ol/proj/proj4.js';
import { get as getProjection } from 'ol/proj.js';
import { defaults } from 'ol/control/defaults';
import Attribution from 'ol/control/Attribution.js';
import { EPSG_27700_DEF, EPSG_27700_EXTENT, TARGET_PROJECTION } from './constants.js';

/** Creates a zoom button label with accessible screen-reader text. */
function getZoomLabel(label, labelTip) {
	const zoomLabel = document.createElement('span');
	zoomLabel.innerHTML = `<span aria-hidden="true">${label}</span><span class="govuk-visually-hidden">${labelTip}</span>`;
	return zoomLabel;
}

/** Registers EPSG:27700 with proj4 and returns the OL projection. */
export function registerProjection() {
	proj4.defs(TARGET_PROJECTION, EPSG_27700_DEF);
	register(proj4);
	const epsg27700 = getProjection(TARGET_PROJECTION);
	epsg27700.setExtent(EPSG_27700_EXTENT);
	return epsg27700;
}

/** Builds zoom controls with accessible labels. */
export function buildControls() {
	return defaults({
		attribution: false,
		zoomOptions: {
			zoomInLabel: getZoomLabel('&plus;', 'Zoom in'),
			zoomOutLabel: getZoomLabel('&minus;', 'Zoom out')
		}
	}).extend([new Attribution({ collapsed: false, collapsible: false })]);
}

/** Toggles 'no-zoom' class on zoom buttons at min/max zoom limits. */
export function bindZoomButtonState(map) {
	const updateZoomButtons = () => {
		const view = map.getView();
		const zoom = view.getZoom();
		const el = map.getTargetElement();
		el.querySelector('.ol-zoom-in')?.classList.toggle('no-zoom', zoom >= view.getMaxZoom());
		el.querySelector('.ol-zoom-out')?.classList.toggle('no-zoom', zoom <= view.getMinZoom());
	};

	map.getView().on('change:resolution', updateZoomButtons);
	map.once('rendercomplete', updateZoomButtons);
}
