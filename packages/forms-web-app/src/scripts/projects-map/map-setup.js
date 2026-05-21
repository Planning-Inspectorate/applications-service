'use strict';

const proj4 = require('proj4/dist/proj4');
const { register } = require('ol/proj/proj4.js');
const { get: getProjection } = require('ol/proj.js');
const { defaults } = require('ol/control/defaults.js');
const { EPSG_27700, EPSG27700_PROJ4_DEF, EPSG27700_EXTENT } = require('./constants');

/**
 * Registers the EPSG:27700 (British National Grid) projection with proj4 and OL,
 * then sets its valid extent and returns the configured OL projection object.
 *
 * @returns {import('ol/proj/Projection').default}
 */
function setupEpsg27700() {
	proj4.defs(EPSG_27700, EPSG27700_PROJ4_DEF);
	register(proj4);
	const projection = getProjection(EPSG_27700);
	projection.setExtent(EPSG27700_EXTENT);
	return projection;
}

/**
 * Returns OL map controls configured with accessible GOV.UK zoom labels.
 * Attribution is handled by os-api-branding, not the OL Attribution control.
 *
 * @returns {import('ol/Collection').default} Control collection for use in `new Map({ controls })`
 */
function getControls() {
	const makeLabel = (symbol, tip) => {
		const span = document.createElement('span');
		span.innerHTML = `<span aria-hidden="true">${symbol}</span><span class="govuk-visually-hidden">${tip}</span>`;
		return span;
	};

	return defaults({
		attribution: false,
		zoomOptions: {
			zoomInLabel: makeLabel('&plus;', 'Zoom in'),
			zoomOutLabel: makeLabel('&minus;', 'Zoom out')
		}
	});
}

/**
 * Updates the disabled state on zoom controls based on the current view resolution.
 * Should be bound to map 'change:resolution' and 'rendercomplete' events.
 *
 * @param {import('ol/Map').default} map OL Map instance
 */
function updateZoomButtons(map) {
	const view = map.getView();
	const zoom = view.getZoom();
	const el = map.getTargetElement();
	const CSS_CLASS_ZOOM_DISABLED = 'no-zoom';

	el.querySelector('.ol-zoom-in')?.classList.toggle(
		CSS_CLASS_ZOOM_DISABLED,
		zoom >= view.getMaxZoom()
	);
	el.querySelector('.ol-zoom-out')?.classList.toggle(
		CSS_CLASS_ZOOM_DISABLED,
		zoom <= view.getMinZoom()
	);
}

module.exports = { setupEpsg27700, getControls, updateZoomButtons };
