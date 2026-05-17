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

module.exports = { getControls };
