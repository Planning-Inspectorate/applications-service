'use strict';

const { defaults } = require('ol/control/defaults.js');

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
	const CSS_CLASS_ZOOM_DISABLED = 'no-zoom'; // Hardcoded here as this is a DOM helper, or can import from constants

	el.querySelector('.ol-zoom-in')?.classList.toggle(
		CSS_CLASS_ZOOM_DISABLED,
		zoom >= view.getMaxZoom()
	);
	el.querySelector('.ol-zoom-out')?.classList.toggle(
		CSS_CLASS_ZOOM_DISABLED,
		zoom <= view.getMinZoom()
	);
}

module.exports = { getControls, updateZoomButtons };
